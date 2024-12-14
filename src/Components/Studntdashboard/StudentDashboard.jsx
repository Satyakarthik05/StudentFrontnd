import React, { useEffect, useState } from "react";
import styles from "./StudentDashboard.module.css";
import logo from "../../public/logo1.png";
import profile from "../../public/profile.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StudentDashboard = () => {
  const [chartData, setChartData] = useState(null);
  const [stats, setStats] = useState(null);
  const [grades, setGrades] = useState(null);
  const [studentInfo, setStudentInfo] = useState({
    name: "",
    regno: "",
    branch: "",
  });

  const tokens = localStorage.getItem("studentToken"); // Get the token from localStorage

  useEffect(() => {
    if (!tokens) {
      // If no token, handle unauthenticated state
      console.log("No token found, redirecting to login");
      return;
    }

    // Fetch student data with token
    const fetchStudentData = async () => {
      try {
        const response = await fetch(
          `https://studentbakend.onrender.com/student/getstudent`,
          {
            method: "GET",
            headers: {
              token: `${tokens}`,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setStudentInfo({
            name: data.name,
            regno: data.regno,
            branch: data.branch,
          });
        } else {
          console.error("Error fetching student data:", data.message);
        }
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    // Mock attendance and grades data (or fetch these too if needed)
    const mockAttendanceData = {
      attendance: [
        { date: "2024-12-01", status: "Present" },
        { date: "2024-12-02", status: "Absent" },
        { date: "2024-12-03", status: "Present" },
        { date: "2024-12-04", status: "Present" },
        { date: "2024-12-05", status: "Absent" },
        { date: "2024-12-06", status: "Present" },
        { date: "2024-12-07", status: "Absent" },
        { date: "2024-12-08", status: "Present" },
        { date: "2024-12-09", status: "Present" },
        { date: "2024-12-10", status: "Absent" },
        { date: "2024-12-11", status: "Present" },
        { date: "2024-12-12", status: "Absent" },
      ],
      totalDays: 12,
      presentDays: 7,
      attendancePercentage: "58.33",
    };

    const mockGradesData = {
      subjects: [
        { name: "Mathematics", marks: 80, totalMarks: 100 },
        { name: "Science", marks: 85, totalMarks: 100 },
        { name: "English", marks: 70, totalMarks: 100 },
        { name: "History", marks: 75, totalMarks: 100 },
        { name: "Geography", marks: 90, totalMarks: 100 },
      ],
    };

    // Fetch Attendance Data and Grades
    const fetchAttendanceData = () => {
      const { attendance, totalDays, presentDays, attendancePercentage } =
        mockAttendanceData;

      const dayLabels = attendance.map((entry) =>
        new Date(entry.date).toLocaleDateString()
      );
      const dayStatuses = attendance.map((entry) =>
        entry.status === "Present" ? 1 : 0
      );

      const chartData = {
        labels: dayLabels,
        datasets: [
          {
            label: "Attendance (1 = Present, 0 = Absent)",
            data: dayStatuses,
            backgroundColor: dayStatuses.map((status) =>
              status === 1
                ? "rgba(75, 192, 192, 0.6)"
                : "rgba(255, 99, 132, 0.6)"
            ),
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      };

      setChartData(chartData);
      setStats({ totalDays, presentDays, attendancePercentage });
    };

    fetchAttendanceData();
    setGrades(mockGradesData);
    fetchStudentData();
  }, [tokens]);

  const totalMarks =
    grades?.subjects?.reduce((total, subject) => total + subject.marks, 0) || 0;
  const maxMarks =
    grades?.subjects?.reduce(
      (total, subject) => total + subject.totalMarks,
      0
    ) || 0;
  const percentage = (totalMarks / maxMarks) * 100 || 0;

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <img
            src={logo}
            alt="Logo"
            style={{ height: "40px", marginBottom: "15px" }}
          />
          <a
            className="navbar-brand"
            href="#"
            style={{
              color: "#101535",
              fontWeight: "700",
              fontSize: "40px",
              marginLeft: "7px",
            }}
          >
            BeyondQuits
          </a>
        </div>
        <ul className={styles.navLinks}>
          <li className={styles.navItem}>
            <a href="#home" className={styles.navLink}>
              Home
            </a>
          </li>
          <li className={styles.navItem}>
            <a href="#about" className={styles.navLink}>
              About
            </a>
          </li>
          <li className={styles.navItem}>
            <a href="#services" className={styles.navLink}>
              Services
            </a>
          </li>
          <li className={styles.navItem}>
            <a href="#contact" className={styles.navLink}>
              Contact Us
            </a>
          </li>
          <li className={styles.navItem}>
            <a href="#features" className={styles.navLink}>
              My Students
            </a>
          </li>
          <li className={styles.navItem}>
            <a className={styles.navLink}>Logout</a>
          </li>
        </ul>
      </nav>

      <div className={styles.full}>
        <div
          style={{ width: "30%" }}
          className="d-flex align-center justify-center flex-column"
        >
          <img
            src={profile}
            alt="Profile"
            style={{ width: "53%", height: "50%", margin: "auto" }}
          />
          <h2>Name: {studentInfo.name}</h2>
          <h2>Regno: {studentInfo.regno}</h2>
          <h2>Branch: {studentInfo.branch}</h2>
        </div>
        <div
          style={{ width: "70%" }}
          className="d-flex align-center justify-center flex-column"
        >
          <h1>Student Dashboard</h1>
          <div>
            <h2>Attendance Chart</h2>
            {chartData ? (
              <Bar
                data={chartData}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { display: true, position: "top" },
                    title: {
                      display: true,
                      text: "Day-wise Attendance Overview",
                    },
                  },
                  scales: {
                    x: { title: { display: true, text: "Date" } },
                    y: {
                      title: {
                        display: true,
                        text: "Attendance (1=Present, 0=Absent)",
                      },
                      ticks: { stepSize: 1 },
                    },
                  },
                }}
              />
            ) : (
              <p>Loading chart...</p>
            )}
            <div style={{ marginTop: "20px" }}>
              <h3>Attendance Stats</h3>
              <p>Total Days: {stats?.totalDays || 0}</p>
              <p>Days Attended: {stats?.presentDays || 0}</p>
              <p>
                Attendance Percentage: {stats?.attendancePercentage || "0.00"}%
              </p>
            </div>
          </div>
          <div style={{ marginTop: "30px" }}>
            <h2>Grades</h2>
            <div className="card">
              <div className="card-body">
                <ul className="list-group">
                  {grades?.subjects?.map((subject, index) => (
                    <li
                      key={index}
                      className="list-group-item d-flex justify-content-between"
                    >
                      <span>{subject.name}</span>
                      <span>
                        {subject.marks}/{subject.totalMarks}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-3">
                  <p className="font-weight-bold">
                    Total Marks: {totalMarks}/{maxMarks}
                  </p>
                  <p className="font-weight-bold">
                    Percentage: {percentage.toFixed(2)}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
