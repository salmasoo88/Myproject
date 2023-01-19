import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
  Image,
  Box,
} from "@chakra-ui/react";
import country from "data/country";
import {
  Canada,
  France,
  Germany,
  India,
  Italy,
  Japan,
  Saudi_Arabia,
  Türkiye,
  United_Kingdom,
  United_States,
} from "data/image_videosExport";
import * as am5 from "@amcharts/amcharts5";

const Listtypess = ({ props }) => {
  const FlagList = [
    { id: "CA", name: "Canada", flagImage: Canada },
    // { name: "France", flagImage: France },
    { id: "DE", name: "Germany", flagImage: Germany },
    { id: "IN", name: "India", flagImage: India },
    { id: "IT", name: "Italy", flagImage: Italy },
    { id: "JP", name: "Japan", flagImage: Japan },
    { id: "SA", name: "Saudi Arabia", flagImage: Saudi_Arabia },
    { id: "TR", name: "Türkiye", flagImage: Türkiye },
    { id: "GB", name: "United Kingdom", flagImage: United_Kingdom },
    { id: "US", name: "United States", flagImage: United_States },
  ];

  Object.keys(country).map((item, index) => {
    return (
      <OrderedList key={index}>
        <ListItem>{{ item }}</ListItem>
      </OrderedList>
    );
  });

  const handleClickFlag = (id) => {
    const dataItem = props.polygan.polygonSeries.getDataItemById(id);
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
      props.setActiveCountry(dataItem.dataContext.name);
    }, 2000);
  };
  return (
    <UnorderedList>
      {Object.keys(country).map((item, index) => {
        const flagPath = FlagList.find((flag) => flag.name === item);
        return (
          <Box
            key={index}
            sx={{ mb: 2 }}
            cursor="pointer"
            onClick={() => handleClickFlag(flagPath?.id)}
          >
            <Image width={8} height={8} src={flagPath?.flagImage ?? "#"} />
          </Box>
        );
      })}
    </UnorderedList>
  );
};
export default Listtypess;
