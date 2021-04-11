import React, { useEffect } from "react";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import colors from "../config/colors";
import { MaterialCommunityIcons, Fontisto, Feather } from "@expo/vector-icons";

import BecomeDonor from "../screens/BecomeDonor";
import HomeStack from "./HomeStack";
import { createStackNavigator } from "@react-navigation/stack";
import MoreStack from "./MoreScreenNav";
import RequestStack from "./RequestStack";

import baseUrl from "../config/baseUrl";
import { Alert } from "react-native";
import navigation from "./rootNavigation";
import { useDeviceOrientation } from "@react-native-community/hooks";
import * as ScreenOrientation from "expo-screen-orientation";

const Stack = createStackNavigator();

const BecomingDonor = () => (
  <Stack.Navigator>
    <Stack.Screen name="Become Donor" component={BecomeDonor} />
  </Stack.Navigator>
);

const Tab = createBottomTabNavigator();
const AppNavigator = () => {
  useEffect(() => {
    registerPushNotification();

    Notifications.addNotificationResponseReceivedListener((response) => {
      console.log(response);
      navigation.navigate("Requests");
      //const url = response.notification.request.content.data.url;
    });
  }, []);

  const registerPushNotification = async () => {
    try {
      const permission = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (!permission.granted) return;

      const token = await Notifications.getExpoPushTokenAsync();
      fetch(`${baseUrl.url}/api/notifications/pushTokens`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token.data,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.status == "success") {
            return;
          } else {
            Alert.alert(responseJson.message);
          }
        })
        .catch((error) => alert(error.message));
    } catch (ex) {
      console.log(ex.message);
    }
  };

  const orientation = useDeviceOrientation();
  return (
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
            <MaterialCommunityIcons
              name="home"
              size={35}
              color={colors.blood}
              style={{ paddingRight: orientation.landscape === true ? 40 : 0 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Requests"
        component={RequestStack}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Fontisto
              name="blood"
              size={30}
              color={colors.blood}
              style={{ paddingRight: orientation.landscape === true ? 20 : 0 }}
            />
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
              style={{ paddingRight: orientation.landscape === true ? 40 : 0 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="More"
        component={MoreStack}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather
              name="more-horizontal"
              size={35}
              color={colors.blood}
              style={{ paddingRight: orientation.landscape === true ? 40 : 0 }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
