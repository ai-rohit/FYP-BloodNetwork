import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import FindDonorScreen from '../screens/FindDonorScreen';
import BloodBanks from '../screens/BloodBanks';
import BecomeDonor from '../screens/BecomeDonor';
import Requests from '../screens/Requests';
import RequestDetailScreen from '../screens/RequestDetailScreen';
import colors from '../config/colors';

const Stack = createStackNavigator();

const RequestStack = ()=>(
    <Stack.Navigator initialRouteName="Requests" screenOptions={{headerTitleStyle:{color: colors.white, fontWeight: "800", fontSize: 20}, headerTintColor: colors.white}}>
        <Stack.Screen name="Requests" component={Requests} options={{headerShown: true, headerTitle: "Blood Requests"}}/>
        <Stack.Screen name="RequestDetail" component={RequestDetailScreen} options={{headerTitle: "Request Detail", headerStyle:{backgroundColor: colors.blood, opacity: 0.8, elevation:0, shadowOpacity:0}}}/>
    </Stack.Navigator>
);

export default RequestStack;