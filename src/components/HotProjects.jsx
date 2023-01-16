import { CloseIcon } from "@chakra-ui/icons";
import { Box, Fade } from "@chakra-ui/react";
import React, { useState } from "react";
import ModalShowProject from "./ModalSho";
import ReactPlayer from "react-player/lazy";
import Ravi_video from "assets/video/Ravi intro REF 2021 FINAL (Captioned by Zubtitle) (1).mp4";
import Sam_video from "assets/video/Sam Wass intro FINAL (Captioned by Zubtitle).mp4";
import julie_video from "assets/video/JULIA DAVIDSON - REF - intro - final (Captioned by Zubtitle).mp4";
import image from "assets/images/Pollution.jpeg";
import image1 from "assets/images/ACE A Conversational AI Approach to Detecting Deception and Tackling Insurance Fraud Julie Wall 4.jpg";


const hotProject = [
  { id: 0,project: {
      location: "Japan",
      title: "Protecting the beaches",
      // image: image,
      description:
        "&#8226Professor Sait advocates for the land ownership rights and independence of women and disadvantaged throughout global south.<br>&#8226   He has spoken about a variety of related issues in front of policy makers such as the UN and was a founding member of the Global Land Tools Network, which has implemented tools for equality in more than 40 countries.",
      Plname: "Ravindra Jayaratne",
      video: Ravi_video,
    },
     des: "First project" },
  { id: 1, project:{
      location: "South Africa, Rwanda, Zambia and Sierra Leone",
      title: "Helping young people in Africa recover from the impact of Covid-19",
      // image: image,
      description:
        "&#8226Professor Sait advocates for the land ownership rights and independence of women and disadvantaged throughout global south.<br>&#8226   He has spoken about a variety of related issues in front of policy makers such as the UN and was a founding member of the Global Land Tools Network, which has implemented tools for equality in more than 40 countries.",
      Plname: "Prof Julia Davidson and Darren Sharpe",
      video: julie_video,
    } ,des: "Second Project" },
  { id: 2,project: {
      location: "UK",
      title: "City kids",
      // image: image,
      description:
        "&#8226Professor Sait advocates for the land ownership rights and independence of women and disadvantaged throughout global south.<br>&#8226   He has spoken about a variety of related issues in front of policy makers such as the UN and was a founding member of the Global Land Tools Network, which has implemented tools for equality in more than 40 countries.",
      Plname: "Sam Wass",
       video: Sam_video,
    }, des: "Third Project" },
     { id: 3,project: {
      location: "Canada",
      title: "Pollution Pods",
      // image: image,
      description:
        "&#8226Professor Sait advocates for the land ownership rights and independence of women and disadvantaged throughout global south.<br>&#8226   He has spoken about a variety of related issues in front of policy makers such as the UN and was a founding member of the Global Land Tools Network, which has implemented tools for equality in more than 40 countries.",
       Plname: "Michael Pinksy",
      image: image,
   
    },
     des: "Fourth Project" },
];

const HotProjects = () => {
  const [isOpen, setIsOpen] = useState(false);
   const [Id,setId ] = useState(null);
  //console.log(Id);
  return (
    //the whole box
    <Box
      shadow="1g"
      pos="fixed"
      p="10px"
      right="10px"
      bottom="105px"
      rounded={"lg"}
      // bg="white"
      zIndex={9}
      transition="all 220ms"
      w="200px"
      h="400px"
       border="2px solid #ccc"
    >
     <ModalShowProject item={Id} isOpen={!!Id} onClose={()=>{setId(null)}}/>
      <Box
        display="flex"
        flexDirection="column"
        gap={3}
        h="full"
        transition="opacity 330ms"
      >
        <Box display="flex" justifyContent="space-between" alignItems="center"  >
          <Box as="span">Hot Project</Box>
         

        </Box>
        {hotProject?.map((item) => {
          return (
            //each box
            <Box
            onClick={()=>{
              console.log("dddd")
              setId(item.project)}}

              display="flex"
              justifyContent="center"
              alignItems="center"
              flexGrow={1}
              border="1px solid #ccc"
              key={item?.id}
              textAlign="center"
              p="3"
              rounded={"lg"}
              _hover={{ bg: "#6794dc", color: "#fff" }}
              cursor="pointer"
               bg="white"
            >
              {item?.des}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default HotProjects;
