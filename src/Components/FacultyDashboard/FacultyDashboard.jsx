import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const FacultyDashboard = () => {
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  const [subject, setSubject] = useState("");
  const [students, setStudents] = useState([]);
  const [marks, setMarks] = useState({});
  const [attendanceDate, setAttendanceDate] = useState("");
  const [attendanceData, setAttendanceData] = useState({});

  // Function to retrieve token from localStorage
  const getToken = () => {
    return localStorage.getItem("token");
  };

  // Fetch students based on branch and year
  const fetchStudents = async () => {
    if (branch && year) {
      try {
        const token = getToken(); // Get the token from localStorage
        const response = await fetch(
          `https://studentbakend.onrender.com/student/allstu?branch=${branch}&year=${year}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Add token to headers
            },
          }
        );
        const data = await response.json();
        if (data.students) {
          setStudents(data.students);
        } else {
          setStudents([]);
        }
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    }
  };

  // Submit marks for all students
  const submitMarks = async () => {
    try {
      const marksData = Object.keys(marks).map((regno) => ({
        regno,
        subject,
        marks: marks[regno],
      }));

      const response = await fetch(
        `https://studentbakend.onrender.com/student/update-marks`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json", // Add token to headers
          },
          body: JSON.stringify(marksData),
        }
      );

      const result = await response.json();
      if (response.status === 200) {
        alert(result.message);
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error submitting marks:", error);
      alert("Error submitting marks");
    }
  };

  // Add marks for a student
  const handleMarksChange = (regno, value) => {
    setMarks((prevMarks) => ({
      ...prevMarks,
      [regno]: value, // Update the marks for the specific student
    }));
  };

  // Handle attendance status change
  const handleAttendanceChange = (regno, status) => {
    setAttendanceData((prevData) => ({
      ...prevData,
      [regno]: status, // Update the attendance status for the specific student
    }));
  };

  // Submit attendance
  const submitAttendance = async () => {
    try {
      const attendanceArray = Object.keys(attendanceData).map((regno) => ({
        regno,
        date: attendanceDate,
        status: attendanceData[regno],
      }));

      const response = await fetch(
        `https://studentbakend.onrender.com/student/mark-attendance`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(attendanceArray),
        }
      );

      const result = await response.json();
      if (response.status === 200) {
        alert(result.message);
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error submitting attendance:", error);
      alert("Error submitting attendance");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [branch, year, subject]);

  return (
    <div className="container mt-5">
      <button>
        <Link to="/attendenceDashboard">Attendence Dashboard</Link>
      </button>
      <h2 className="text-center mb-4">Faculty Dashboard</h2>

      {/* Branch, Year, and Subject Selection */}
      <div className="row mb-4">
        <div className="col-md-4">
          <label>Branch</label>
          <select
            className="form-control"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
          >
            <option value="">Select Branch</option>
            <option value="CSE">CSE</option>
            <option value="MECH">MECH</option>
            <option value="CIVIL">CIVIL</option>
            <option value="EEE">EEE</option>
            <option value="ECE">ECE</option>
            <option value="IT">IT</option>
            <option value="CSD">CSD</option>
            <option value="CSM">CSM</option>
            <option value="AIML">AIML</option>
          </select>
        </div>
        <div className="col-md-4">
          <label>Year</label>
          <select
            className="form-control"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            <option value="">Select Year</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
          </select>
        </div>
        <div className="col-md-4">
          <label>Subject</label>
          <select
            className="form-control"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          >
            <option value="">Select Subject</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Physics">Physics</option>
          </select>
        </div>
      </div>

      {/* Student Marks Input */}
      {students.length > 0 && (
        <div className="mb-4">
          <h4>Enter Marks for Students</h4>
          <div className="list-group">
            {students.map((student) => (
              <div
                key={student.regno}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <span>
                  {student.name} ({student.regno})
                </span>
                <input
                  type="number"
                  className="form-control w-25"
                  value={marks[student.regno] || ""}
                  onChange={(e) =>
                    handleMarksChange(student.regno, e.target.value)
                  }
                  placeholder="Enter Marks"
                />
              </div>
            ))}
          </div>
          <button className="btn btn-primary mt-3" onClick={submitMarks}>
            Submit Marks
          </button>
        </div>
      )}

      {/* Student Attendance Input */}
      {/* {students.length > 0 && (
        <div className="mb-4">
          <h4>Enter Attendance for Students</h4>
          <div className="row mb-3">
            <div className="col-md-4">
              <label>Attendance Date</label>
              <input
                type="date"
                className="form-control"
                value={attendanceDate}
                onChange={(e) => setAttendanceDate(e.target.value)}
              />
            </div>
          </div>
          <div className="list-group">
            {students.map((student) => (
              <div
                key={student.regno}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <span>
                  {student.name} ({student.regno})
                </span>
                <select
                  className="form-control w-25"
                  value={attendanceData[student.regno] || ""}
                  onChange={(e) =>
                    handleAttendanceChange(student.regno, e.target.value)
                  }
                >
                  <option value="">Select Status</option>
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                </select>
              </div>
            ))}
          </div>
          <button className="btn btn-primary mt-3" onClick={submitAttendance}>
            Submit Attendance
          </button>
        </div>
      )} */}
    </div>
  );
};

export default FacultyDashboard;
