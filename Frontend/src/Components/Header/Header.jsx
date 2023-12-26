import React, { useRef } from "react";
import { Container } from "reactstrap";
import "./header.css";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

// const navLinks = [
//   {
//     display: "Home",
//     url: "/",
//   },
//   {
//     display: "About",
//     url: "#",
//   },

//   {
//     display: "Courses",
//     url: "#",
//   },
//   {
//     display: "Admin Login",
//     url: "/adminlogin",
//   },
//   {
//     display: "Sign Up",
//     url: "",
//   },
// ];

const Header = () => {
  const menuRef = useRef();

  const menuToggle = () => menuRef.current.classList.toggle("active__menu");

  return (
    <header className="header">
      <Container>
        <div className="navigation d-flex align-items-center justify-content-between">
          <div className="logo">
            <h2 className=" d-flex align-items-center gap-1">
              <i class="ri-pantone-line"></i> Dear Learners.
            </h2>
          </div>

          <div className="nav d-flex align-items-center gap-5">
            <div className="nav__menu" ref={menuRef} onClick={menuToggle}>
              <ul className="nav__list">
                {/* {navLinks.map((item, index) => (
                  <li key={index} className="nav__item">
                    <a href={item.url}>{item.display}</a>
                  </li>
                ))} */}
                <li className="nav__item">
                  <Link to="/">
                    <li>Home</li>
                  </Link>
                </li>
                <li className="nav__item">
                  <Link to="/">
                    <li>About</li>
                  </Link>
                </li>
                <li className="nav__item">
                  <Link to="/">
                    <li>Courses</li>
                  </Link>
                </li>
                <li className="nav__item">
                  <Link to="/adminlogin">
                    <li>Admin Login</li>
                  </Link>
                </li>
                <li className="nav__item">
                  <Link to="/teacherlogin">
                    <li>Teacher Login</li>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="nav__right">
              <p className="mb-0 d-flex align-items-center gap-2">
                <Link to="/login">
                  <Button colorScheme="linkedin">Get Started</Button>
                </Link>
              </p>
            </div>
          </div>

          <div className="mobile__menu">
            <span>
              <i class="ri-menu-line" onClick={menuToggle}></i>
            </span>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
