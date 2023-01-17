import React, { useLayoutEffect, useMemo, useState } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import ModalShowProject from "components/ModalShowProject";
import DrawerExamp from "components/darwer";

import { Box } from "@chakra-ui/react";
import country from "data/country";
import cities from "data/cities";
import bgimages from "assets/images/bgimages.jpg";
import HotProjects from "components/HotProjects";
import Layout1 from "components/Layout1";
import BoxTest from "components/BoxTest";
import { ProSidebarProvider } from "react-pro-sidebar";
import logo from "assets/images/logo.png";

const HomePage = () => {
  const [activeCountry, setActiveCountry] = useState(null);
  const [polygan, setPolygan] = useState(undefined);

  // This code will only run one time
  useLayoutEffect(() => {
    // Create root element
    const root = am5.Root.new("chartdiv");
    // Set themes
    root.setThemes([am5themes_Animated.new(root)]);
    // Create the map chart
    const chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: "rotateX",
        panY: "rotateY",
        projection: am5map.geoOrthographic(),
      })
    );

    var backgroundSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {})
    );
    backgroundSeries.mapPolygons.template.setAll({
      // colorofbackgroundofglobe
      fill: am5.color(0x35afc0),
      stroke: am5.color(0x081012),

      strokeOpacity: 0,
    });
    backgroundSeries.data.push({
      geometry: am5map.getGeoRectangle(90, 180, -90, -180),
    });
    // Create main polygon series for countries
    const polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
        exclude: ["AQ"],
      })
    );

    polygonSeries.mapPolygons.template.setAll({
      tooltipText: "{name}",
      toggleKey: "active",
      interactive: true,
      templateField: "polygonSettings",
      //country without projects
      fill: am5.color(0xa6d941),
      //stroke: am5.color(0x081012),
    });

    polygonSeries.mapPolygons.template.states.create("hover", {
      fill: am5.color(0xb67edf),
    });

    setPolygan({ chart, polygonSeries });

    polygonSeries.mapPolygons.template.on("active", function (_, target) {
      setTimeout(() => {
        setActiveCountry(target.dataItem.dataContext.name);
      }, 1000);
      //zoom function
      polygonSeries.zoomToDataItem(target.dataItem);
      homeButton.show();
    });

    polygonSeries.data.setAll(
      am5geodata_worldLow?.features
        ?.filter((item) => {
          return Object.keys(country).some(
            (c) =>
              c.toLocaleLowerCase() === item.properties.name.toLocaleLowerCase()
          );
        })
        .map((item) => ({
          id: item?.id,
          polygonSettings: {
            //countrywithproject
            fill: am5.color(0xf9c350),
          },
        }))
    );

    const pointSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));

    pointSeries.bullets.push(function () {
      // container bullet
      const container = am5.Container.new(root, {});
      // red bullet
      container.children.push(
        am5.Circle.new(root, {
          radius: 4,
          tooltipY: 0,
          fill: am5.color(0xe03c31),
          strokeOpacity: 0.3,
        })
      );
      // pulse bullet
      const circle = container.children.push(
        am5.Circle.new(root, {
          radius: 2,
          tooltipY: 0,
          fill: am5.color(0xdc9f00),
          strokeOpacity: 0,
        })
      );
      circle.animate({
        key: "scale",
        from: 1,
        to: 5,
        duration: 600,
        easing: am5.ease.out(am5.ease.cubic),
        loops: Infinity,
      });
      circle.animate({
        key: "opacity",
        from: 1,
        to: 0,
        duration: 600,
        easing: am5.ease.out(am5.ease.cubic),
        loops: Infinity,
      });

      return am5.Bullet.new(root, {
        sprite: container,
      });
    });

    cities.forEach((city) => {
      pointSeries.data.push({
        geometry: {
          type: "Point",
          coordinates: [city.longitude, city.latitude],
        },
        title: city.title,
      });
    });

    chart.set(
      "zoomControl",
      am5map.ZoomControl.new(root, function (root) {})
    );
    chart.animate({
      key: "rotationX",
      from: 0,
      to: 360,
      duration: 30000,
      loops: Infinity,
    });
    const homeButton = chart.children.push(
      am5.Button.new(root, {
        paddingTop: 10,
        paddingBottom: 10,
        x: am5.percent(100),
        centerX: am5.percent(100),
        opacity: 0,
        interactiveChildren: false,
        icon: am5.Graphics.new(root, {
          svgPath:
            "M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8",
          fill: am5.color(0xffffff),
        }),
      })
    );

    homeButton.events.on("click", function () {
      chart.goHome();
      homeButton.hide();
      chart.animate({
        key: "rotationX",
        from: 0,
        to: 360,
        duration: 30000,
        loops: Infinity,
      });
    });

    root._logo.dispose();

    return () => {
      root.dispose();
    };
  }, []);
  //
  const isOpen = useMemo(() => !!activeCountry, [activeCountry]);

  // return
  return (
    <>
      <HotProjects polygan={polygan} setActiveCountry={setActiveCountry} />
      <ModalShowProject
        activeCountry={activeCountry}
        isOpen={isOpen}
        onClose={() => setActiveCountry(null)}
      />
      <Box
        id="chartdiv"
        sx={{
          width: "100vw",
          height: "100vh",
          backgroundImage: bgimages,
          bgPosition: "center",
          bgSize: "cover",
        }}
        //  bg: "#badcd7" ,backgroundImage:bgimages
      >
        <Box
          as="img"
          sx={{
            position: "fixed",
            left: "10px",
            top: "10px",
            zIndex: 9,
            w: "15%",
          }}
          src={logo}
          alt=""
        />

        <ProSidebarProvider>
          <Layout1 />
        </ProSidebarProvider>
      </Box>
    </>
  );
};

export default HomePage;
