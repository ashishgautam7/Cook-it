import { View, Text, Button, TextInput, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { authr } from "../components/firebase";
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import ScreenHeader from "../components/header";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Category from "../components/category";
import axios from "axios";

export default function Home() {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [activeCategory, setActiveCategory] = useState('Starter')
  const [categories, setCategories] = useState([]);

useEffect (()=>{
getCategories()
},[])
  const signout = () => {
    signOut(authr).then(() => {
      setUser(false);
      console.log("Signed out");
      navigation.navigate("Login");
    });
  };
  const handelSearch = () => {
    console.log("Pressed search");
  };


const getCategories = async ()=>{
  try {
    const responce = await axios.get('http://themealdb.com/api/json/v1/1/categories.php')
    // console.log("here   ",responce.data);
    if(responce&&responce.data){
      setCategories(responce.data.categories)
      // console.log('hehe  ',categories);
    }
  } catch (error) {
    console.log("Error while featching categories",  error);
  }
}
  return (
    <View
      style={{ backgroundColor: "#FBF6EE", height: hp(100), padding: hp(2) }}
    >
      {/*Header */}
     <ScreenHeader/>
      {/*  Search bar */}
      <View
        style={{
          marginTop: hp(4),
          marginBottom:hp(5),
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#FFFFFF",
          borderRadius: hp(3),
        }}
      >
        <TextInput
          placeholder="Search for Recipe"
          style={{ flex: 1, padding: 10, paddingHorizontal: 10, height: hp(5)}}
        ></TextInput>
        <Pressable onPress={handelSearch} style={{padding:10}}>
          <MaterialCommunityIcons name="magnify" size={24} color="black" />
        </Pressable>
      </View>
      <Category categories={categories} activeCategory = {activeCategory} setActiveCategory={setActiveCategory}/>

    </View>
  );
}
