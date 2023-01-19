import { position } from "@chakra-ui/react";
import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import Listtypess from "./List";
//import "../animating.css"
import { Box, Fade } from "@chakra-ui/react";
import logo from "assets/images/logo.png";

const Layout1 = (props) => {
  const { collapseSidebar } = useProSidebar();

  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        position: "absolute",
        paddingTop: "121px",
      }}
    >
      <Sidebar width="80px">
        <Menu>
          <Listtypess props={props} />
        </Menu>
      </Sidebar>
    </div>
  );
};
export default Layout1;
