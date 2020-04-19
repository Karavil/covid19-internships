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
