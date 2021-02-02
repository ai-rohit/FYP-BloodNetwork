import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import FindDonorScreen from '../screens/FindDonorScreen';
import BloodBanks from '../screens/BloodBanks';
import BecomeDonor from '../screens/BecomeDonor';

const Stack = createStackNavigator();

const HomeStack = ()=>(
    <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: true}}/>
        <Stack.Screen name="FindDonor" component={FindDonorScreen}/>
        <Stack.Screen name="BloodBank" component={BloodBanks}/>
        <Stack.Screen name="BecomeDonor" component={BecomeDonor}/>
    </Stack.Navigator>
);

export default HomeStack;