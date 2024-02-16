import { View, Text, Image } from 'react-native'
import React from 'react'

export default function NotificationScreen() {
  return (
    <View style={{alignItems:"center"}}>
      <Text>Notification Screen</Text>
      <Image source={require('../assets/forgotPassword.jpeg')}/>
    </View>
  )
}