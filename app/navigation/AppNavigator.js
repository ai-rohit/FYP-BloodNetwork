import React from 'react';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import colors from '../config/colors';
import {MaterialCommunityIcons, Fontisto, MaterialIcons} from "@expo/vector-icons";
import HomeScreen from '../screens/HomeScreen';
import Requests from '../screens/Requests';
import CampaignScreen from '../screens/CampaignScreen';
import BecomeDonor from '../screens/BecomeDonor';
import MyProfileScreen from '../screens/MyProfileScreen';
import HomeStack from './HomeStack';


const Tab = createBottomTabNavigator();
const AppNavigator = ()=> (
  <Tab.Navigator tabBarOptions={{
    activeBackgroundColor: "#f2f2f2",
    activeTintColor: colors.blood,
  }
    
  }>
    <Tab.Screen name="Home" component={HomeStack}
    options={{tabBarIcon: ()=> (<MaterialCommunityIcons name="home" size={35} color= {colors.blood}/>)}}/>
    <Tab.Screen name="Requests" component={Requests}
    options={{tabBarIcon: ({size, color})=> (<Fontisto name="blood" size={30} color= {colors.blood}/>)}}/>
    <Tab.Screen name="Campaign" component= {CampaignScreen}
    options={{tabBarIcon: ({size, color})=> (<MaterialIcons name="campaign" size={35} color= {colors.blood}/>)}}/>
    <Tab.Screen name="Become Donor" component= {BecomeDonor}
     options={{tabBarIcon: ({size, color})=> (<MaterialCommunityIcons name="hand-heart" size={30} color= {colors.blood}/>)}}/>
    <Tab.Screen name="Profile" component= {MyProfileScreen}
     options={{tabBarIcon: ({size, color})=> (<MaterialIcons name="person" size={35} color= {colors.blood}/>)}}/>

  </Tab.Navigator>
  
);

export default AppNavigator;