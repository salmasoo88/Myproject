import React, { useMemo, useState } from "react";
import { Box, Fade } from "@chakra-ui/react";
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
  } from '@chakra-ui/react'

  import Listtypess from "./List";

  
  const DrawerExamp=({ isOpen, onOpen, onClose ,focus1})=> {
    const firstField = React.useRef()
  
    return (
      <>
        
        <Drawer
          isOpen={isOpen}
          
          onClose={() => {}}
        
          placement='left'

        initialFocusRef={focus1}
         //lockFocusAcrossFrames={true}
          //autoFocus='false's
        trapFocus={false}
        >
         
          <DrawerContent>
           
            <DrawerHeader>Contry List</DrawerHeader>
  
            <DrawerBody>
          <Listtypess/>
            </DrawerBody>
  
            
          </DrawerContent>
        </Drawer>
       
      </>
    )
  }
  export default DrawerExamp;