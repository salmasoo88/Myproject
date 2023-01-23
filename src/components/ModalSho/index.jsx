import React, { useMemo, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Heading,
  Box,
  Text,
  Divider,
  Image,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import country from "data/country";
import ReactPlayer from "react-player/lazy";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ModalShowProject = ({ onClose, isOpen, item, activeCountry }) => {
  //
  const [playing, setPlaying] = useState(false);
  //
  const [showAllTitle, setShowAllTitle] = useState(false);
  // find country from data
  const [countryName, countryProject] = useMemo(() => {
    return (
      Object.entries(country).find(([key]) => {
        return key?.toLowerCase() === activeCountry?.toLowerCase();
      }) ?? []
    );
  }, [activeCountry]);
  //
  return (
    //slide hotProj
    <Modal
      size="4xl"
      autoFocus={false}
      isCentered
      onClose={onClose}
      isOpen={isOpen}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent zIndex={999999}>
        <ModalHeader>{countryName ?? activeCountry}</ModalHeader>
        <ModalCloseButton />
        <ModalBody px={0}>
          <Box px="45px" mb="50px" h="60vh" flex="unset" overflow="auto">
            <Heading
              as="h4"
              size="md"
              color="gray.700"
              noOfLines={showAllTitle ? null : 1}
              onMouseEnter={() => {
                setShowAllTitle(true);
              }}
              onMouseLeave={() => {
                setShowAllTitle(false);
              }}
            >
              {item?.title}
            </Heading>
            <Text fontSize="md" color="gray.500">
              {item?.Plname}
            </Text>
            <Divider my={4} />
            <Grid templateColumns="repeat(19,minmax(0,1fr))" gap={5}>
              {item?.description && (
                <GridItem colSpan={item?.image ? { base: 19, lg: 10 } : 19}>
                  <Box
                    lineHeight={1.5}
                    fontSize="lg"
                    color="gray.500"
                    textAlign="justify"
                    dangerouslySetInnerHTML={{
                      __html: item?.description,
                    }}
                  />
                </GridItem>
              )}
              {item?.image && (
                <GridItem
                  colSpan={item?.description ? { base: 19, lg: 9 } : 19}
                >
                  <Image
                    mb="2"
                    src={item?.image}
                    // MODEL 1
                    objectFit="cover"
                    // MODEL 2
                    // objectFit="contain"
                    width="100%"
                    height="380px"
                    alt="image"
                    borderRadius="lg"
                  />
                </GridItem>
              )}
            </Grid>
            {item?.video && (
              <Box my={5}>
                <ReactPlayer
                  playing={playing}
                  width="100%"
                  url={item?.video}
                  controls={true}
                  onPlay={() => setPlaying(true)}
                  onPause={() => setPlaying(false)}
                />
              </Box>
            )}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalShowProject;
