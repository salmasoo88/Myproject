import { Box, Fade } from "@chakra-ui/react";
import Listtypess from "./List";


const BoxTest = () => {
   
    return (
      //the whole box
      <Box
        shadow="1g"
        pos="fixed"
        p="10px"
        left="10px"
        bottom="80px"
        rounded={"lg"}
        // bg="white"
        zIndex={9}
        transition="all 220ms"
        w="200px"
        h="300px"
         border="2px solid #ccc"
      >
        <Listtypess/>
 </Box>
    )}

    export default BoxTest