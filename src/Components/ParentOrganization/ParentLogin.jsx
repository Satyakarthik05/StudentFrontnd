import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../public/logo1.png";

export default function ParentLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage(""); // Clear any previous error messages
    setSuccessMessage(""); // Clear any previous success messages

    const regno = event.target.regno.value;

    // Hardcoded password check (not sent to the backend)
    const predefinedPassword = "123456";

    if (event.target.password.value !== predefinedPassword) {
      setErrorMessage("Invalid password");
      setIsLoading(false);
      return;
    }

    try {
      // Send only regno to backend
      const response = await fetch(
        `https://studentbakend.onrender.com/student/studentlogin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ regno }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // If login is successful, show success message and redirect
        setSuccessMessage(data.message);
        setTimeout(() => {
          navigate("/studDashboard"); // Redirect to dashboard or another page after successful login
        }, 2000);
      } else {
        // If login fails, show error message
        setErrorMessage(data.message);
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center bg-gradient p-4 m-auto flex-column"
      style={{ minHeight: "100vh", width: "40%", gap: "10px" }}
    >
      <img src={logo} alt="logo" style={{ height: "70px" }} />
      <div className="card w-100 max-w-md">
        <div className="card-header text-center">
          <div className="d-flex align-items-center justify-content-center mb-2">
            <i className="bi bi-book h3 text-primary"></i>
          </div>
          <h2 className="card-title text-center mt-2">Student Login</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="mb-3">
              <label htmlFor="regno" className="form-label">
                Roll Number
              </label>
              <input
                type="text"
                id="regno"
                className="form-control"
                placeholder="Enter your roll number"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Enter your password"
                required
              />
            </div>
            <div style={{ width: "100%" }}>
              <button
                type="submit"
                className="btn btn-primary w-60"
                style={{ marginLeft: "40%", width: "100px" }}
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Log In"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      <div
        className={`modal fade ${successMessage ? "show" : ""}`}
        tabIndex="-1"
        style={{ display: successMessage ? "block" : "none" }}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Success</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>{successMessage}</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-success"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Error Modal */}
      <div
        className={`modal fade ${errorMessage ? "show" : ""}`}
        tabIndex="-1"
        style={{ display: errorMessage ? "block" : "none" }}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Error</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>{errorMessage}</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
