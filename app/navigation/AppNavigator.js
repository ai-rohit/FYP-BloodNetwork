import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import colors from "../config/colors";
import { MaterialCommunityIcons, Fontisto, Feather } from "@expo/vector-icons";

import BecomeDonor from "../screens/BecomeDonor";
import HomeStack from "./HomeStack";
import { createStackNavigator } from "@react-navigation/stack";
import MoreStack from "./MoreScreenNav";
import RequestStack from "./RequestStack";

const Stack = createStackNavigator();

const BecomingDonor = () => (
  <Stack.Navigator>
    <Stack.Screen name="Become Donor" component={BecomeDonor} />
  </Stack.Navigator>
);

const Tab = createBottomTabNavigator();
const AppNavigator = () => (
  <Tab.Navigator
    tabBarOptions={{
      activeBackgroundColor: "#f2f2f2",
      activeTintColor: colors.blood,
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeStack}
      options={{
        tabBarIcon: () => (
          <MaterialCommunityIcons name="home" size={35} color={colors.blood} />
        ),
      }}
    />
    <Tab.Screen
      name="Requests"
      component={RequestStack}
      options={{
        tabBarIcon: ({ size, color }) => (
          <Fontisto name="blood" size={30} color={colors.blood} />
        ),
      }}
    />
    <Tab.Screen
      name="Become Donor"
      component={BecomingDonor}
      options={{
        tabBarIcon: ({ size, color }) => (
          <MaterialCommunityIcons
            name="hand-heart"
            size={30}
            color={colors.blood}
          />
        ),
      }}
    />
    <Tab.Screen
      name="More"
      component={MoreStack}
      options={{
        tabBarIcon: ({ size, color }) => (
          <Feather name="more-horizontal" size={35} color={colors.blood} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default AppNavigator;
