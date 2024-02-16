import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { color } from "../components/colors";
import { Entypo } from "@expo/vector-icons";
import ImagePicker from "react-native-image-picker";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import {
  onAuthStateChanged,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authr } from "../components/firebase";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { async } from "@firebase/util";
import Toast from 'react-native-simple-toast';

export default function Profile() {
  const [email, setEmail] = useState("Guest");
  const [notification, setNotification] = useState(false);
  const navigation = useNavigation();
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    saveData();
  }, [notification]);
  const unSubcribe = onAuthStateChanged(authr, (user) => {
    if (user) {
      setEmail(user.email);
    } else {
      setEmail("Guest");
    }
  });
  const signout = () => {
    if (email != "Guest") {
      signOut(authr).then(() => {
        navigation.navigate("Login");
      });
      Toast.showWithGravity(
        'Logged out',
        Toast.SHORT,
        Toast.BOTTOM,
      );
    } else
      Alert.alert("Not Logged in", "You are not log in", [
        {
          text: "Login",
          onPress: () => navigation.navigate("Login"),
        },
        {
          text: "Cancle",
        },
      ]);
  };
  function handelNotification() {
    if (email!="Guest") {
      setNotification(!notification);
      Toast.showWithGravity(
        notification ? "Notification Truned off" : "Notification Turned On ",
        Toast.SHORT,
        Toast.BOTTOM
      )
    }else{
      Alert.alert("Not Logged in", "You are not log in", [
        {
          text: "Login",
          onPress: () => navigation.navigate("Login"),
        },
        {
          text: "Cancle",
        },
      ]);
    }
    
  }
  function handelPasswordChange() {
    try {
      if(email != 'Guest'){
        sendPasswordResetEmail(authr, email).then(() => {
          Alert.alert(
            "Password Reset",
            `Reset Password Link has been sent to your email address '${email}` +
              "'"
          );
        });
      }else{
        Alert.alert("Not Logged in", "You are not log in", [
          {
            text: "Login",
            onPress: () => navigation.navigate("Login"),
          },
          {
            text: "Cancle",
          },
        ]);
      }
      
    } catch (error) {
      alert(error);
    }
  }
  function handelFavorites(){
    if (email!="Guest") {
      navigation.navigate('Favorite')
    }
    else{
      Alert.alert("Not Logged in", "You are not log in", [
        {
          text: "Login",
          onPress: () => navigation.navigate("Login"),
        },
        {
          text: "Cancle",
        },
      ]);
    }
  }

  const saveData = async () => {
    try {
      await AsyncStorage.setItem("notification", JSON.stringify(notification));
    } catch (error) {
      console.log("value not saved: ", error);
    }
  };
  const getData = async () => {
    try {
      const noti = await AsyncStorage.getItem("notification");
      if (noti != null) {
        setNotification(JSON.parse(noti));
      }
    } catch (error) {
      console.log("value not recived");
    }
  };

  return (
    <View style={{ backgroundColor: color.backgroundColor, height: hp(100) }}>
      {/* Profile  Picture */}
      <TouchableOpacity
        style={{ marginTop: hp(5) }}
        onPress={() => {
          navigation.navigate("Home");
        }}
      >
        <Ionicons
          name="arrow-back-outline"
          size={24}
          color="#EC8F5E"
          style={{ margin: hp(1), marginTop: hp(2) }}
        />
      </TouchableOpacity>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "#FFB534", padding: hp(2), fontSize: 50 }}>
          CookIT
        </Text>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          marginTop: hp(1),
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
            console.log("presswd");
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

      {/*****************Rest profile elements********************/}

      <View
        style={{
          backgroundColor: "white",
          borderRadius: hp(2),
          justifyContent: "space-around",
          // marginTop: hp(5),
          top: hp(10),
          paddingBottom: hp(5),
          // paddingTop:hp(5)
        }}
      >
        <TouchableOpacity
          onPress={handelPasswordChange}
          style={{ padding: hp(2), flexDirection: "row" }}
        >
          <MaterialIcons name="password" size={24} color="black" />
          <Text style={{ marginLeft: hp(6), marginTop: hp(0.5) }}>
            Change Password
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            handelNotification();
          }}
          style={{ padding: hp(2), flexDirection: "row" }}
        >
          {notification ? (
            <Ionicons name="notifications" size={24} color="black" />
          ) : (
            <Ionicons name="notifications-off" size={24} color="black" />
          )}

          <Text style={{ marginLeft: hp(6), marginTop: hp(0.5) }}>
            Notification
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handelFavorites}
          style={{ padding: hp(2), flexDirection: "row" }}
        >
          <MaterialIcons name="favorite" size={24} color="black" />
          <Text style={{ marginLeft: hp(6), marginTop: hp(0.5) }}>
            Favorites
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={signout}
          style={{ padding: hp(2), flexDirection: "row" }}
        >
          <MaterialIcons name="logout" size={24} color="black" />
          <Text style={{ marginLeft: hp(6), marginTop: hp(0.5) }}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
