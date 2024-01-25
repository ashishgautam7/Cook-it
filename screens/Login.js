import { View, Text, TextInput, Button, Pressable } from "react-native";
import React from "react";
import auth from "@react-native-firebase/auth";
import { useState } from "react";
import {widthPercentageToDP as wp,heightPercentageToDP as hp} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";


export default function Loginogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cnfrmPassword, setCnfrmPassword] = useState("");
  const naviagtion = useNavigation()

  // Handel email address

  function handelEmailChage(text) {
    setEmail(text);
  }
  function handelPasswordChage(text) {
    setPassword(text);
  }
  
  function handellogin(text) {
    console.log("pressed");
    }
    function handelSignUp(text) {
      naviagtion.navigate("Signup")
      console.log("pressed");
      }
  return (
    <View
      style={{
        backgroundColor: "#FBF6EE",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{color:'#FFB534',padding:hp(2),fontSize:50}}>
        CookIT
      </Text>
      <View
        style={{
          backgroundColor: "white",
          padding: hp(1),
          borderRadius: 10,
          height: hp(50),
          width: wp(80),
        }}
      >
        <TextInput
          style={{
            margin: hp(1),
            padding: hp(1),
            width: wp(70),
            backgroundColor: "#f7ede2",
          }}
          placeholder="Enter email address"
          onChangeText={handelEmailChage}
          value={email}
        />
        <TextInput
          style={{
            margin: hp(1),
            padding: hp(1),
            width: wp(70),
            backgroundColor: "#f7ede2",
          }}
          placeholder="Enter Password"
          onChangeText={handelPasswordChage}
          value={password}
        />
        
        <Pressable
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: hp(1),
            marginTop: hp(2),
            marginLeft: "auto",
            marginRight: "auto",
            backgroundColor: "#FFB534",
            borderRadius: hp(2),
            width: hp(15),
          }}
          onPress = {handellogin}
        >
          <Text style={{ color: "white", fontSize: 16 }}>Login</Text>
        </Pressable>
        <Pressable
          style={{
            justifyContent: "center",
            alignItems: "center",
            padding: hp(1),
            marginTop: hp(2),
            marginLeft: "auto",
            marginRight: "auto",
            backgroundColor: "#FFB534",
            borderRadius: hp(2),
            width: hp(15),
          }}
          onPress = {handelSignUp}
        >
          <Text style={{ color: "white", fontSize: 16 }}>Sign up</Text>
        </Pressable>
      </View>
    </View>
  );
}
