import { Box } from "@chakra-ui/react";
import React, { useState } from "react";
import ModalShowProject from "./ModalSho";
import Ravi_video from "assets/video/Ravi intro REF 2021 FINAL (Captioned by Zubtitle) (1).mp4";
import Sam_video from "assets/video/Sam Wass intro FINAL (Captioned by Zubtitle).mp4";
import julie_video from "assets/video/JULIA DAVIDSON - REF - intro - final (Captioned by Zubtitle).mp4";
import image from "assets/images/Pollution.jpeg";
import image1 from "assets/images/ACE A Conversational AI Approach to Detecting Deception and Tackling Insurance Fraud Julie Wall 4.jpg";
import * as am5 from "@amcharts/amcharts5";
import { connectingNature } from "data/image_videosExport";
//
const hotProject = [
  {
    id: 0,
    project: {
      id: "JP",
      location: "Japan",
      title: "Protecting the beaches",
      // image: image,
      description: "",
      Plname: "Ravindra Jayaratne",
      video: Ravi_video,
    },
    des: "Protecting the beaches",
  },
  {
    id: 1,
    project: {
      location: "South Africa, Rwanda, Zambia and Sierra Leone",
      title:
        "Helping young people in Africa recover from the impact of Covid-19",
      // image: image,
      description: "",
      Plname: "Prof Julia Davidson and Darren Sharpe",
      video: julie_video,
    },
    des: "Covid-19 in Africa ",
  },
  {
    id: 2,
    project: {
      id: "GB",
      location: "United Kingdom",
      title: "City kids",
      // image: image,
      description: "",
      Plname: "Sam Wass",
      video: Sam_video,
    },
    des: "City kids",
  },
  {
    id: 3,
    project: {
      id: "FI",
      location: "Finland",
      title: "Cyber Security",
      // image: image,
      description:
        "&#8226The wide circulation of disinformation including both fake news and deep fake videos, particularly on social media is polluting its transparency and authenticity turning it into an untrustworthy environment.<br>&#8226 While research on fake news is considerably high, the research on AI-generated deep fake video is still in the infancy stage.<br>&#8226 Following this need, the prime objective of this research is to develop a proactive, advanced explainable, human collaborated AI-based online disinformation detecting tool for securing a trustworthy social media environment.<br>&#8226 he aim is to build technological capability for algorithmic fake video detection. that could be installed or delivered as a service.  ",
      Plname: "Nadeem Qazi",
    },
    des: "Cyber Security",
  },
  {
    id: 4,
    project: {
      id: "GB",
      location: "United Kingdom",
      title:
        "A Conversational AI Approach to Detecting Deception and Tackling Insurance Fraud",
      image: image,
      description:
        "&#8226Speech and natural language technology have advanced at a rapid pace in recent years.<br>&#8226 Today, there are numerous commercial products that rely on speech, natural language processing and natural language understanding, loosely termed Conversational AI.",
      Plname: "Julie Wall",
    },
    des: "Conversational AI",
  },
  {
    id: 5,
    project: {
      location: "United Kingdom",
      title: "Connecting Nature",
      image: connectingNature,
      description:
        "&#8226 Understanding and helping to remove the barriers that prevent us rapidly decarbonising our communities, buildings, transport and lives. <br>&#8226Unlocking the mainstreaming of nature-based solutions represents a complex challenge requiring novel and multidisciplinary approaches. <br>&#8226Connecting Nature worked with cities across the EU to explore the challenges and opportunities involved in mainstreaming nature-based solutions and provided tools to other cities globally to address this challenge.",
      Plname: "Stuart Connop & Paula Vandergert",
    },
    des: "Connecting Nature",
  },
];

const HotProjects = (props) => {
  const [Id, setId] = useState(null);

  const selectCountry = (country) => {
    const dataItem = props.polygan.polygonSeries.getDataItemById(country.id);
    if (dataItem) {
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
    } else setId(country);
  };
  //
  return (
    //the whole box
    <Box
      shadow="lg"
      pos="fixed"
      p="10px"
      right="10px"
      bottom="105px"
      rounded="lg"
      zIndex={9}
      transition="all 220ms"
      w="220px"
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
        {hotProject?.map((item) => {
          return (
            //each box
            <Box
              onClick={() => {
                selectCountry(item.project);
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
              isTruncated={true}
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
