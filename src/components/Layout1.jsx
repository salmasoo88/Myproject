import { position } from '@chakra-ui/react';
import { Sidebar, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar';
import Listtypess from './List';
//import "../animating.css"
import { Box, Fade } from "@chakra-ui/react";
import logo from "assets/images/logo.png";


const Layout1=()=> {
  const { collapseSidebar } = useProSidebar();

  return (
    <div style={{ display: 'flex', height: '100%' ,position:"absolute",paddingTop:"121px"}}>
       
      <Sidebar >
      
        <Menu>
        
      
        
          <Listtypess/>

          
        </Menu>
      </Sidebar>
      
    </div>
  );
}
export default Layout1;