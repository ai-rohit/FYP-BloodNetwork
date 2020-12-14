import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import { StyleSheet, Text, View, Platform, LogBox } from 'react-native';
import {MaterialCommunityIcons, Fontisto, MaterialIcons} from "@expo/vector-icons";
import {createStackNavigator} from "@react-navigation/stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {NavigationContainer} from "@react-navigation/native";

import HomeScreen from './app/screens/HomeScreen';
import LoginScreen from './app/screens/LoginScreen';
import Constants from 'expo-constants';
import FindDonorScreen from './app/screens/FindDonorScreen';
import BecomeDonor from './app/screens/BecomeDonor';
import BloodBanks from './app/screens/BloodBanks';
import Requests from './app/screens/Requests';
import CampaignScreen from './app/screens/CampaignScreen';
import MyProfileScreen from './app/screens/MyProfileScreen';
import colors from './app/config/colors';


const Stack = createStackNavigator();
const StackNavigator = ()=>(
  <Stack.Navigator initialRouteName="Login">
    <Stack.Screen name="Home" component={TabNavigator}/>
    <Stack.Screen name="Login" component={LoginScreen}/>
    <Stack.Screen name="FindDonor" component={FindDonorScreen}/>
    <Stack.Screen name="BecomeDonor" component={BecomeDonor}/>
    <Stack.Screen name="BloodBank" component={BloodBanks}/>
  </Stack.Navigator>
)

const Tab = createBottomTabNavigator();
const TabNavigator = ()=> (
  <Tab.Navigator tabBarOptions={{
    activeBackgroundColor: "#f2f2f2",
    activeTintColor: colors.blood,
  }
    
  }>
    <Tab.Screen name="Home" component={HomeScreen}
    options={{tabBarIcon: ()=> (<MaterialCommunityIcons name="home" size={35} color= {colors.blood}/>)}}/>
    <Tab.Screen name="Request" component={Requests}
    options={{tabBarIcon: ({size, color})=> (<Fontisto name="blood" size={30} color= {colors.blood}/>)}}/>
    <Tab.Screen name="Campaign" component= {CampaignScreen}
    options={{tabBarIcon: ({size, color})=> (<MaterialIcons name="campaign" size={35} color= {colors.blood}/>)}}/>
    <Tab.Screen name="Become Donor" component= {BecomeDonor}
     options={{tabBarIcon: ({size, color})=> (<MaterialCommunityIcons name="hand-heart" size={30} color= {colors.blood}/>)}}/>
    <Tab.Screen name="Profile" component= {MyProfileScreen}
     options={{tabBarIcon: ({size, color})=> (<MaterialIcons name="person" size={35} color= {colors.blood}/>)}}/>

  </Tab.Navigator>
  
)

export default function App() {
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
}, [])
  return (
        <NavigationContainer>
          <StackNavigator/>
          {/* <TabNavigator/> */}
        </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
  },
});
