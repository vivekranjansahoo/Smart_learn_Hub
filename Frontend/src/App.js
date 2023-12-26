import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Homepage from "./Pages/Homepage/Homepage";
import User from "./Pages/Login/User/User";
import Teacher from "./Pages/Login/Teacher/Teacher";
import Admin from "./Pages/Login/Admin/Admin";
import UserRegister from "./Pages/Register/UserRegister/UserRegister";
import TeacherRegister from "./Pages/Register/TeacherRegister/TeacherRegister";
import UserDashboard from "./Pages/Dashboard/UserDashboard/UserDashboard";
import Choice from "./Pages/Choice/Choice";
import Web from "./Pages/Domain/Web/Web";
import Courses from "./Pages/Course/Courses";

import RecoCourses from "./Pages/Course/RecoCourses";
import Payment from "./Pages/Payment/Payment";
import Thankyou from "./Pages/Thankyou/Thankyou";
import CourseDetails from "./Pages/Course/CourseDetails";
import Quiz from "./Pages/Quiz/Quiz";
import Projects from "./Pages/Projects/Projects";
import ProjectDetails from "./Pages/Projects/ProjectDetails";
import Chatbot from "./Pages/Chatbot/Chatbot";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/login" element={<User />} />
        <Route exact path="/adminlogin" element={<Admin />} />
        <Route exact path="/teacherlogin" element={<Teacher />} />
        <Route exact path="/userregister" element={<UserRegister />} />
        <Route exact path="/teacherregister" element={<TeacherRegister />} />
        <Route exact path="/userdashboard" element={<UserDashboard />} />
        <Route exact path="/domainchoice" element={<Choice />} />
        <Route exact path="/webdevlopment" element={<Web />} />
        <Route exact path="/courses/:category" element={<Courses />} />
        <Route exact path="/allcourses" element={<RecoCourses />} />
        <Route exact path="/chatbot" element={<Chatbot />} />
        <Route exact path="/payment/:coursename" element={<Payment />} />
        <Route exact path="/thankyou/:coursename" element={<Thankyou />} />
        <Route
          exact
          path="/coursedetails/:coursename"
          element={<CourseDetails />}
        />
        <Route exact path="/quiz" element={<Quiz />} />
        <Route
          exact
          path="/projects/:category/:difficulty"
          element={<Projects />}
        />
        <Route
          exact
          path="/projectdetails/:coursename"
          element={<ProjectDetails />}
        />
        <Route exact path="/chatbot" element={<Chatbot />} />
      </Routes>
    </div>
  );
}

export default App;
