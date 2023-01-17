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
  Stack,
} from "@chakra-ui/react";
import country from "data/country";
import ReactPlayer from "react-player/lazy";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ModalShowProject = ({ onClose, isOpen, item, activeCountry }) => {
  const [activeIndex, setActiveIndex] = useState(0);
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
    //slide hotproj
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
            <Stack direction="row">
              {item?.description && (
                <Box flex="1">
                  <Text fontSize="lg" color="gray.500" textAlign="justify">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: item?.description,
                      }}
                    />
                  </Text>
                </Box>
              )}
              {item?.image && (
                <Box flex="1">
                  <Box
                    as="img"
                    mb="2"
                    src={item?.image}
                    width={500}
                    height={500}
                    objectFit="cover"
                    alt=""
                  />
                </Box>
              )}
            </Stack>

            {item?.video && (
              <ReactPlayer
                playing={playing}
                width="100%"
                url={item?.video}
                controls={true}
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
              />
            )}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalShowProject;
