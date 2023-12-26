import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Button,
  HStack,
} from "@chakra-ui/react";
import NavUser from "../../Components/Header/NavUser/NavUser";
import { Link, useParams } from "react-router-dom";

const ProjectDetails = () => {
  const { coursename } = useParams();
  return (
    <>
      <NavUser />
      <div>
        <h1 style={{ background: "linear-gradient(45deg, #FFA500, #FFFF00)" }}>
          Project :{coursename}{" "}
        </h1>
      </div>
      <h2>All Details</h2>
      <div style={{ width: "50vw", margin: "0px 25rem" }}>
        <Accordion defaultIndex={[0]} allowMultiple>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  <h3>What to do</h3>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
        <div style={{ margin: "50px 250px" }}>
          <HStack spacing={4}>
            <Link to="/chatbot">
              <Button colorScheme="blue">Get Help</Button>
            </Link>
          </HStack>
        </div>
      </div>
    </>
  );
};

export default ProjectDetails;
