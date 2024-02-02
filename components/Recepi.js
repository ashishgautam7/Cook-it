import { View, Text } from 'react-native'
import React from 'react'
import { color,fontSize } from './colors'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";

export default function Recepi() {
  return (
    <View style={{marginTop: hp(5)}}> 
      <Text style={{color:color.HedingColor, fontSize:fontSize.headingSize }} >Recepie</Text>
      <View>
        
      </View>
    </View>
  )
}