import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Constants from "expo-constants";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import RequestHistory from "./RequestHistory";
import RequestSent from "./RequestSent";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        labelStyle: { fontSize: 14, color: colors.white, fontWeight: "bold" },
        style: { backgroundColor: colors.blood },
        showIcon: true,
        indicatorStyle: {
          backgroundColor: colors.white,
          height: 5,
        },
      }}
    >
      <Tab.Screen name="Request History" component={RequestHistory} />
      <Tab.Screen name="Requests Sent" component={RequestSent} />
    </Tab.Navigator>
  );
}

function RequestStatus() {
  return <MyTabs />;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Constants.statusBarHeight,
  },
});

export default RequestStatus;
