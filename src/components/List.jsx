import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react";
import country from "data/country";

const Listtypess = () => {
  const test = Object.keys(country).map((item) => item);

  Object.keys(country).map((item, index) => {
    return (
      <OrderedList key={index}>
        <ListItem>{{ item }}</ListItem>
      </OrderedList>
    );
  });

  return (
    <UnorderedList>
      {Object.keys(country).map((item, i) => (
        <ListItem key={i}>{item}</ListItem>
      ))}
    </UnorderedList>
  );
};
export default Listtypess;
