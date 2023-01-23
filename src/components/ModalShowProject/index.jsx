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
  Grid,
  GridItem,
  Image,
} from "@chakra-ui/react";
import country from "data/country";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import ReactPlayer from "react-player/lazy";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ModalShowProject = ({ onClose, isOpen, activeCountry }) => {
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
    <Modal
      size="5xl"
      autoFocus={false}
      isCentered
      onClose={onClose}
      isOpen={isOpen}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{countryName ?? activeCountry}</ModalHeader>
        <ModalCloseButton />
        <ModalBody px={0}>
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={50}
            slidesPerView={1}
            onSlideChange={(swiper) => {
              setActiveIndex(swiper.activeIndex);
              setPlaying(false);
            }}
            onSwiper={(swiper) => setActiveIndex(swiper.activeIndex)}
          >
            {countryProject?.map((item, i) => {
              return (
                <SwiperSlide key={i}>
                  <Box
                    px="45px"
                    mb="50px"
                    h="60vh"
                    flex="unset"
                    overflow="auto"
                  >
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
                        <GridItem
                          colSpan={item?.image ? { base: 19, lg: 10 } : 19}
                        >
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
                            //
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
                          playing={i === activeIndex && playing}
                          width="100%"
                          url={item?.video}
                          controls={true}
                          onPlay={() => setPlaying(true)}
                          onPause={() => setPlaying(false)}
                        />
                      </Box>
                    )}
                  </Box>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalShowProject;
