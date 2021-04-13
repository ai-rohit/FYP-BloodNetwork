import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MyProfileScreen from "../screens/MyProfileScreen";
import EditUserScreen from "../screens/EditUserScreen";
import SettingScreen from "../screens/SettingScreen";
import colors from "../config/colors";
import { DefaultTheme } from "@react-navigation/native";

const Stack = createStackNavigator();

const ProfileStack = () => (
  <Stack.Navigator initialRouteName="Profile">
    <Stack.Screen
      name="Profile"
      component={MyProfileScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);
export default ProfileStack;
