import React, { useState } from "react";
import InternshipCard from "./InternshipCard";

import {
   SimpleGrid,
   Input,
   Alert,
   AlertTitle,
   Box,
   Spinner,
   Flex,
   Text,
   Icon,
   Link,
} from "@chakra-ui/core";

const sortInternshipByCompany = (a, b) => {
   if (a.company < b.company) {
      return -1;
   }
   if (b.company < a.company) {
      return 1;
   }
   return 0;
};

const Internships = ({ internships, cancelledCount, stillOnCount }) => {
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
         <Text my={-1} fontSize="3xl" fontWeight="bold">
            Covid-19 Internship Tracker
         </Text>
         <Text my={-1}>
            <Link href="https://github.com/gcreddy42/hiring2020" isExternal>
               Powered by
               <Text as="span" color="blue.500" m={0}>
                  {" gcreddy42's list "}
                  <Icon
                     color="blue.500"
                     name="external-link"
                     mx="2px"
                     mb="2px"
                  />
               </Text>
            </Link>
         </Text>

         <Input
            my={4}
            placeholder="Search for a company"
            onChange={(e) => setFilter(e.target.value)}
         />

         {internships.length > 0 ? (
            <>
               <Flex mb={4}>
                  <Alert
                     borderTopLeftRadius={5}
                     borderBottomLeftRadius={5}
                     width={`${
                        (cancelledCount * 100) / (cancelledCount + stillOnCount)
                     }%`}
                     justifyContent="center"
                     status="error"
                  >
                     <AlertTitle>{cancelledCount} cancelled</AlertTitle>
                  </Alert>
                  <Alert
                     borderTopRightRadius={5}
                     borderBottomRightRadius={5}
                     width={`${
                        (stillOnCount * 100) / (cancelledCount + stillOnCount)
                     }%`}
                     justifyContent="center"
                     status="success"
                  >
                     <AlertTitle>{stillOnCount} still on!</AlertTitle>
                  </Alert>
               </Flex>
               <SimpleGrid columns={[1, 2, 3, 5]} spacing={3}>
                  {InternshipCards}
               </SimpleGrid>
            </>
         ) : (
            <Flex width="100%" justify="center">
               <Spinner
                  mx="auto"
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
