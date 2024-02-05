import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";

export default function Loader() {
return (
    <View style={{margin:hp(10)}}>
      <ActivityIndicator size={"large"}></ActivityIndicator>
    </View>
  )
}