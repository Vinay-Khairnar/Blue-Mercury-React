import { Box,  Image, Text, Show, Hide, Price ,IconButton,Button,Icon, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, useDisclosure, Flex, Heading, Spacer, ButtonGroup, Popover, PopoverTrigger, Portal, PopoverContent, PopoverArrow, PopoverHeader, PopoverCloseButton, PopoverBody, PopoverFooter, Switch, Select} from '@chakra-ui/react';
import {  useEffect, useState } from 'react';
import { Carousel } from '@trendyol-js/react-carousel';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import React from 'react';
import { Grid, GridItem } from '@chakra-ui/react'
import { TbHeartPlus } from 'react-icons/tb';
import Filters from './Filters';
import { Divider } from '@chakra-ui/react'
import { Categories } from './Categories';
import { SortUpper } from './SortUpper';
import { NicheKa } from './NicheKa';
import axios from 'axios';
import {useNavigate, useSearchParams} from 'react-router-dom'




function getCurrentPage(value){
value=Number(value)
if(value<=0)value=1
if(!value) value=1
return value;
}




export const Products= () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
const [data ,setData] = React.useState([]);
const [display ,setDisplay] = React.useState(false);
const [SearchParams, setSearchParam] = useSearchParams();
const [Page, setPage] = useState(getCurrentPage(SearchParams.get('Page'))||1);
const [totalPages, setTotalPages] = useState();
const [Orderby, setOrderby] = useState(SearchParams.get("Orderby")||"");
const navigate=useNavigate()
const p1=`&_sort=ProductCard__Price&_order=${Orderby}`
React.useEffect(()=>{

axios.get(`http://localhost:8000/Products?_page=${Page}&_limit=12${Orderby && p1}` )

.then((res) =>{
    console.log(res);
    setData(res.data);
    setTotalPages(Math.ceil(res.headers["x-total-count"] / 12))
});
}, [Page,Orderby])

useEffect(()=>{
  let ParamObj={Page}

  if(Orderby)ParamObj.Orderby=Orderby

  setSearchParam(ParamObj)
},[Page,Orderby])

const arr=[];

for (let i = 0; i < totalPages; i++) arr[i] = i + 1;


return  <Flex mt="20">

  

  <Box w="500px" ml="8" >
    <Categories></Categories>
    <Divider></Divider>
 <Filters></Filters>
   </Box>


  <Box flexGrow="1" ml="10" mr="10">

  
   
  <Flex minWidth='max-content' alignItems='center' gap='2' mt="4">
  <Box p='2'>
    <Heading size='lg'  fontWeight={300} >SKIN CARE</Heading>
  </Box>
  <Spacer />

  <Heading  fontSize='sm' fontWeight={400}>SORT BY </Heading>
  
  <Box><Select onChange={(e)=> setOrderby(e.target.value)} value={Orderby} borderRadius="none"  w="56" placeholder='Select option'>
   <option value='asc'>Price low to high</option>
   <option value='desc'>Price high to low </option>
   <option value='option3'>Option 3</option>
 </Select></Box>

</Flex>
 <Divider mt="7" borderColor="gary.200" ></Divider>
 <NicheKa></NicheKa>
<Grid templateColumns={{base:'repeat(1, 1fr)',sm:'repeat(2, 1fr)',lg:'repeat(3, 1fr)',xl:'repeat(4, 1fr)'}} gap={0} mt="24" >
    
    {data.map(el=><GridItem onClick={()=>navigate(`/Products/${el.id}`)} key={el.Price} position="relative"  border="none" w="270px" mb="14" > <Text ml="-32" fontSize='sm' fontWeight="300" >{el.MerchBadge } </Text> <IconButton bg={0} icon={<TbHeartPlus fontSize={"25px"}/>} top={0} right="1" position="absolute"  ></IconButton><Image src={el.ProductCard__Image_src}  > 
  
    </Image>


    <Button  id={el.id}  borderRadius="none" border='transparent' bg='white' color="transparent"  _hover={{border:"1px solid black", color:"black"}} >Quick View</Button><Text>
      {el.ProductCard__Title}  </Text>
      <Text>${el.ProductCard__Price}</Text>
     

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight='bold' mb='1rem'>
              You can scroll the content behind the modal
            </Text>
            gdyddwe
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost'>Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>


         </GridItem>)


         
         }
     
</Grid>

{arr.map((el) => (
                    <Button mr="2"
                      colorScheme={"blue"} variant="outline"
                      onClick={() => setPage(el)}
                      disabled={Page === el}
                      key={el}
                    >
                      {el}
                    </Button>
                  ))}
</Box>
</Flex>
}
export default Products; 