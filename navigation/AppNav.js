import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import React from 'react'
import {Welcome} from '../screens/Welcome';
import Login from '../screens/Login';
import SighUp from '../screens/SighUp';
import RecepieDetail from '../screens/RecepieDetail';
import Profile from '../screens/profile';
import Search from '../screens/Search';
import Favorite from '../screens/Favorite';
import ForgotPassword from '../screens/ForgotPassword';

const Stack = createStackNavigator();

export default function AppNav() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome' screenOptions={{headerShown: false}}>
        <Stack.Screen name='Home' component={Home}/>
        <Stack.Screen name='Welcome' component={Welcome}/>
        <Stack.Screen name='Login' component={Login}/>
        <Stack.Screen name='Signup' component={SighUp}/>
        <Stack.Screen name='RecepieDetail' component={RecepieDetail}/>
        <Stack.Screen name='Profile' component={Profile}/>
        <Stack.Screen name='Search' component={Search}/>
        <Stack.Screen name='Favorite' component={Favorite}/>
        <Stack.Screen name='ForgotPassword' component={ForgotPassword}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}