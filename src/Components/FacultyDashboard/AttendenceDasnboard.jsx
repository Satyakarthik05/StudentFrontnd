import React, { useState, useEffect } from "react";

const FacultyAttendanceDashboard = () => {
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  const [date, setDate] = useState("");
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});

  // Fetch students based on branch and year
  const fetchStudents = async () => {
    if (branch && year) {
      try {
        const response = await fetch(
          `https://studentbakend.onrender.com/student/allstu?branch=${branch}&year=${year}`
        );
        const data = await response.json();

        if (response.ok) {
          setStudents(data.students);
        } else {
          alert(data.message || "Failed to fetch students");
          setStudents([]);
        }
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    }
  };

  // const isValidDate = (date) => !isNaN(new Date(date).getTime());
  // if (!isValidDate(date)) {
  //   alert("Please select a valid date");
  //   return;
  // }

  // Handle attendance checkbox change (mark as present or absent)
  const handleAttendanceChange = (regno, isPresent) => {
    setAttendance({
      ...attendance,
      [regno]: isPresent ? "Present" : "Absent",
    });
  };

  // Submit attendance
  const submitAttendance = async () => {
    if (!date) {
      alert("Please select a date for attendance");
      return;
    }

    const attendanceRecords = students.map((student) => ({
      regno: student.regno,
      date,
      status: attendance[student.regno] || "Absent", // Default to "Absent"
    }));

    try {
      const response = await fetch(
        `https://studentbakend.onrender.com/student/attendence`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(attendanceRecords),
        }
      );

      const result = await response.json();

      if (response.ok) {
        alert(result.message);
        setAttendance({});
      } else {
        alert(result.message || "Failed to submit attendance");
      }
    } catch (error) {
      console.error("Error submitting attendance:", error);
      alert("Failed to submit attendance");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [branch, year]);

  // Get current date in YYYY-MM-DD format
  const getCurrentDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Faculty Attendance Dashboard</h2>

      {/* Branch, Year, and Date Selection */}
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
          <label>Date</label>
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            max={getCurrentDate()}
          />
        </div>
      </div>

      {/* Attendance Section */}
      {students.length > 0 && (
        <div className="mb-4">
          <h4>Mark Attendance</h4>
          <div className="list-group">
            {students.map((student) => (
              <div
                key={student.regno}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <span>
                  {student.name} ({student.regno})
                </span>
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id={`attendance-${student.regno}`}
                    checked={attendance[student.regno] === "Present"}
                    onChange={(e) =>
                      handleAttendanceChange(student.regno, e.target.checked)
                    }
                  />
                  <label
                    className="custom-control-label"
                    htmlFor={`attendance-${student.regno}`}
                  >
                    Present
                  </label>
                </div>
              </div>
            ))}
          </div>
          <button className="btn btn-success mt-3" onClick={submitAttendance}>
            Submit Attendance
          </button>
        </div>
      )}
    </div>
  );
};

export default FacultyAttendanceDashboard;
