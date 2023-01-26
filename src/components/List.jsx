import {
  ListItem,
  OrderedList,
  Image,
  Box,
  GridItem,
  Grid,
  Tooltip,
} from "@chakra-ui/react";
import country from "data/country";
import noImage from "assets/images/no-image.png";
import {
  Algeria,
  Australia,
  Austria,
  Belgium,
  Bosnia_And_Herzegovina,
  brazil,
  Bulgaria,
  Canada,
  Chile,
  China,
  cyprus,
  Ecuador,
  Egypt,
  England,
  Finland,
  Germany,
  Greece,
  India,
  Indonesia,
  Iraq,
  Ireland,
  Israel,
  Italy,
  Japan,
  Jordan,
  Kenya,
  Lebanon,
  Malaysia,
  Morocco,
  Namibia,
  Nepal,
  Netherlands,
  Nigeria,
  North_Macedonia,
  Norway,
  Poland,
  Qatar,
  Romania,
  Rwanda,
  Saudi_Arabia,
  scotland,
  Sierraleone,
  Singapore,
  Slovakia,
  southKorea,
  South_Africa,
  Spain,
  Sri_Lanka,
  Syria,
  Türkiye,
  Uganda,
  United_Arab_Emirates,
  United_Kingdom,
  United_States,
  Zambia,
} from "data/image_videosExport";
import * as am5 from "@amcharts/amcharts5";

const ListTypes = ({ props }) => {
  //
  const flagList = [
    { id: "CA", name: "Canada", flagImage: Canada },
    { id: "DE", name: "Germany", flagImage: Germany },
    { id: "IN", name: "India", flagImage: India },
    { id: "IT", name: "Italy", flagImage: Italy },
    { id: "JP", name: "Japan", flagImage: Japan },
    { id: "SA", name: "Saudi Arabia", flagImage: Saudi_Arabia },
    { id: "TR", name: "Türkiye", flagImage: Türkiye },
    { id: "GB", name: "United Kingdom", flagImage: United_Kingdom },
    { id: "US", name: "United States", flagImage: United_States },
    { id: "DZ", name: "Algeria", flagImage: Algeria },
    { id: "AU", name: "Australia", flagImage: Australia },
    { id: "AT", name: "Austria", flagImage: Austria },
    { id: "CL", name: "Chile", flagImage: Chile },
    { id: "EC", name: "Ecuador", flagImage: Ecuador },
    { id: "FI", name: "Finland", flagImage: Finland },
    { id: "GR", name: "Greece", flagImage: Greece },
    { id: "ID", name: "Indonesia", flagImage: Indonesia },
    { id: "IQ", name: "Iraq", flagImage: Iraq },
    { id: "IE", name: "Ireland", flagImage: Ireland },
    { id: "IL", name: "Isreal", flagImage: Israel },
    { id: "JO", name: "Jordan", flagImage: Jordan },
    { id: "KE", name: "Kenya", flagImage: Kenya },
    { id: "MY", name: "Malaysia", flagImage: Malaysia },
    { id: "MA", name: "Morocco", flagImage: Morocco },
    { id: "NP", name: "Nepal", flagImage: Nepal },
    { id: "NG", name: "Nigeria", flagImage: Nigeria },
    { id: "NO", name: "Norway", flagImage: Norway },
    { id: "PL", name: "Poland", flagImage: Poland },
    { id: "QA", name: "Qatar", flagImage: Qatar },
    { id: "RO", name: "Romania", flagImage: Romania },
    { id: "RW", name: "rwanda", flagImage: Rwanda },
    { id: "ZA", name: "South Africa", flagImage: South_Africa },
    { id: "ES", name: "Spain", flagImage: Spain },
    { id: "LK", name: "Sri Lanka", flagImage: Sri_Lanka },
    { id: "AE", name: "United Arab Emirates", flagImage: United_Arab_Emirates },
    { id: "ZM", name: "Zambia", flagImage: Zambia },
    { id: "LB", name: "lebenon", flagImage: Lebanon },
    { id: "NL", name: "Netharlands", flagImage: Netherlands },
    { id: "MK", name: "macedonia", flagImage: North_Macedonia },
    { id: "SY", name: "Syria", flagImage: Syria },
    { id: "SK", name: "slovakia", flagImage: Slovakia },
    { id: "CN", name: "China", flagImage: China },
    { id: "EG", name: "Egypt", flagImage: Egypt },
    { id: "UG", name: "Uganda", flagImage: Uganda },
    { id: "SG", name: "Singapore", flagImage: Singapore },
    { id: "NA", name: "Nambia", flagImage: Namibia },
    { id: "SL", name: "Sieraleone", flagImage: Sierraleone },
    { id: "GB", name: "ENGLAND", flagImage: England },
    { id: "IT", name: "Rome", flagImage: Italy },
    { id: "EC", name: "Quito", flagImage: Ecuador },
    { id: "My", name: "Kuala Lumpur", flagImage: Malaysia },
    { id: "BE", name: "Belgium", flagImage: Belgium },
    { id: "BR", name: "Brazil", flagImage: brazil },
    { id: "CY", name: "Cyprus", flagImage: cyprus },
    { id: "ST", name: "Scotland", flagImage: scotland },
    { id: "KR", name: "South Korea", flagImage: southKorea },
    { id: "BG", name: "Bulgaria", flagImage: Bulgaria },
    {
      id: "BA",
      name: "Bosnia and Herzegovina",
      flagImage: Bosnia_And_Herzegovina,
    },
  ];

  Object.keys(country).map((item, index) => {
    return (
      <OrderedList key={index}>
        <ListItem>{{ item }}</ListItem>
      </OrderedList>
    );
  });

  const handleClickFlag = ({ id, name }) => {
    const dataItem = props.polygan.polygonSeries.getDataItemById(id);
    if (dataItem) {
      const target = dataItem.get("mapPolygon");
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
      setTimeout(() => {
        props.setActiveCountry(dataItem.dataContext.name);
      }, 2000);
    } else props.setActiveCountry(name);
  };
  return (
    <Grid templateColumns="repeat(3,minmax(0,1fr))" p={4} gap={4}>
      {Object.keys(country).map((item, index) => {
        const flagPath = flagList.find((flag) => flag.name === item);
        return (
          <GridItem key={index} colSpan={1}>
            <Box
              cursor="pointer"
              onClick={() =>
                handleClickFlag({ id: flagPath?.id, name: flagPath?.name })
              }
            >
              <Tooltip label={item}>
                <Image
                  width="100%"
                  height="100%"
                  objectFit="cover"
                  src={flagPath?.flagImage ?? noImage}
                  border="1px solid #ccc"
                  borderRadius="full"
                />
              </Tooltip>
            </Box>
          </GridItem>
        );
      })}
    </Grid>
  );
};
export default ListTypes;
