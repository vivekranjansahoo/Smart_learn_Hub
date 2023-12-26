import React from "react";
import imge from "./image/12.gif";
import "./Thankyou.css";
import NavUser from "../../Components/Header/NavUser/NavUser";
import { Button, Image } from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";

const Thankyou = () => {
  const { coursename } = useParams();
  return (
    <div>
      <NavUser />
      <h1>Thank You !!!! keep Learning</h1>
      <Link to={`/coursedetails/${coursename}`}>
        <Button>Go to Your Course </Button>
      </Link>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {" "}
        <Image src={imge} />
      </div>
    </div>
  );
};

export default Thankyou;
