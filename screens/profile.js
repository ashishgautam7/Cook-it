import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { color } from "../components/colors";
import { Entypo } from "@expo/vector-icons";
import ImagePicker from "react-native-image-picker";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { onAuthStateChanged } from "firebase/auth";
import { authr } from "../components/firebase";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Profile() {
  // const [selectImage, setSelectImage] = useState('../assets/user.png');
  // cosnt[userEmail, setUserEmail] = useState(null)
  const [email, setEmail] = useState(null);
  const navigation = useNavigation();
  // const pickImage = () => {
  //   let options = {
  //     storageOptions:{
  //       path:'image'
  //     }
  //   }
  //   launchImageLibrary(options,responce=>{
  //     console.log(responce);
  //   })
  // };
  const unSubcribe = onAuthStateChanged(authr, (user) => {
    if (user) {
      setEmail(user.email);
    } else {
      alert("Not Loged in");
    }
  });

  return (
    <View style={{ backgroundColor: color.backgroundColor, height: hp(100) }}>
      {/* Profile  Picture */}
      <TouchableOpacity style={{marginTop:hp(1)}} onPress={()=>{
        navigation.navigate('Home')
      }}>
        <Ionicons
          name="arrow-back-outline"
          size={24}
          color="#EC8F5E"
          style={{ margin: hp(1), marginTop: hp(2) }}
        />
      </TouchableOpacity>

      <View
        style={{
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          marginTop: hp(15),
          backgroundColor: color.backgroundColor,
          flexDirection: "row",
        }}
      >
        {/* {selectImage && ( */}
        <Image
          style={{
            height: hp(30),
            width: hp(30),
            borderRadius: hp(50),
            backgroundColor: "white",
          }}
          source={require("../assets/user.png")}
        />
        {/* )} */}

        <TouchableOpacity
          style={{ marginTop: hp(20), right: hp(5) }}
          onPress={() => {
            console.log(presswd);
          }}
        >
          <Entypo name="camera" size={24} color="#EC8F5E" />
        </TouchableOpacity>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          margin: hp(2),
        }}
      >
        <Text>{email}</Text>
      </View>
    </View>
  );
}
