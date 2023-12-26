import React, { useEffect, useState } from "react";
// import "./Web.css";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import NavUser from "../../../Components/Header/NavUser/NavUser";
const Web = () => {
  const StyledDiv = styled.div`
    .timeline {
      position: relative;
      width: 100%;
      max-width: 1140px;
      margin: 0 auto;
      padding: 15px 0;
    }

    .timeline::after {
      content: "";
      position: absolute;
      width: 2px;
      background: #006e51;
      top: 0;
      bottom: 0;
      left: 50%;
      margin-left: -1px;
    }

    .container {
      padding: 15px 30px;
      position: relative;
      background: inherit;
      width: 50%;
    }

    .container.left {
      right: 26%;
    }

    .container.right {
      left: 26%;
    }

    .container::after {
      content: "";
      position: absolute;
      width: 16px;
      height: 16px;
      top: calc(50% - 8px);
      right: -8px;
      background: #ffffff;
      border: 2px solid #006e51;
      border-radius: 16px;
      z-index: 1;
    }

    .container.right::after {
      left: -8px;
    }

    .container::before {
      content: "";
      position: absolute;
      width: 50px;
      height: 2px;
      top: calc(50% - 1px);
      right: 8px;
      background: #006e51;
      z-index: 1;
    }

    .container.right::before {
      left: 8px;
    }

    .container .date {
      position: absolute;
      display: inline-block;
      top: calc(50% - 8px);
      text-align: center;
      font-size: 14px;
      font-weight: bold;
      color: #006e51;
      text-transform: uppercase;
      letter-spacing: 1px;
      z-index: 1;
    }

    .container.left .date {
      right: -75px;
    }

    .container.right .date {
      left: -75px;
    }

    .container .icon {
      position: absolute;
      display: inline-block;
      width: 40px;
      height: 40px;
      padding: 9px 0;
      top: calc(50% - 20px);
      background: #f6d155;
      border: 2px solid #006e51;
      border-radius: 40px;
      text-align: center;
      font-size: 18px;
      color: #006e51;
      z-index: 1;
    }

    .container.left .icon {
      right: 56px;
    }

    .container.right .icon {
      left: 56px;
    }

    .container .content {
      padding: 30px 90px 30px 30px;
      background: #f6d155;
      position: relative;
      border-radius: 0 500px 500px 0;
    }

    .container.right .content {
      padding: 30px 30px 30px 90px;
      border-radius: 500px 0 0 500px;
    }

    .container .content h2 {
      margin: 0 0 10px 0;
      font-size: 18px;
      font-weight: normal;
      color: #006e51;
    }

    .container .content p {
      margin: 0;
      font-size: 16px;
      line-height: 22px;
      color: #000000;
    }

    @media (max-width: 767.98px) {
      .timeline::after {
        left: 90px;
      }

      .container {
        width: 100%;
        padding-left: 120px;
        padding-right: 30px;
      }

      .container.right {
        left: 0%;
      }

      .container.left::after,
      .container.right::after {
        left: 82px;
      }

      .container.left::before,
      .container.right::before {
        left: 100px;
        border-color: transparent #006e51 transparent transparent;
      }

      .container.left .date,
      .container.right .date {
        right: auto;
        left: 15px;
      }

      .container.left .icon,
      .container.right .icon {
        right: auto;
        left: 146px;
      }

      .container.left .content,
      .container.right .content {
        padding: 30px 30px 30px 90px;
        border-radius: 500px 0 0 500px;
      }
    }
  `;
  return (
    <div>
      <NavUser />
      <h1>
        <u>Web Development RoadMap</u>
      </h1>
      <StyledDiv>
        <div className="timeline">
          <div className="container left">
            <div className="date">HTML</div>
            <i className="icon fa fa-home"></i>
            <div className="content">
              <h1>HTML</h1>
              <p>
                Lorem ipsum dolor sit amet elit. Aliquam odio dolor, id luctus
                erat sagittis non. Ut blandit semper pretium.
              </p>
              <Link to="/courses/HTML">
                <Button colorScheme="messenger">Click here</Button>
              </Link>
            </div>
          </div>
          <div className="container right">
            <div className="date">CSS</div>
            <i className="icon fa fa-gift"></i>
            <div className="content">
              <h1>CSS</h1>
              <p>
                Lorem ipsum dolor sit amet elit. Aliquam odio dolor, id luctus
                erat sagittis non. Ut blandit semper pretium.
              </p>
              <Link to="/courses/CSS">
                <Button colorScheme="messenger">Click here</Button>
              </Link>
            </div>
          </div>
          <div className="container left">
            <div className="date">JS</div>
            <i className="icon fa fa-user"></i>
            <div className="content">
              <h1>JavaScript</h1>
              <p>
                Lorem ipsum dolor sit amet elit. Aliquam odio dolor, id luctus
                erat sagittis non. Ut blandit semper pretium.
              </p>
              <Link to="/courses/JavaScript">
                <Button colorScheme="messenger">Click here</Button>
              </Link>
            </div>
          </div>
          <div className="container right">
            <div className="date">React</div>
            <i className="icon fa fa-running"></i>
            <div className="content">
              <h1>REACT JS</h1>
              <p>
                Lorem ipsum dolor sit amet elit. Aliquam odio dolor, id luctus
                erat sagittis non. Ut blandit semper pretium.
              </p>
              <Link to="/courses/HTML">
                <Button colorScheme="messenger">Click here</Button>
              </Link>
            </div>
          </div>
          <div className="container left">
            <div className="date">NODE</div>
            <i className="icon fa fa-cog"></i>
            <div className="content">
              <h1>NODE JS</h1>
              <p>
                Lorem ipsum dolor sit amet elit. Aliquam odio dolor, id luctus
                erat sagittis non. Ut blandit semper pretium.
              </p>
              <Link to="/courses/HTML">
                <Button colorScheme="messenger">Click here</Button>
              </Link>
            </div>
          </div>
          <div className="container right">
            <div className="date">EXPRESS</div>
            <i className="icon fa fa-certificate"></i>
            <div className="content">
              <h1>EXPRESS JS</h1>
              <p>
                Lorem ipsum dolor sit amet elit. Aliquam odio dolor, id luctus
                erat sagittis non. Ut blandit semper pretium.
              </p>
              <Link to="/courses/HTML">
                <Button colorScheme="messenger">Click here</Button>
              </Link>
            </div>
          </div>
          <div className="container left">
            <div className="date">MONGO</div>
            <i className="icon fa fa-cog"></i>
            <div className="content">
              <h1>MONGO DB</h1>
              <p>
                Lorem ipsum dolor sit amet elit. Aliquam odio dolor, id luctus
                erat sagittis non. Ut blandit semper pretium.
              </p>
              <Link to="/courses/HTML">
                <Button colorScheme="messenger">Click here</Button>
              </Link>
            </div>
          </div>
        </div>
      </StyledDiv>
    </div>
  );
};

export default Web;
