// Chatbot.js
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Input, Button, Box, Spinner } from "@chakra-ui/react";
import NavUser from "../../Components/Header/NavUser/NavUser";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  //   const messageContainerRef = useRef(null);

  const sendMessage = async () => {
    if (input.trim() === "") return;

    // Add user message to the chat
    const userMessage = { text: input, type: "user" };
    setMessages([...messages, userMessage]);
    setLoading(true);

    try {
      // Send user message to the Flask backend and get the bot's response
      const response = await axios.post("http://localhost:5000/chatbot", {
        user_input: input,
      });

      if (response.data && Array.isArray(response.data.study_links)) {
        // Extract study links from the response
        const studyLinks = response.data.study_links;

        // Add bot's response to the chat
        setMessages([
          ...messages,
          userMessage,
          { text: "Here are some study links:", type: "bot" },
          ...studyLinks.map((link, index) => ({
            text: (
              <a
                key={index}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {`${index + 1}. ${link}`}
              </a>
            ),
            type: "bot",
          })),
        ]);

        // Clear the input only after a successful response
        setInput("");
      } else {
        console.error("Invalid or missing study_links in the server response");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  };
  //   useEffect(() => {
  //     if (messageContainerRef.current) {
  //       messageContainerRef.current.scrollTop =
  //         messageContainerRef.current.scrollHeight;
  //     }
  //   }, [messages]);

  return (
    <>
      <NavUser />
      <Box
        maxW="1000px"
        borderWidth="1px"
        borderRadius="8px"
        p="4"
        mx="auto"
        my="4"
      >
        <h1>Chatbot</h1>
        <Box h="450px" overflowY="scroll" mb="4">
          {messages.map((message, index) => (
            <Box
              key={index}
              p="2"
              mb="2"
              textAlign={message.type === "user" ? "right" : "left"}
              bg={message.type === "user" ? "cyan" : "orange"}
              borderRadius="8px"
            >
              {message.text}
            </Box>
          ))}
        </Box>
        <Box display="flex">
          <Input
            placeholder="input the text here...."
            borderColor="black"
            flex="1"
            mr="2"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            onClick={sendMessage}
            disabled={loading}
            colorScheme="messenger"
          >
            {loading ? <Spinner size="sm" /> : "Send"}
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Chatbot;
