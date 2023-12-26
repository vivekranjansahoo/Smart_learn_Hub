import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  ChakraProvider,
  Box,
  Heading,
  Select,
  VStack,
  Text,
  SimpleGrid,
  Button,
} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import NavUser from "../../Components/Header/NavUser/NavUser";

const Card = ({ title, rating, watchTime }) => (
  <Box
    borderWidth="1px"
    borderRadius="lg"
    p="4"
    m="4"
    boxShadow="base"
    background="linear-gradient(45deg, #FFA500, #FFFF00)"
  >
    <Heading as="h3" size="md" fontWeight="bold" mb="2">
      Title :{title}
    </Heading>
    <Text>Rating: {rating}</Text>
    <Text>Watch Time: {watchTime} minutes</Text>
    <Heading as="h3" size="md" fontWeight="bold" mb="2">
      Fees : 249/-
    </Heading>
    <Link to={`/payment/${title}`}>
      <Button colorScheme="messenger">Enroll Here</Button>
    </Link>
  </Box>
);

const Courses = () => {
  const { category } = useParams();
  //   const [category, setCategory] = useState("");
  const [recommendations, setRecommendations] = useState([]);

  const handleCategoryChange = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/recommend?category=${category}`
      );
      const data = response.data;

      setRecommendations(data.top_recommendations);
      //   setModelAccuracy(data.model_accuracy);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  useEffect(() => {
    handleCategoryChange();
  }, []);

  return (
    <>
      <NavUser />
      <ChakraProvider>
        <Box textAlign="center" mt="8">
          <Heading fontSize="2xl" fontWeight="bold" mb="4">
            Top Recommendations through ml
          </Heading>
          <VStack align="start" spacing="4">
            {recommendations.length > 0 && (
              <VStack align="start" spacing="4">
                <Heading as="h2" size="lg">
                  Top Recommendations for {category} !!!
                </Heading>
                <SimpleGrid columns={3} spacing={4}>
                  {recommendations.map((recommendation, index) => (
                    <Card
                      key={index}
                      title={recommendation.course_name}
                      rating={recommendation.rating}
                      watchTime={recommendation.watch_time}
                    />
                  ))}
                </SimpleGrid>
              </VStack>
            )}
          </VStack>
        </Box>
      </ChakraProvider>
    </>
  );
};

export default Courses;
