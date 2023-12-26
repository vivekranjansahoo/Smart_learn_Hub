import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Button, Container, Grid, VStack, Text } from "@chakra-ui/react";

import { Link } from "react-router-dom";

import NavUser from "../../Components/Header/NavUser/NavUser";

const Choice = () => {
  return (
    <>
      <NavUser />
      <div style={{ backgroundColor: "#131324" }}>
        <Container>
          <Grid minH={"90vh"} alignItems={"center"}>
            <VStack direction="row" spacing={4}>
              <Text
                bgGradient="linear(to-r, #FF8C00, #FFD700)"
                backgroundClip="text"
                fontWeight="bold"
                fontSize="xl"
              >
                {" "}
                Choose Your Domain !!!{" "}
              </Text>
              <Link to={"/webdevlopment"}>
                <Button
                  colorScheme="cyan"
                  variant="solid"
                  w={"300px"}
                  rightIcon={<ArrowForwardIcon />}
                  _hover={{ bgGradient: "linear(to-r, #FFD700, #FF8C00)" }}
                >
                  Web Development
                </Button>
              </Link>
              <Text
                bgGradient="linear(to-r, #FF8C00, #FFD700)"
                backgroundClip="text"
                fontWeight="bold"
                fontSize="xl"
              >
                {" "}
                Or{" "}
              </Text>
              <Link to={"/lsplogin"}>
                <Button
                  colorScheme="cyan"
                  variant="solid"
                  _hover={{ bgGradient: "linear(to-r, #FFD700, #FF8C00)" }}
                  w={"300px"}
                  rightIcon={<ArrowForwardIcon />}
                >
                  Cybersecurity
                </Button>
              </Link>
              <Text
                bgGradient="linear(to-r, #FF8C00, #FFD700)"
                backgroundClip="text"
                fontWeight="bold"
                fontSize="xl"
              >
                {" "}
                Or{" "}
              </Text>
              <Link to={"/adminlogin"}>
                <Button
                  colorScheme="cyan"
                  variant="solid"
                  _hover={{ bgGradient: "linear(to-r, #FFD700, #FF8C00)" }}
                  w={"300px"}
                  rightIcon={<ArrowForwardIcon />}
                >
                  Data Science
                </Button>
              </Link>
              <Text
                bgGradient="linear(to-r, #FF8C00, #FFD700)"
                backgroundClip="text"
                fontWeight="bold"
                fontSize="xl"
              >
                {" "}
                Or{" "}
              </Text>
              <Link to={"/adminlogin"}>
                <Button
                  colorScheme="cyan"
                  variant="solid"
                  _hover={{ bgGradient: "linear(to-r, #FFD700, #FF8C00)" }}
                  w={"300px"}
                  rightIcon={<ArrowForwardIcon />}
                >
                  Ai & ML
                </Button>
              </Link>
              <Text
                bgGradient="linear(to-r, #FF8C00, #FFD700)"
                backgroundClip="text"
                fontWeight="bold"
                fontSize="xl"
              >
                {" "}
                Or{" "}
              </Text>
              <Link to={"/adminlogin"}>
                <Button
                  colorScheme="cyan"
                  variant="solid"
                  _hover={{ bgGradient: "linear(to-r, #FFD700, #FF8C00)" }}
                  w={"300px"}
                  rightIcon={<ArrowForwardIcon />}
                >
                  Cloud Computing
                </Button>
              </Link>
            </VStack>
          </Grid>
        </Container>
      </div>
    </>
  );
};

export default Choice;
