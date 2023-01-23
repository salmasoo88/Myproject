import { Sidebar } from "react-pro-sidebar";
import ListTypes from "./List";
import { Box } from "@chakra-ui/react";

const Layout1 = (props) => {
  return (
    <Box
      shadow="lg"
      border="2px solid #ccc"
      sx={{
        display: "flex",
        height: "80%",
        position: "absolute",
        bottom: 3,
        bg: "transparent !important",
      }}
      mx={3}
      borderRadius="lg"
      overflowX="hidden"
    >
      <Sidebar width="180px">
        <ListTypes props={props} />
      </Sidebar>
    </Box>
  );
};
export default Layout1;
