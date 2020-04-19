import React from "react";
import {
   Box,
   Text,
   Alert,
   AlertIcon,
   AlertTitle,
   Divider,
} from "@chakra-ui/core";

const InternshipCard = ({ internship }) => {
   const property = {
      imageUrl: "https://bit.ly/2Z4KKcF",
      imageAlt: "Rear view of modern home with pool",
      beds: 3,
      baths: 2,
      title: "Modern home in city center in the heart of historic Los Angeles",
      formattedPrice: "$1,900.00",
      reviewCount: 34,
      rating: 4,
   };

   const StatusData = {
      status: internship.cancelled ? "error" : "success",
      title: internship.cancelled ? "Cancelled" : "Still on!",
   };

   return (
      <Box borderWidth="1px" rounded="lg" overflow="hidden">
         <Box p="6">
            <Text fontWeight="bold" as="h2" fontSize="xl">
               {internship.company}
            </Text>

            <Divider />

            <Alert my="3" status={StatusData.status}>
               <AlertIcon />
               <AlertTitle>{StatusData.title}</AlertTitle>
            </Alert>

            <Text
               color="gray.500"
               fontWeight="semibold"
               letterSpacing="wide"
               fontSize="xs"
               textTransform="uppercase"
            >
               {internship.description}
            </Text>
         </Box>
      </Box>
   );
};

export default InternshipCard;
