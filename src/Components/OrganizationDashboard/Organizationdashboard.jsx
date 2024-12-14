import React from "react";
import styles from "./Organizationdashboard.module.css";
import aboutban from "../../public/studentenroll.jpg";
import faculty from "../../public/facultyenroll.jpg";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../public/logo1.png";

const Organizationdashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-light"
        style={{ backgroundColor: "#f8f9fa", padding: "10px 20px" }}
      >
        <div className="container">
          <div className="navbar-brand d-flex align-items-center">
            <img
              src={logo}
              alt="logo"
              style={{ height: "40px", marginBottom: "15px" }}
            />
            <span
              className="ms-2"
              style={{ fontWeight: "700", fontSize: "30px" }}
            >
              BeyondQuits
            </span>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link
                  to="/mystudents"
                  className="nav-link"
                  style={{ fontWeight: "600" }}
                >
                  My students
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/myfaculty"
                  className="nav-link"
                  style={{ fontWeight: "600" }}
                >
                  My faculty
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Faculty Enrollment Section */}
      <div className="container-fluid py-5">
        <div className="row align-items-center">
          <div className="col-md-6 mb-3">
            <img src={faculty} alt="Faculty" className="img-fluid rounded-3" />
          </div>
          <div className="col-md-6">
            <h1 className="fs-3 fs-md-1">
              Empowering Educators,connecting Opportunities
            </h1>
            <p className="fs-5"></p>
            <ul className="list-unstyled fs-6">
              <li>Best Learning Platform with 10,000+ Courses</li>
              <li>Best Professors with 10+ years of Experience</li>
              <li>Get Certified with Certificate After completion of Course</li>
            </ul>
            <button
              className="btn btn-success"
              onClick={() => navigate("/facultyenroll")}
            >
              Faculty Registration
            </button>
          </div>
        </div>
      </div>

      {/* Student Enrollment Section */}
      <div className="container-fluid py-5 bg-light">
        <div
          className="row align-items-center m-auto"
          style={{ marginLeft: "10px" }}
        >
          <div className="col-md-6 mb-3 ml-5">
            <h1 className="fs-3 fs-md-1">Where Dreams meet Opportunities</h1>
            <p className="fs-5">Achieve more,Learn better</p>
            <ul className="list-unstyled fs-6">
              <li>Best Learning Platform with 10,000+ Courses</li>
              <li>Best Professors with 10+ years of Experience</li>
              <li>Get Certified with Certificate After completion of Course</li>
            </ul>
            <button
              className="btn btn-success"
              onClick={() => navigate("/studentenroll")}
            >
              Student Registration
            </button>
          </div>
          <div className="col-md-6">
            <img
              src={aboutban}
              alt="Student Enrollment"
              className="img-fluid rounded-3"
            />
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer
        className="text-white py-4"
        style={{ backgroundColor: "#101535" }}
      >
        <div className="container">
          <div className="row">
            {/* Quick Links */}
            <div className="col-md-3 col-sm-6 mb-3">
              <h5 className="text-warning">Quick Links</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="#" className="text-white text-decoration-none">
                    Public Self-Disclosure
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white text-decoration-none">
                    Faculty
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white text-decoration-none">
                    VRSEC LMS
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white text-decoration-none">
                    VRSEC University LMS
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white text-decoration-none">
                    Mandatory Disclosure (AICTE)
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white text-decoration-none">
                    Student Satisfactory Survey
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white text-decoration-none">
                    Grievance Redressal
                  </a>
                </li>
              </ul>
            </div>

            {/* Quick Info */}
            <div className="col-md-3 col-sm-6 mb-3">
              <h5 className="text-warning">Quick Info</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="#" className="text-white text-decoration-none">
                    Executive Council Minutes
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white text-decoration-none">
                    Web Mail
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white text-decoration-none">
                    AICTE Margdarshan Scheme
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white text-decoration-none">
                    ISTE
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white text-decoration-none">
                    NIRF
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white text-decoration-none">
                    Policies
                  </a>
                </li>
              </ul>
            </div>

            {/* Important Links */}
            <div className="col-md-3 col-sm-6 mb-3">
              <h5 className="text-warning">Important Links</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="#" className="text-white text-decoration-none">
                    Recruitment @ VRSEC
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white text-decoration-none">
                    Stakeholders Feedback
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white text-decoration-none">
                    Institutional Best Practices
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white text-decoration-none">
                    Institutional Distinctiveness
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white text-decoration-none">
                    Service Rules
                  </a>
                </li>
              </ul>
            </div>

            {/* VRSEC - Laboratories */}
            <div className="col-md-3 col-sm-6">
              <h5 className="text-warning">VRSEC - Laboratories</h5>
              <div className="mb-3">
                <video width="100%" controls>
                  <source src="path_to_video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <h5 className="text-warning">Follow Us!</h5>
              <div>
                <a href="#" className="text-white me-2">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="#" className="text-white">
                  <i className="fab fa-twitter"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Organizationdashboard;
