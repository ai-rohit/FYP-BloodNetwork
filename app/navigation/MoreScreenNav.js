import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MoreScreen from "../screens/MoreScreen";
//import FindDonorScreen from '../screens/FindDonorScreen';
import MyProfileScreen from "../screens/MyProfileScreen";
import colors from "../config/colors";
import CampaignScreen from "../screens/CampaignScreen";
import RequestStatus from "../screens/RequestStatus";

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
    <Stack.Screen
      name="Profile"
      component={MyProfileScreen}
      options={{ headerTitle: "Profile" }}
    />

    <Stack.Screen
      name="RequestStatus"
      component={RequestStatus}
      options={{ headerTitle: "Request Status" }}
    />
    {/* <Stack.Screen name="BecomeDonor" component={BecomeDonor} options={{headerTitle: "Become Donor"}}/> */}
  </Stack.Navigator>
);

export default MoreStack;
