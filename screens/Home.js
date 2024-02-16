import { View, Text, Button, TextInput, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { authr } from "../components/firebase";
import { signOut } from "firebase/auth";
// import { signOut } from "../components/firebase";

import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import ScreenHeader from "../components/header";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Category from "../components/category";
import axios from "axios";
import { color,fontSize } from "../components/colors";
import Recepi from "../components/Recepi";

export default function Home() {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [activeCategory, setActiveCategory] = useState('Chicken')
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  const [search, setSearch] = useState("")
  

useEffect (()=>{
getCategories()
getRecipiesByCategories()
},[])

// useEffect (()=>{
//   setSearch("");
//   },[searchMeal])

const handelCategoryChange = category=> {
  getRecipiesByCategories(category)
  setActiveCategory(category)
  setMeals([])
}
function handelSearchTextChange(text) {
  setSearch(text)
  
}

  const signout = () => {
    signOut(authr).then(() => {
      setUser(false);
      console.log("Signed out");
      navigation.navigate("Login");
    });
  };
  const handelSearch = async () => {
    try {
      if (search!=""){
        navigation.navigate("Search",{data:search});
        setSearch("")
      }
      
    } catch (error) {
      alert(error)
    }
    
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
const getRecipiesByCategories = async (category="Chicken")=>{
  try {
    const responce = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    // console.log("Recepie   ",responce.data.meals);
    if (responce&&responce.data) {
      setMeals(responce.data.meals)
      // console.log("Recepie", recipes );
    }
   
  } catch (error) {
    console.log("Error while featching Recepies",  error);
  }
}
  return (
    <View
      style={{ backgroundColor: color.backgroundColor, height: hp(100), padding: hp(2) }}
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
          placeholder="Search by Recipe"
          style={{ flex: 1, padding: 10, paddingHorizontal: 10, height: hp(5)}}
          onChangeText={handelSearchTextChange}
          value={search}
        ></TextInput>
        <Pressable onPress={handelSearch} style={{padding:10}}>
          <MaterialCommunityIcons name="magnify" size={24} color="black" />
        </Pressable>
      </View>
      <Category categories={categories} activeCategory = {activeCategory} handelCategoryChange={handelCategoryChange}/>
      <Text
        style={{ color: color.HedingColor, fontSize: fontSize.headingSize, marginTop:hp(5) }}
      >
        Recepie
      </Text>
      <Text style={{margin:hp(2),color:'#F7B787'}}>{activeCategory}</Text>
      <Recepi recipes={meals} categories={categories}></Recepi>


    </View>
  );
}
