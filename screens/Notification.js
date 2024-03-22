import { View, Text, Image } from 'react-native'
import React from 'react'
import PushNoti from '../components/PushNoti'

export default function NotificationScreen() {
  return (
    <View style={{alignItems:"center",padding:100}}>
      <Text>Notification Screen</Text>
      <View>
      <PushNoti/>
      </View>
    </View>
  )
}