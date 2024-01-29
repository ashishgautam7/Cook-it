import { View, Text, Button, TextInput, Pressable } from "react-native";
import React from 'react'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";
  import { Entypo } from "@expo/vector-icons";
  import { FontAwesome6 } from "@expo/vector-icons";
  

export default function ScreenHeader() {
  return (
    <View
    style={{
      marginTop: hp(3),
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    }}
  > 
    
    <Pressable onPress={() => console.log("pressed user")}>
    <Entypo name="user" size={24} color="gray" />
    </Pressable>
    
    <Text style={{ fontSize: hp(2), color: "#FFB534" }}>
      Cook everything food at Home
    </Text>
    <Pressable onPress={() => console.log("pressed bell")}>
    <FontAwesome6 name="bell-concierge" size={24} color="gray" />
    </Pressable>
    
  </View>
  )
}