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
import * as am5 from "@amcharts/amcharts5";
//
const hotProject = [
  {
    id: 0,
    project: {
      id: "JP",
      location: "Japan",
      title: "Protecting the beaches",
      // image: image,
      description:
        "&#8226Professor Sait advocates for the land ownership rights and independence of women and disadvantaged throughout global south.<br>&#8226   He has spoken about a variety of related issues in front of policy makers such as the UN and was a founding member of the Global Land Tools Network, which has implemented tools for equality in more than 40 countries.",
      Plname: "Ravindra Jayaratne",
      video: Ravi_video,
    },
    des: "First project",
  },
  {
    id: 1,
    project: {
      id: "ZA",
      location: "South Africa, Rwanda, Zambia and Sierra Leone",
      title:
        "Helping young people in Africa recover from the impact of Covid-19",
      // image: image,
      description:
        "&#8226Professor Sait advocates for the land ownership rights and independence of women and disadvantaged throughout global south.<br>&#8226   He has spoken about a variety of related issues in front of policy makers such as the UN and was a founding member of the Global Land Tools Network, which has implemented tools for equality in more than 40 countries.",
      Plname: "Prof Julia Davidson and Darren Sharpe",
      video: julie_video,
    },
    des: "Second Project",
  },
  {
    id: 2,
    project: {
      id: "GB",
      location: "United Kingdom",
      title: "City kids",
      // image: image,
      description:
        "&#8226Professor Sait advocates for the land ownership rights and independence of women and disadvantaged throughout global south.<br>&#8226   He has spoken about a variety of related issues in front of policy makers such as the UN and was a founding member of the Global Land Tools Network, which has implemented tools for equality in more than 40 countries.",
      Plname: "Sam Wass",
      video: Sam_video,
    },
    des: "Third Project",
  },
  {
    id: 3,
    project: {
      id: "CA",
      location: "Canada",
      title: "Pollution Pods",
      // image: image,
      description:
        "&#8226Professor Sait advocates for the land ownership rights and independence of women and disadvantaged throughout global south.<br>&#8226   He has spoken about a variety of related issues in front of policy makers such as the UN and was a founding member of the Global Land Tools Network, which has implemented tools for equality in more than 40 countries.",
      Plname: "Michael Pinksy",
      image: image,
    },
    des: "Fourth Project",
  },
];

const HotProjects = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [Id, setId] = useState(null);
  //console.log(Id);

  const selectCountry = (country) => {
    const dataItem = props.polygan.polygonSeries.getDataItemById(country.id);
    const target = dataItem.get("mapPolygon");
    if (target) {
      const centroid = target.geoCentroid();
      if (centroid) {
        props.polygan.chart.animate({
          key: "rotationX",
          to: -centroid.longitude,
          duration: 1000,
          easing: am5.ease.inOut(am5.ease.cubic),
        });
        props.polygan.chart.animate({
          key: "rotationY",
          to: -centroid.latitude,
          duration: 1000,
          easing: am5.ease.inOut(am5.ease.cubic),
        });
        setTimeout(() => {
          props.polygan.polygonSeries.zoomToDataItem(dataItem);
        }, 1100);
      }
    }
    setTimeout(() => {
      // props.setActiveCountry(dataItem.dataContext.name); open country.js modal
      setId(country);
    }, 2000);
  };
  //
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
      <ModalShowProject
        item={Id}
        isOpen={!!Id}
        onClose={() => {
          setId(null);
        }}
      />
      <Box
        display="flex"
        flexDirection="column"
        gap={3}
        h="full"
        transition="opacity 330ms"
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box as="span">Hot Project</Box>
        </Box>
        {hotProject?.map((item) => {
          return (
            //each box
            <Box
              onClick={() => {
                selectCountry(item.project);
                // setTimeout(() => {
                //   setId(item.project);
                // }, 1000);
                // props.polygan &&
                //   props.polygan.mapPolygons._values.forEach((el) => {
                //     if (
                //       el._dataItem.dataContext.name === item.project.location
                //     ) {
                //       const dataItem = props.polygan.getDataItemById(
                //         el._dataItem.dataContext.name
                //       );
                //       console.log(dataItem, props.polygan);
                //       props.polygan.zoomToDataItem(el._dataItem);
                //       // props.setActiveCountry(el._dataItem.dataContext.name); /// ino ya modal box custom kodet ya mal package bashe
                //     }
                //   });

                // const target = dataItem.get("mapPolygon");
                // if (target) {
                //   const centroid = target.geoCentroid();
                //   if (centroid) {
                //     props.polygan.chart.animate({
                //       key: "rotationX",
                //       to: -centroid.longitude,
                //       duration: 1500,
                //     });
                //     props.polygan.chart.animate({
                //       key: "rotationY",
                //       to: -centroid.latitude,
                //       duration: 1500,
                //     });
                //   }
                // }
              }}
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
