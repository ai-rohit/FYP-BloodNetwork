import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Platform, LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Constants from "expo-constants";
import jwtDecode from "jwt-decode";
import AppLoading from "expo-app-loading";
import Requests from "./app/screens/Requests";
import AuthNav from "./app/navigation/AuthNav";
import AppNavigator from "./app/navigation/AppNavigator";
import AuthContext from "./app/auth/context";
import MoreScreen from "./app/screens/MoreScreen";
import BloodBanks from "./app/screens/BloodBanks";
import { StatusBar } from "expo-status-bar";
import PaymentScreen from "./app/screens/PaymentScreen";
import { navigationRef } from "./app/navigation/rootNavigation";
import storage from "./app/auth/storage";

export default function App() {
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);

  // const restoreToken = async () => {
  //   const token = await storage.getToken();
  //   if (!token) return;
  //   setUser(jwtDecode(token));
  //   //console.log(user);
  // };

  // if (!isReady) {
  //   return (
  //     <AppLoading
  //       startAsync={restoreToken}
  //       onFinish={() => setIsReady(true)}
  //       onError={console.warn}
  //     />
  //   );
  // }
  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer ref={navigationRef}>
        <StatusBar style="dark" />
        {user ? <AppNavigator /> : <AuthNav />}
      </NavigationContainer>
    </AuthContext.Provider>
    // <PaymentScreen />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
  },
});
