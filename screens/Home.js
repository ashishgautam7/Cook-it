import { View, Text, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { authr } from '../components/firebase'
import { signOut } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native'


export default function Home() {
  const navigation = useNavigation();
  const[user,setUser] = useState(null)
  const signout = ()=>{
    signOut(authr)
      .then(() => {
        setUser(false)
        console.log('Signed out')
        navigation.navigate('Login')
      })
  }
 
  return (
    <View style = {{}}>
      <View style={{}}>
        <Text>Cook It</Text>
     </View>
    </View>
  )
}