import { View, TextInput, Pressable, Switch, Alert, Text } from "react-native";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { authr } from "../components/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Auth } from "firebase/auth";

export default function SighUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cnfrmPassword, setCnfrmPassword] = useState("");
  const [showPas, setShowPass] = useState(true);
  // const [showPasText, setShowPassText] = useState("show password");
  const naviagtion = useNavigation();


  // Handel email address

  function handelEmailChage(text) {
    setEmail(text);
  }
  function handelPasswordChage(text) {
    setPassword(text);
  }
  function handelcnfrmPasswordChage(text) {
    setCnfrmPassword(text);
  }
  function handelBTLogin() {
    naviagtion.navigate("Login");
  }
  function handelShowPassword() {
    
      setShowPass(!showPas);
      // setShowPassText(showPas ? "Hide Password" : "Show Password");
    
  }
  function handelSignUp() {
    try {
      if(email==""||password==""||cnfrmPassword==""){
        Alert.alert("Fields can not be empty");
      }else{
        if (password == cnfrmPassword) {
          createUserWithEmailAndPassword(authr, email, password).then(() => {
            Alert.alert("Account Created Successfully");
          });
          
          setEmail("");
          setPassword("");
          setCnfrmPassword("");
        } else{
          alert("Your password does not match!");
        }
      }
      
      
    } catch (error) {
      alert(error)
    }
  
    
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
      <Text style={{ color: "#FFB534", padding: hp(2), fontSize: 50 }}>
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
        <View>
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
          secureTextEntry={showPas}
        />
        <TextInput
            style={{
              margin: hp(1),
              padding: hp(1),
              width: wp(70),
              backgroundColor: "#f7ede2",
            }}
            placeholder="Confirm Password"
            onChangeText={handelcnfrmPasswordChage}
            value={cnfrmPassword}
            secureTextEntry={showPas}
          />
          <Pressable onPress={handelShowPassword}>
          {(password !== "" || cnfrmPassword !== "") && (
            <Text style={{ fontSize: 10, paddingLeft: 10 }}>
              {showPas ? "Show Password" : "Hide Password"}
            </Text>
          )}
          </Pressable>
        </View>

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
          onPress={handelSignUp}
        >
          <Text style={{ color: "white", fontSize: 16 }}>Sign up</Text>
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
          onPress={handelBTLogin}
        >
          <Text style={{ color: "white", fontSize: 16 }}>Back to Login</Text>
        </Pressable>
      </View>
    </View>
  );
}
