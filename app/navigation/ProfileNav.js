import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MyProfileScreen from "../screens/MyProfileScreen";
//import EditPhotoScreen from "../screens/EditPhotoScreen";
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
    {/* <Stack.Screen
      name="EditPhoto"
      component={EditPhotoScreen}
      options={{ headerShown: false }}
    /> */}
  </Stack.Navigator>
);
export default ProfileStack;
