import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BiBookOpen, BiUser, BiLock, BiLogIn, BiGroup } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

function OrganizationLogin() {
  const navigate = useNavigate();
  const [activeUser, setActiveUser] = useState("administrator");
  const [adminCredentials, setAdminCredentials] = useState({
    username: "",
    password: "",
  });
  const [facultyCredentials, setFacultyCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(""); // Error state for invalid login

  const handleSubmit = async (e) => {
    e.preventDefault();
    const credentials =
      activeUser === "administrator" ? adminCredentials : facultyCredentials;

    // Check if active user is administrator
    if (activeUser === "administrator") {
      if (
        adminCredentials.username === "Test@123" &&
        adminCredentials.password === "Test"
      ) {
        navigate("/orgdashboard");
      } else {
        setError("Invalid username or password.");
        alert("invalid email or password");
      }
    } else {
      try {
        // Make the API call to the faculty login endpoint
        const response = await fetch(
          "https://studentbakend.onrender.com/faculty/facultylogin",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              teacherId: credentials.username,
              password: credentials.password,
            }),
          }
        );

        const result = await response.json();

        if (response.status === 200) {
          // If the login is successful, store the token and navigate
          localStorage.setItem("token", result.token); // Storing token for future requests
          navigate("/facultyboard"); // Redirect to the faculty dashboard
        } else {
          setError(result.message);
          alert("invalid Teacherid or password"); // Set the error message from the server
        }
      } catch (error) {
        console.error("Login error:", error); // Log the error for debugging
        setError("An error occurred. Please try again later.");
      }
    }
  };

  const toggleUser = () => {
    setActiveUser(activeUser === "administrator" ? "faculty" : "administrator");
    setError(""); // Reset the error message when switching users
  };

  const autofillAdminCredentials = () => {
    setAdminCredentials({
      username: "Test@123",
      password: "Test",
    });
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light p-4">
      <div className="container">
        <div className="row">
          {/* Login Panel */}
          <div
            className={`col-lg-6 mb-4 ${
              activeUser === "administrator" ? "" : "order-lg-2"
            }`}
          >
            <div className="card shadow-lg">
              <div className="card-header text-center p-4">
                <h2>
                  {activeUser.charAt(0).toUpperCase() + activeUser.slice(1)}{" "}
                  Login
                </h2>
                <p className="small">
                  Not a {activeUser}?
                  <button
                    onClick={toggleUser}
                    className="btn btn-link text-decoration-none p-0 ms-1 font-weight-bold"
                  >
                    Switch to{" "}
                    {activeUser === "administrator"
                      ? "Faculty"
                      : "Administrator"}{" "}
                    Login
                  </button>
                </p>
              </div>
              <div className="card-body">
                {/* Conditional rendering of forms */}
                {activeUser === "administrator" ? (
                  <div>
                    <LoginForm
                      userType={activeUser}
                      credentials={adminCredentials}
                      setCredentials={setAdminCredentials}
                      onSubmit={handleSubmit}
                      error={error} // Pass error message to LoginForm
                    />
                    <button
                      onClick={autofillAdminCredentials}
                      className="btn btn-secondary w-100 mt-3"
                    >
                      Get Administrator Credentials
                    </button>
                  </div>
                ) : (
                  <LoginForm
                    userType={activeUser}
                    credentials={facultyCredentials}
                    setCredentials={setFacultyCredentials}
                    onSubmit={handleSubmit}
                    error={error} // Pass error message to LoginForm
                  />
                )}
              </div>
            </div>
          </div>

          {/* Welcome Message Panel */}
          <div
            className={`col-lg-6 mb-4 ${
              activeUser === "administrator" ? "" : "order-lg-1"
            }`}
          >
            <div
              className="h-100 text-white p-4 rounded d-flex align-items-center justify-content-center"
              style={{ backgroundColor: "green" }}
            >
              <WelcomeMessage userType={activeUser} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WelcomeMessage({ userType }) {
  return (
    <div className="text-center">
      {userType === "administrator" ? (
        <>
          <BiBookOpen className="h1 mb-3" />
          <h2>Welcome Administrator</h2>
          <p>
            Access the administrative dashboard to manage faculty, students, and
            college resources.
          </p>
        </>
      ) : (
        <>
          <BiGroup className="h1 mb-3" />
          <h2>Welcome Faculty</h2>
          <p>
            Access your teaching portal to manage courses, grades, and student
            information.
          </p>
        </>
      )}
    </div>
  );
}

function LoginForm({ userType, credentials, setCredentials, onSubmit, error }) {
  return (
    <form onSubmit={onSubmit}>
      <div className="mb-3" style={{ height: "100px" }}>
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <div className="input-group">
          <span className="input-group-text">
            <BiUser className="text-muted" />
          </span>
          <input
            id="username"
            type="text"
            className="form-control"
            placeholder={`Enter ${userType} username`}
            value={credentials.username}
            onChange={(e) =>
              setCredentials({ ...credentials, username: e.target.value })
            }
            required
          />
        </div>
        {error && error.includes("Invalid username") && (
          <div className="text-danger mt-1" style={{ color: "red" }}>
            {error}
          </div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <div className="input-group">
          <span className="input-group-text">
            <BiLock className="text-muted" />
          </span>
          <input
            id="password"
            type="password"
            className="form-control"
            placeholder="Enter your password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
            required
          />
        </div>
        {error && error.includes("Invalid password") && (
          <div className="text-danger mt-1">{error}</div>
        )}
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="form-check">
          <input
            id="remember-me"
            type="checkbox"
            className="form-check-input"
          />
          <label htmlFor="remember-me" className="form-check-label">
            Remember me
          </label>
        </div>
        <a href="#" className="small text-primary">
          Forgot password?
        </a>
      </div>

      <button
        type="submit"
        className="btn btn-success w-100 d-flex align-items-center justify-content-center gap-2"
      >
        <BiLogIn className="text-white" /> Sign in as {userType}
      </button>
    </form>
  );
}

export default OrganizationLogin;
