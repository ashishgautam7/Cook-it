import { View, Text, Image, Animated, Easing, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default function Welcome() {
  const [paddingAnimation] = useState(new Animated.Value(30)); // Initial padding value
  const navigation = useNavigation();
  useEffect(() => {
    const loopRoundIN = Animated.timing(paddingAnimation, {
      toValue: 50,
      duration: 500,
      useNativeDriver: false,
      easing: Easing.ease,
    });
    // const loopRoundOut = Animated.timing(paddingAnimation, {
    //   toValue: 30,
    //   duration: 15,
    //   useNativeDriver: false,
    //   easing: Easing.ease,
    // });

    // const animationLoop = Animated.sequence([loopRoundIN, loopRoundOut]);
    // Animated.loop(animationLoop).start();
    loopRoundIN.start()
    // timeOut to move to diffrent screen
    const navTimeOut = setTimeout(() => {
      loopRoundIN.stop();
      navigation.navigate("Login");
    }, 2000);
    return () => {
      loopRoundIN.stop()
      clearTimeout(navTimeOut);
    };
  }, [navigation, paddingAnimation]);

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
