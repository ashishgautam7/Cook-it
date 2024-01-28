import { View, Text, TextInput, Button, Pressable } from "react-native";
import React, { useEffect } from "react";
import auth from "@react-native-firebase/auth";
import { authr } from "../components/firebase";
import { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { loginValue } from "./Welcome";
// import { firebase } from "@react-native-firebase/auth";

export default function Loginogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPas, setShowPass] = useState(true);
  const naviagtion = useNavigation();

  useEffect(() => {
    // Clean up the listener when the component unmounts
  }, []);
  // Handel email address

  function handelEmailChage(text) {
    setEmail(text);
  }
  function handelPasswordChage(text) {
    setPassword(text);
  }

  function handellogin() {
    if (email != "" && password != "") {
      signInWithEmailAndPassword(authr, email, password)
        .then((userCredencial) => {
          naviagtion.navigate("Home");
          // console.log(userCredencial);
        })
        .catch((error) => {
          alert("Error: " + error);
        });
    } else {
      alert("Enter Email and  Password");
    }
  }
  function handelShowPasword() {
    setShowPass(!showPas);
  }

  function handelSignUp(text) {
    naviagtion.navigate("Signup");
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
          <Pressable onPress={handelShowPasword}>
            <Text style={{ fontSize: 10, paddingLeft: 10 }}>
              {showPas ? "Show Password" : "Hide Password"}
            </Text>
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
          onPress={handellogin}
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
          onPress={handelSignUp}
        >
          <Text style={{ color: "white", fontSize: 16 }}>Sign up</Text>
        </Pressable>
      </View>
    </View>
  );
}
