import React from "react";
import { Container, Row, Col } from "reactstrap";
import heroImg from "../../assests/images/1.jpg";
import "./hero-section.css";
import GraphemeSplitter from "grapheme-splitter";
import { TypeAnimation } from "react-type-animation";

const HeroSection = () => {
  const splitter = new GraphemeSplitter();
  return (
    <section>
      <Container>
        <Row>
          <Col>
            <div className="hero__content">
              <h1
                className=" hero__title"
                style={{ fontSize: "60px", marginTop: "50px" }}
              >
                Learn Anytime Anywhere <br />
              </h1>
              <h3 style={{ marginTop: "10px" }}>
                "Embrace the power of knowledge, <br /> ignite the flame of
                learning..."
              </h3>
              <h2 style={{ marginTop: "20px" }}>
                <TypeAnimation
                  splitter={(str) => splitter.splitGraphemes(str)}
                  sequence={[
                    "Web Development",
                    2000,
                    "Android Development",
                    2000,
                    "Blockchain",
                    2000,
                    "DevOps",
                    2000,
                    "Ai & ML",
                    2000,
                    "Cybersecurity",
                    2000,
                  ]}
                  style={{ fontSize: "4rem", color: "#4e0eff" }}
                  repeat={Infinity}
                />
              </h2>
            </div>
          </Col>

          <Col>
            <img src={heroImg} alt="" className="w-100 hero__img" />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;
