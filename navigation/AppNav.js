import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import React from 'react'
import Welcome from '../screens/Welcome';
import Login from '../screens/Login';
import SighUp from '../screens/SighUp';

const Stack = createStackNavigator();

export default function AppNav() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome' screenOptions={{headerShown: false}}>
        <Stack.Screen name='Home' component={Home}/>
        <Stack.Screen name='Welcome' component={Welcome}/>
        <Stack.Screen name='Login' component={Login}/>
        <Stack.Screen name='Signup' component={SighUp}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}