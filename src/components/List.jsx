import {
    List,
    ListItem,
    ListIcon,
    OrderedList,
    UnorderedList,
  } from '@chakra-ui/react'
  import country from 'data/country';


  const Listtypess=()=>{

const test=Object.keys(country).map((item)=>item)

   
    Object.keys(country)
    .map((item)=>{
        return(
        <OrderedList>
            <ListItem>{{item}}</ListItem>
        </OrderedList>
        )
  })

  return(
    <UnorderedList>
        {Object.keys(country).map((item)=><ListItem>{item}</ListItem>)}
        
    </UnorderedList>
    )
    
}
export default Listtypess