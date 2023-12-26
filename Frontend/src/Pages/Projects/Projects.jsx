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
    <Text>Added Date: {watchTime} </Text>

    <Link to={`/projectdetails/${title}`}>
      <Button colorScheme="messenger">Details Here</Button>
    </Link>
  </Box>
);

const Projects = () => {
  const { category, difficulty } = useParams();
  const [recommendations, setRecommendations] = useState([]);

  const handleCategoryChange = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/recommendproject?category=HTML&difficulty=${difficulty}`
      );
      const data = response.data;

      console.log(data);

      setRecommendations(data.recommendations);
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
            Real World PROJECT !!!
          </Heading>
          <VStack align="center" spacing="4">
            {recommendations.length > 0 && (
              <VStack align="start" spacing="4">
                <Heading as="h2" size="lg">
                  Top Recommendations for {category} & Level : {difficulty}!!!
                </Heading>
                <SimpleGrid columns={3} spacing={4}>
                  {recommendations.map((recommendation, index) => (
                    <Card
                      key={index}
                      title={recommendation.project_name}
                      rating={recommendation.rating}
                      watchTime={recommendation.recently_added_date}
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

export default Projects;
