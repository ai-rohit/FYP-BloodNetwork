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
    <Stack.Navigator initialRouteName="Requests">
        <Stack.Screen name="Requests" component={Requests} options={{headerShown: true, headerTitle: "Blood Requests", headerStyle:{backgroundColor: "#f2f2f2"}, headerTitleStyle:{color: colors.blood, fontWeight: "800", fontSize: 20}}}/>
        <Stack.Screen name="RequestDetail" component={RequestDetailScreen}/>
    </Stack.Navigator>
);

export default RequestStack;