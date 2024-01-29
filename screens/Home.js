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

export default function Home() {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
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
      <Category/>

    </View>
  );
}
