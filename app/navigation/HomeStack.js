import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import FindDonorScreen from "../screens/FindDonorScreen";
import BloodBanks from "../screens/BloodBanks";
import BecomeDonor from "../screens/BecomeDonor";
import colors from "../config/colors";

const Stack = createStackNavigator();

const HomeStack = () => (
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
      name="Home"
      component={HomeScreen}
      options={{ headerShown: true }}
    />
    <Stack.Screen name="FindDonor" component={FindDonorScreen} />
    <Stack.Screen
      name="BloodBank"
      component={BloodBanks}
      options={{ headerTitle: "Blood Banks" }}
    />
    <Stack.Screen
      name="BecomeDonor"
      component={BecomeDonor}
      options={{ headerTitle: "Become Donor" }}
    />
  </Stack.Navigator>
);

export default HomeStack;
