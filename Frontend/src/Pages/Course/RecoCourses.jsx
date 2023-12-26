import React, { useState } from "react";
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
    <Button colorScheme="messenger">Enroll Here</Button>
  </Box>
);

const RecoCourses = () => {
  const [category, setCategory] = useState("");
  const [recommendations, setRecommendations] = useState([]);

  const handleCategoryChange = async (newCategory) => {
    setCategory(newCategory);

    try {
      const response = await axios.get(
        `http://localhost:5000/courses?category=${newCategory}`
      );
      const data = response.data;
      console.log(data);

      setRecommendations(data.courses);
      //   setModelAccuracy(data.model_accuracy);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  return (
    <>
      <NavUser />
      <ChakraProvider>
        <Box textAlign="center" mt="8">
          <Heading fontSize="2xl" fontWeight="bold" mb="4">
            Choose a Category
          </Heading>
          <VStack align="start" spacing="4">
            <Select
              value={category}
              onChange={(e) => handleCategoryChange(e.target.value)}
              placeholder="Select Category"
            >
              <option value="HTML">HTML</option>
              <option value="CSS">CSS</option>
              <option value="JavaScript">JavaScript</option>
              <option value="React">React</option>
              {/* Add more options based on your categories */}
            </Select>
            {recommendations.length > 0 && (
              <VStack align="start" spacing="4">
                <Heading as="h2" size="lg">
                  All Course Here
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

export default RecoCourses;
