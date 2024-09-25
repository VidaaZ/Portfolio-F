import { Heading, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import React from "react";

const Card = ({ title, description, imageSrc }) => {
  // Implement the UI for the Card component according to the instructions.
  // You should be able to implement the component with the elements imported above.
  // Feel free to import other UI components from Chakra UI if you wish to.
  return (
    <VStack
      align="start"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
      bg="white"
      spacing={4}
      maxW="sm"
    >
      <Image src={imageSrc} alt={title} objectFit="cover" w="100%" />
      <VStack align="start" p={4} spacing={4}>
        <Heading as="h3" size="md">
          {title}
        </Heading>
        <Text>{description}</Text>
        <HStack spacing={2} align="center">
          <Text fontWeight="bold">See more</Text>
          <FontAwesomeIcon icon={faArrowRight} size="1x" />
        </HStack>
      </VStack>
    </VStack>
  );
};

export default Card;
