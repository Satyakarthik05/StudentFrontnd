import React, { useState } from "react";
import styles from "./Facultyroll.module.css"; // Import the CSS file
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { useNavigate } from "react-router-dom"; // For navigation

const FacultyEnrollment = () => {
  const [formData, setFormData] = useState({
    teacherId: "",
    password: "",
    subject: "",
    Designation: "UG", // Default value for Designation
    yearofpassing: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false); // Success modal state
  const [showErrorModal, setShowErrorModal] = useState(false); // Error modal state
  const [message, setMessage] = useState(""); // Message to display in modal
  const navigate = useNavigate(); // For navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, // This updates the formData object, including Designation
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://studentbakend.onrender.com/faculty/facultysign",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData), // Send the form data including Designation
        }
      );

      const result = await response.json();
      if (response.status === 200) {
        setMessage(result.message); // Success message
        setShowSuccessModal(true); // Show success modal
        setTimeout(() => {
          setShowSuccessModal(false); // Hide success modal after 5 seconds
          navigate("/orgdashboard"); // Navigate to the faculty dashboard or any other page
        }, 5000);
      } else {
        setMessage(result.message); // Error message
        setShowErrorModal(true); // Show error modal
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setMessage("An error occurred. Please try again later.");
      setShowErrorModal(true); // Show error modal
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Faculty Registration</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="teacherId">Teacher ID</label>
          <input
            type="text"
            id="teacherId"
            name="teacherId"
            value={formData.teacherId}
            onChange={handleChange}
            className={styles.input}
            placeholder="Enter your Teacher ID"
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={styles.input}
            placeholder="Enter your password"
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className={styles.input}
            placeholder="Enter your subject"
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="Designation">Designation</label>
          <select
            name="Designation" // Ensure name matches the state property
            id="Designation"
            value={formData.Designation} // Value is linked to the state
            onChange={handleChange}
            className={styles.input}
            required
          >
            <option value="UG">UG</option>
            <option value="PG">PG</option>
            <option value="PhD">PhD</option>
          </select>
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="yearofpassing">Year of Passing</label>
          <input
            type="number"
            id="yearofpassing"
            name="yearofpassing"
            value={formData.yearofpassing || ""}
            onChange={handleChange}
            className={styles.input}
            placeholder="Enter year of passing"
            required
          />
        </div>
        <button type="submit" className={styles.button} disabled={isLoading}>
          {isLoading ? "Registering..." : "Register"}
        </button>
      </form>

      {/* Success Modal */}
      {showSuccessModal && (
        <div
          className="modal fade show"
          style={{ display: "block", color: "green" }}
          tabIndex="-1"
          role="dialog"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Registration Successful</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setShowSuccessModal(false)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>{message}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {showErrorModal && (
        <div
          className="modal fade show"
          style={{ display: "block", color: "red" }}
          tabIndex="-1"
          role="dialog"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Error</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setShowErrorModal(false)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>{message}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyEnrollment;
