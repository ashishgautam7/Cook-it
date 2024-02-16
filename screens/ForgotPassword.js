import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { color, fontSize } from "../components/colors";
import { sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
import { authr } from "../components/firebase";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function ForgotPassword() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  function handelEmailChange(text) {
    setEmail(text);
    // console.log(email);
  }
  function handelSendButton() {
    try {
      if (emailRegex.test(email)) {
        sendPasswordResetEmail(authr, email).then(() => {
          Alert.alert(
            "email sent",
            "If you are registered a link to reset your password has been sent to your email.",
            [
              {
                text: "Done",
                onPress: () => navigation.navigate("Login"),
              },
            ]
          );
          setEmail("");
        });
      } else {
        Alert.alert(
          "Invalid Email",
          "Please enter correct email Format Example: something@somethig.com",
          [
            {
              text: "Okay",
              onPress: () => setEmail(""),
            },
          ]
        );
        setEmail("");
      }
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Invalid Format",
        "Please enter correct email Format Example: something@somethig.com",
        [
          {
            text: "Okay",
            onPress: () => setEmail(""),
          },
        ]
      );
    }
  }
  return (
    <View
      style={{
        paddingTop: hp(5),
        backgroundColor: color.backgroundColor,
        flex: 2,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Login");
        }}
      >
        <Ionicons
          name="arrow-back-outline"
          size={24}
          color="#EC8F5E"
          style={{ margin: hp(1), marginBottom: hp(10) }}
        />
      </TouchableOpacity>

      <View
        style={{ alignItems: "center", backgroundColor: color.backgroundColor }}
      >
        <View style={{ margin: hp(1) }}>
          <Image
            source={require("../assets/forgotPassword.jpeg")}
            style={{ height: hp(30), width: hp(40), borderRadius: hp(10) }}
          />
        </View>
        <Text style={{ fontSize: fontSize.textSize, margin: hp(1) }}>
          Enter email used for signup.
        </Text>
        <TextInput
          style={{
            padding: hp(1),
            width: wp(70),
            backgroundColor: "#f7ede2",
          }}
          onChangeText={handelEmailChange}
        ></TextInput>
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#FFB534",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: hp(3),
            width: hp(15),
            padding: hp(1),
            borderRadius: hp(2),
          }}
          onPress={handelSendButton}
        >
          <Text style={{ color: "white", fontSize: 16 }}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
