import { StyleSheet, Text, View ,SafeAreaView,Alert,Pressable,Image, TextInput,ScrollView} from 'react-native'
import React, { useEffect,useState } from 'react'
import * as Location from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import Carousel from '../components/Carousel';
import Services from '../components/Services';
import DressItem from '../components/DressItem';
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from '../../ProductReducer';

const HomeScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  // // const [items,setItems] = useState([]);
  // // const total = cart.map((item) => item.quantity * item.price).reduce((curr,prev) => curr + prev,0);
  // // const navigation = useNavigation();
  // console.log(cart);
  const [displayCurrentAddress, setdisplayCurrentAddress] = useState(
    "we are loading your location"
  );
  const [locationServicesEnabled, setlocationServicesEnabled] = useState(false);
  useEffect(()=>{
    checkIfLocationEnabled();
    getCurrentLocation();
  },[])

  const checkIfLocationEnabled= async ()=>{
    let {enabled} = await Location.hasServicesEnabledAsync();

    if (!enabled) {
      Alert.alert(
        "Location services not enabled",
        "Please enable the location services",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ],
        { cancelable: false }
      );
    } else {
      setlocationServicesEnabled(enabled);
    }
}

const getCurrentLocation = async () => {
  let { status}  = await Location.requestForegroundPermissionsAsync();

  if (status !== "granted") {
    Alert.alert(
      "Permission denied",
      "allow the app to use the location services",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ],
      { cancelable: false }
    );
  }

  const  {coords } = await Location.getCurrentPositionAsync();
  //  console.log(coords)
  if (coords) {
    const { latitude, longitude } = coords;

    let response = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });

    // console.log(response)

    for (let item of response) {
      let address = `${item.name} ${item.city} ${item.postalCode}`;
      // console.log(item.name);
      setdisplayCurrentAddress(address);
    }
  }
};

const product = useSelector((state) => state.product.product);
  const dispatch = useDispatch();
  useEffect(() => {
    if (product.length > 0) return;

    const fetchProducts = async () => {
      services.map((service)=> dispatch(getProducts(service)) )
    };
    fetchProducts();
  }, []);
  // console.log(product);

const services = [
  {
    id: "0",
    image: "https://cdn-icons-png.flaticon.com/128/4643/4643574.png",
    name: "shirt",
    quantity: 0,
    price: 10,
  },
  {
    id: "11",
    image: "https://cdn-icons-png.flaticon.com/128/892/892458.png",
    name: "T-shirt",
    quantity: 0,
    price: 10,
  },
  {
    id: "12",
    image: "https://cdn-icons-png.flaticon.com/128/9609/9609161.png",
    name: "dresses",
    quantity: 0,
    price: 10,
  },
  {
    id: "13",
    image: "https://cdn-icons-png.flaticon.com/128/599/599388.png",
    name: "jeans",
    quantity: 0,
    price: 10,
  },
  {
    id: "14",
    image: "https://cdn-icons-png.flaticon.com/128/9431/9431166.png",
    name: "Sweater",
    quantity: 0,
    price: 10,
  },
  {
    id: "15",
    image: "https://cdn-icons-png.flaticon.com/128/3345/3345397.png",
    name: "shorts",
    quantity: 0,
    price: 10,
  },
  {
    id: "16",
    image: "https://cdn-icons-png.flaticon.com/128/293/293241.png",
    name: "Sleeveless",
    quantity: 0,
    price: 10,
  },
];
  return ( 
    <ScrollView style={{ paddingTop:30, backgroundColor:"#F0F0F0" }}>
    {/*  location view top home page */}
    <View style={{flexDirection:"row",alignItems:"center",padding:10}}>
    <MaterialIcons name="location-on" size={24} color="red"  />
    <View style={{marginLeft:3}}>
    <Text style={{fontSize:16,fontWeight:600}} >Home</Text>
    <Text>{displayCurrentAddress}</Text>
    </View>
      <Pressable style={{marginLeft:"auto"}}>
        <Image 
         style={{ width: 30, height: 30, borderRadius: 20 }}
         source={{uri : "https://yt3.ggpht.com/yti/AHyvSCDw8VLaSSFVqLauKn8lCY1X0gChaUHHHZwBiA=s88-c-k-c0x00ffffff-no-rj-mo"}} />
      </Pressable>
      </View>
      
      {/* search bar */}
      <View style={{padding:10, margin:5,borderRadius:10 ,flexDirection:"row",alignItems:"center",justifyContent:"space-between",borderWidth:0.8,borderColor:'grey'}} >
        <TextInput placeholder='Search for Item or More'/>
        <Feather name="search" size={24} color="black" />
      </View>

      {/* image Carousel */}
      <Carousel/>

       {/* Services Component */}
       <Services />

       {product.map((item,index)=>(
          <DressItem item={item} key={index} />
       ))}

    </ScrollView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})