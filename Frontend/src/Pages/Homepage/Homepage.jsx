import React, { Fragment } from "react";

import Header from "../../Components/Header/Header";
import HeroSection from "../../Components/Hero-Section/HeroSection";
import CompanySection from "../../Components/Company-section/Company-section";

import AboutUs from "../../Components/About-us/AboutUs";
import Courses from "../../Components/Courses-section/Courses";
import ChooseUs from "../../Components/Choose-us/ChooseUs";
import Features from "../../Components/Feature-section/Features";
import FreeCourse from "../../Components/Free-course-section/FreeCourse";

import Testimonials from "../../Components/Testimonial/Testimonials";

import Newsletter from "../../Components/Newsletter/Newsletter";
import Footer from "../../Components/Footer/Footer";
const Homepage = () => {
  return (
    <div className="home">
      <Fragment>
        <Header />
        <HeroSection />
        <CompanySection />
        <AboutUs />
        <Courses />
        <ChooseUs />
        <Features />
        <FreeCourse />
        <Testimonials />

        <Footer />
      </Fragment>
    </div>
  );
};

export default Homepage;
