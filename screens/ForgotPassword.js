import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { color, fontSize } from "../components/colors";
import { sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
import { authr } from "../components/firebase";
import { useNavigation } from "@react-navigation/native";

export default function ForgotPassword() {
    const navigation = useNavigation()
  const [email, setEmail] = useState("");

  function handelEmailChange(text) {
    setEmail(text);
    // console.log(email);
  }
  function handelSendButton() {
    sendPasswordResetEmail( authr,email).then(()=>{
       Alert.alert(
        "email sent",
        "If you are registered a link to reset your password has been sent to your email.",
        [{
            text:'Done',onPress:()=> navigation.navigate( 'Login')
        }]
        );
        setEmail('')
    })
  }
  return (
    <View
      style={{
        padding: hp(10),
        paddingTop: hp(10),
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <View style={{ margin: "auto" }}>
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
            marginLeft: 'auto',
            marginRight:'auto',
            marginTop:hp(3),
            width: hp(15),
            padding:hp(1),
            borderRadius:hp(2)
          }}
          onPress={handelSendButton}
        >
          <Text style={{ color: "white", fontSize: 16 }}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
