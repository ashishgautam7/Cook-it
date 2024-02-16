import { View, Text, Image, ScrollView, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { color, fontSize } from "./colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Loader from "./loader";
import categoryData from "./mockData";
import { useNavigation } from "@react-navigation/native";

export default function Recepi({recipes, categories}) {
  

  return (
    <View style={{ marginTop: hp(0.1) }}>
      <ScrollView style={{ height: hp(60) }}>
        {recipes.length == 0 || categories.length == 0
          ? <Loader/>
          : recipes.map((item, index) => (
              <CardItem key={index} data={item}></CardItem>
            ))}
      </ScrollView>
    </View>
  );
}

const CardItem = ({ data }) => {
  function handelRecepiePress() {
    console.log("Recepie Pressed");
  }
  const navigation = useNavigation();
  return (
    <View>
      <Pressable
        style={{
          display: "flex",
          flexDirection: "row",
          margin: hp(1),
          backgroundColor: "#F9E8D9",
          padding: hp(1),
          borderRadius: hp(4),
          overflow: "hidden",
        }}
        onPress={()=>{
        navigation.navigate("RecepieDetail",{data:data})
        }}
      >
        <Image
          style={{ height: 100, width: 100, borderRadius: hp(100) }}
          source={{ uri: data.strMealThumb }}
        />
        <Text style={{ marginLeft: wp(5), marginTop: hp(4), fontSize: 15 }}>
          {data.strMeal}
        </Text>
      </Pressable>
    </View>
  );
};
