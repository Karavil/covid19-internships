import React, { useState } from "react";
import InternshipCard from "./InternshipCard";

import { SimpleGrid, Input, Box, Spinner, Flex, Text } from "@chakra-ui/core";

const sortInternshipByCompany = (a, b) => {
   if (a.company < b.company) {
      return -1;
   }
   if (b.company < a.company) {
      return 1;
   }
   return 0;
};

const Internships = ({ internships }) => {
   const [filter, setFilter] = useState("");

   const sortedAndFilteredInternships = internships
      .sort(sortInternshipByCompany)
      .filter((internship) =>
         internship.company.toLowerCase().includes(filter.toLowerCase())
      );

   const InternshipCards = sortedAndFilteredInternships.map((internship) => (
      <InternshipCard internship={internship}>
         {internship.company},{" "}
         {internship.status ? "cancelled" : "not cancelled"},{" "}
         {internship.description}
      </InternshipCard>
   ));

   return (
      <Box p={3}>
         <Text my={-2} fontSize="3xl" fontWeight="bold">
            Internship Statuses for Covid-19
         </Text>
         <Input
            my={4}
            placeholder="Search for a company"
            onChange={(e) => setFilter(e.target.value)}
         />
         {internships.length > 0 ? (
            <SimpleGrid columns={4} spacing={3}>
               {InternshipCards}
            </SimpleGrid>
         ) : (
            <Flex width="100%" justify="center">
               <Spinner
                  thickness="10px"
                  emptyColor="gray.200"
                  color="purple.500"
                  size="xl"
               />
            </Flex>
         )}
      </Box>
   );
};

export default Internships;
