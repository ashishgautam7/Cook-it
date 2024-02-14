import { View, Text, Image, Animated, Easing, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { onAuthStateChanged } from "firebase/auth";
import { authr } from "../components/firebase";
import { async } from "@firebase/util";
import AsyncStorage from "@react-native-async-storage/async-storage";

var loginValue = false
 function Welcome() {
  const [paddingAnimation] = useState(new Animated.Value(30)); // Initial padding value
  const[authuser, setAuthUser] = useState(null)

  const navigation = useNavigation();
  useEffect(() => {
    const loopRoundIN = Animated.timing(paddingAnimation, {
      toValue: 50,
      duration: 400,
      useNativeDriver: false,
      easing: Easing.ease,
    });
    loopRoundIN.start()
    // timeOut to move to diffrent screen
    const navTimeOut = setTimeout(() => {
      loopRoundIN.stop();
      navigation.navigate("Login");
    }, 2000);
    const listning =  onAuthStateChanged(authr,(user)=>{

      if (user) {
        setAuthUser(user)
        setTimeout(()=>{
          navigation.navigate("Home")
        },2000)
          
      } else {
        setAuthUser(null)
        setTimeout(()=>{
          navigation.navigate("Login")
        },1000)
      }
    })


    return () => {
      loopRoundIN.stop()
      clearTimeout(navTimeOut);
    };
  }, [navigation, paddingAnimation, authuser]);

  // const saveState = async()=>{
  //   try {
  //     await AsyncStorage.setItem("state",loginValue)
  //   } catch (error) {
  //     console.log("state not saved " + error );
  //   }
  // }
  // const getState = async()=>{
  //   try {
  //     await AsyncStorage.getItem("state")
  //   } catch (error) {
  //     console.log("state not retreved " + error );
  //   }
  // }

  return (
    <View
      style={{
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 0,
        backgroundColor: "#FF9800",
      }}
    >
      <Animated.View
        style={{
          borderRadius: hp(2000),
          backgroundColor: "#ffb700",
          padding: paddingAnimation,
          margin:20
        }}
      >
        <View
          style={{ borderRadius: hp(2000), backgroundColor: "#ffd900", padding: hp(2) }}
        >
          <Image
            source={require("../assets/welcome.png")}
            style={{ height: hp(20), width: hp(20) }}
          ></Image>
        </View>
      </Animated.View>
      <View
        style={{
          bottom: 70,
          padding: 30,
          alignItems: "center",
          position: "absolute",
        }}
      >
        <Text style={{ fontSize: hp(6), padding: hp(3), color: "white" }}>
          Cook It
        </Text>
        <Text style={{ color: "white" }}>Food is here where are you</Text>
      </View>
    </View>
  );
}
export {Welcome,loginValue}