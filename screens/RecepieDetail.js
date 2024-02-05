import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { color, fontSize } from "../components/colors";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import YoutubeIframe from "react-native-youtube-iframe";
import Loader from "../components/loader";




export default function RecepieDetail({ route }) {
  const item = route.params.data;
  const [meal, setMeal] = useState(null);
  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = useState(false);
  const[loading,setLoading] = useState(true)

  useEffect(() => {
    getMealData(item.idMeal);
    // getVideoID(meal?.strYoutube);
    // console.log(getIngridentIndex(meal));
  }, []);

  function getIngridentIndex(meal) {
    if (!meal) {
      return [];
    }
    let ingredients = [];
    for (let i = 1; i <= 20; i++) {
      if (meal["strIngredient" + i]) {
        ingredients.push(i);
      }
    }
    return ingredients;
  }

  const getYoutubeVideoId = url=>{

    const regex = /[?&]v=([^&]+)/;
    const match = url.match(regex);
    if (match && match[1]) {
      return match[1];
    }
    return null;
}
  async function getMealData(id) {
    try {
      const responce = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      )
      if (responce && responce.data) {
        setMeal(responce.data.meals[0]);
        setLoading(false)
        // getVideoID(meal.strYoutube)
        // console.log(responce.data.meals)
        // console.log( "Final data:  ",meal );
        // console.log(meal?.strYoutube);
      } else {
        console.log("No data");
      }
    } catch (error) {
      console.log("Error while getting Meal Data: ", error);
    }
  }

  //   console.log(item);
  return (
    <ScrollView style={{ backgroundColor: color.backgroundColor }}>
      {/*Image */}
      
    {
        loading ?(
            <Loader/>
        ):<View>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Image
          style={{
            height: hp(50),
            width: hp(50),
            borderBottomLeftRadius: hp(5),
            borderBottomRightRadius: hp(5),
          }}
          source={{ uri: meal?.strMealThumb }}
        />
      </View>

      <View
        style={{
          position: "absolute",
          margin: hp(1),
          marginTop: hp(3),
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{
            padding: hp(1),
            backgroundColor: color.backgroundColor,
            borderRadius: hp(20),
          }}
        >
          <Ionicons name="arrow-back-outline" size={24} color="#EC8F5E" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setIsFavorite(!isFavorite);
          }}
          style={{
            padding: hp(1),
            backgroundColor: color.backgroundColor,
            borderRadius: hp(10),
            left: hp(37),
          }}
        >
          <AntDesign
            name="heart"
            size={24}
            color={isFavorite ? "#EC8F5E" : "gray"}
          />
        </TouchableOpacity>
      </View>
      <View style={{ margin: hp(2) }}>
        <Text
          style={{ color: color.HedingColor, fontSize: fontSize.headingSize }}
        >
          {meal?.strMeal}
        </Text>
        <Text style={{ color: "gray", fontSize: fontSize.textSize }}>
          {meal?.strArea}
        </Text>
      </View>
      {/* Ingredents */}
      <Text
        style={{
          color: color.HedingColor,
          margin: hp(2),
          fontSize: fontSize.headingSize,
        }}
      >
        Ingredients
      </Text>
      <View>
        {getIngridentIndex(meal).map((i) => {
          return (
            <View key={i} style={{ flexDirection: "row" }}>
              <View
                style={{
                  height: hp(1.5),
                  width: hp(1.5),
                  margin: hp(0.5),
                  backgroundColor: "#FFCF81",
                  borderRadius: hp(10),
                }}
              ></View>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ color: "gray", fontWeight: "bold" }}>
                  {meal["strMeasure" + i]}
                </Text>
                <Text style={{ marginLeft: hp(1) }}>
                  {meal["strIngredient" + i]}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
      {/* Instructions */}
      <View style={{ margin: hp(2), marginTop: hp(3) }}>
        <Text
          style={{ color: color.HedingColor, fontSize: fontSize.headingSize }}
        >
          Instructions
        </Text>
        <Text>{meal?.strInstructions}</Text>
      </View>
      {/* Video for  the meal */}
      <View>
        <YoutubeIframe height={hp(30)} videoId={getYoutubeVideoId(meal?.strYoutube)}></YoutubeIframe>
      </View>
        </View>
    }
      
    </ScrollView>
  );
}
