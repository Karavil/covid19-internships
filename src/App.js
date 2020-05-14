import React, { useState, useEffect } from "react";
import axios from "axios";

import { theme } from "@chakra-ui/core";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import { createGlobalStyle } from "styled-components";

import Internships from "./components/Internships";

const GlobalStyle = createGlobalStyle`
   * {
      box-sizing: border-box;
      font-family: 'Raleway', sans-serif !important;
   }

   body {
      margin: 0;
   }
`;

function App() {
   const [internships, setInternships] = useState([]);
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      setLoading(true);
      axios
         .get(
            "https://raw.githubusercontent.com/gcreddy42/hiring2020/master/README.md"
         )
         .then((res) => {
            let markdown = res.data;
            const startParseAfter = "Notes";
            const endParseBefore = "This list is based on the initial list";

            markdown = markdown.replace(/[^\w\s.,&()|❌✅]/gi, "");
            markdown = markdown.substring(
               markdown.indexOf(startParseAfter) + startParseAfter.length,
               markdown.indexOf(endParseBefore)
            );

            markdown = markdown
               .substring(markdown.indexOf("||||") + 5, markdown.length)
               .trim();

            const internshipData = [];
            markdown.split("\n").forEach((parsedData) => {
               const columns = parsedData.split("|");
               if (columns[1]) {
                  internshipData.push({
                     company: columns[1],
                     cancelled: columns[2] === "✅" ? false : true,
                     description: columns[3],
                  });
               }
            });

            console.log(internshipData);

            setLoading(false);
            setInternships(internshipData);
         })
         .catch((err) => console.log(err));
   }, []);

   return (
      <ThemeProvider theme={theme}>
         <CSSReset />
         <GlobalStyle />
         <Internships internships={internships} />
      </ThemeProvider>
   );
}

export default App;
