import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import styles from "./Studentroll.module.css";

const StudentEnrollment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    regno: "",
    branch: "",
    studentphno: "",
    parentphno: "",
    joiningYear: "",
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false); // Success modal state
  const [showErrorModal, setShowErrorModal] = useState(false); // Error modal state
  const [message, setMessage] = useState(""); // Message to display in modal
  const navigate = useNavigate(); // For navigation after modal closes

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://studentbakend.onrender.com/student/studentsign",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();
      if (response.status === 200) {
        setMessage("Registration successful! Redirecting..."); // Success message
        setShowSuccessModal(true); // Show success modal
        setTimeout(() => {
          setShowSuccessModal(false); // Hide success modal after 5 seconds
          navigate("/orgdashboard"); // Navigate to another page after the modal is closed
        }, 5000);
      } else {
        setMessage(result.message); // Set the error message
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
      <div className={`${styles.card} ${styles.animateCard}`}>
        <h2 className={`${styles.heading} ${styles.animateHeading}`}>
          Student Enrollment
        </h2>
        <form onSubmit={onSubmit}>
          <div className={`${styles.inputGroup} ${styles.animateInput}`}>
            <label htmlFor="name" className={styles.label}>
              Full Name
            </label>
            <input
              id="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="John Doe"
              required
              className={styles.input}
            />
          </div>

          <div className={`${styles.inputGroup} ${styles.animateInput}`}>
            <label htmlFor="regno" className={styles.label}>
              Registration number
            </label>
            <input
              id="regno"
              value={formData.regno}
              onChange={handleInputChange}
              placeholder="22kn5a4217"
              type="text"
              required
              className={styles.input}
            />
          </div>

          <div className={`${styles.inputGroup} ${styles.animateInput}`}>
            <label htmlFor="branch" className={styles.label}>
              Branch
            </label>
            <select
              id="branch"
              value={formData.branch}
              onChange={handleInputChange}
              required
              className={styles.select}
            >
              <option value="" disabled>
                Select Your branch
              </option>
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

          <div className={`${styles.inputGroup} ${styles.animateInput}`}>
            <label htmlFor="studentphno" className={styles.label}>
              Phone Number
            </label>
            <input
              id="studentphno"
              value={formData.studentphno}
              onChange={handleInputChange}
              placeholder="eg: 9332713456"
              required
              className={styles.input}
            />
          </div>

          <div className={`${styles.inputGroup} ${styles.animateInput}`}>
            <label htmlFor="parentphno" className={styles.label}>
              Parent Phone Number
            </label>
            <input
              id="parentphno"
              value={formData.parentphno}
              onChange={handleInputChange}
              placeholder="eg: 9332713456"
              required
              className={styles.input}
            />
          </div>

          <div className={`${styles.inputGroup} ${styles.animateInput}`}>
            <label htmlFor="joiningYear" className={styles.label}>
              Year of Joining
            </label>
            <input
              id="joiningYear"
              value={formData.joiningYear}
              onChange={handleInputChange}
              placeholder="eg: 2020"
              required
              className={styles.input}
            />
          </div>

          <div className={`${styles.buttonGroup} ${styles.animateButton}`}>
            <button
              className={styles.button}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Joining..." : "Submit"}
            </button>
          </div>
        </form>
      </div>

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

export default StudentEnrollment;
