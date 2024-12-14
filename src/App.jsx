import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./Components/Landingpage/LandingPage";
import OrganizationLogin from "./Components/OrganizationDashboard/OrganizationLogin";
import StudentLogin from "./Components/Studntdashboard/StudentLogin";
import ParentLogin from "./Components/ParentOrganization/ParentLogin";
import Organizationdashboard from "./Components/OrganizationDashboard/Organizationdashboard";
import StudentEnrollment from "./Components/Enrollment/StudentEnrollment";
import FacultyEnrollment from "./Components/Enrollment/FacultyEnrollment";
import StudentDashboard from "./Components/Studntdashboard/StudentDashboard";
import FacultyDashboard from "./Components/FacultyDashboard/FacultyDashboard";
import AttendanceDashboard from "./Components/FacultyDashboard/AttendenceDasnboard";
import StudentData from "./Components/AllData/StudentData";
import FacultyData from "./Components/AllData/FacultyData";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/orglogin" element={<OrganizationLogin />} />
          <Route path="/studlogin" element={<StudentLogin />} />
          <Route path="/parentlogin" element={<ParentLogin />} />
          <Route path="/orgdashboard" element={<Organizationdashboard />} />
          <Route path="/facultyboard" element={<FacultyDashboard />} />
          <Route path="/studentenroll" element={<StudentEnrollment />} />
          <Route path="/facultyenroll" element={<FacultyEnrollment />} />
          <Route path="/studDashboard" element={<StudentDashboard />} />
          <Route path="/mystudents" element={<StudentData />} />
          <Route path="/myfaculty" element={<FacultyData />} />
          <Route
            path="/attendenceDashboard"
            element={<AttendanceDashboard />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
