import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { color, fontSize } from "../components/colors";
import { Ionicons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/loader";
import { Entypo } from '@expo/vector-icons';
import Recepi from "../components/Recepi";

export default function Search({ route }) {
  const item = route.params.data;
  const navigation = useNavigation();
  const [searchMeal, setSearchMeal] = useState([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    if (item) {
      getRecipe(item);
    }else{
      alert("No data found")
      
    }
  }, [item]);

  async function getRecipe(name) {
    const responce = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${item}`
    );
    if (responce && responce.data) {
      setSearchMeal(responce.data.meals);
      console.log("Data: ",searchMeal);
      setLoading(false);
    } else {
    }
  }

  return (
    <View
      style={{
        backgroundColor: color.backgroundColor,
        flex: 1,
        padding: hp(2),
      }}
    >
      <TouchableOpacity
        style={{ marginTop: hp(4) }}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back-outline" size={24} color="#EC8F5E" />
      </TouchableOpacity>
      <Text
        style={{
          marginTop: hp(2),
          fontSize: fontSize.headingSize,
          color: color.HedingColor,
        }}
      >
        Search result for {item}:
      </Text>
      {
        loading?(
          <Loader></Loader>
        ):<View>
          {
            searchMeal?(<View>
              <Recepi recipes = {searchMeal} categories={searchMeal}></Recepi>
            </View>):<View style={{alignItems:'center',marginTop:hp(10)}}>
            <Entypo name="emoji-sad" size={hp(10)} color="gray" />
              <Text style={{fontSize:hp(10),color:"gray"}}>No recipes found.....!</Text>
             
              
            </View>

          }
        </View>
      }
    </View>
  );
}
