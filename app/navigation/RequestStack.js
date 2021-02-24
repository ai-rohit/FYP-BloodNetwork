import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import FindDonorScreen from '../screens/FindDonorScreen';
import BloodBanks from '../screens/BloodBanks';
import BecomeDonor from '../screens/BecomeDonor';
import Requests from '../screens/Requests';
import RequestDetailScreen from '../screens/RequestDetailScreen';

const Stack = createStackNavigator();

const RequestStack = ()=>(
    <Stack.Navigator initialRouteName="Requests">
        <Stack.Screen name="Requests" component={Requests} options={{headerShown: true}}/>
        <Stack.Screen name="RequestDetail" component={RequestDetailScreen}/>
    </Stack.Navigator>
);

export default RequestStack;