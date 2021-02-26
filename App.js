import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Platform, LogBox } from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import Constants from 'expo-constants';
import Requests from "./app/screens/Requests";
import AuthNav from "./app/navigation/AuthNav";
import AppNavigator from './app/navigation/AppNavigator';
import AuthContext from './app/auth/context';
import MoreScreen from './app/screens/MoreScreen';
import BloodBanks from './app/screens/BloodBanks';
import {StatusBar} from 'expo-status-bar';


export default function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
}, [])
  return (
      <AuthContext.Provider value={{user, setUser}}>
         <NavigationContainer>
          <StatusBar style="dark"/>
          {user? <AppNavigator/> : <AuthNav/>}
          {/* <Requests/> */}
          {/* <AppNavigator/> */}
          {/* <MoreScreen/> */}
          {/* <BloodBanks/> */}
        </NavigationContainer>
        
      </AuthContext.Provider>
 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
  },
});
