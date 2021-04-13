import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MoreScreen from "../screens/MoreScreen";
//import FindDonorScreen from '../screens/FindDonorScreen';
import MyProfileScreen from "../screens/MyProfileScreen";
import colors from "../config/colors";
import CampaignScreen from "../screens/CampaignScreen";
import RequestStatus from "../screens/RequestStatus";
import PaymentScreen from "../screens/PaymentScreen";
import ProfileStack from "./ProfileNav";
import EditUserScreen from "../screens/EditUserScreen";
import SettingScreen from "../screens/SettingScreen";
import ChangePasswordScreen from "../screens/ChangePasswordScreen";

const Stack = createStackNavigator();

const MoreStack = () => (
  <Stack.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerStyle: { backgroundColor: "#f7f7f7" },
      headerTitleStyle: {
        color: colors.blood,
        fontSize: 24,
        fontWeight: "800",
      },
      headerTintColor: colors.blood,
    }}
  >
    <Stack.Screen
      name="More"
      component={MoreScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="Campaigns" component={CampaignScreen} />
    <Stack.Screen name="Profile" component={ProfileStack} />

    <Stack.Screen
      name="RequestStatus"
      component={RequestStatus}
      options={{ headerTitle: "Request Status" }}
    />
    <Stack.Screen
      name="Donation"
      component={PaymentScreen}
      options={{ headerTitle: "Make Donations" }}
    />

    <Stack.Screen name="Settings" component={SettingScreen} />
    <Stack.Screen
      name="EditUser"
      component={EditUserScreen}
      options={{ headerShown: true }}
    />
    <Stack.Screen
      name="ChangePassword"
      component={ChangePasswordScreen}
      options={{ headerShown: true }}
    />
  </Stack.Navigator>
);

export default MoreStack;
