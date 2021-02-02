import React from 'react';
import {createStackNavigator} from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import AppNavigator from './AppNavigator';

const Stack = createStackNavigator();

const AuthNav = ()=>(
    <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
    </Stack.Navigator>
);

export default AuthNav