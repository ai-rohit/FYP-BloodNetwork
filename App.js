import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Platform, LogBox } from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import Constants from 'expo-constants';

import AuthNav from "./app/navigation/AuthNav";
import AppNavigator from './app/navigation/AppNavigator';
import AuthContext from './app/auth/context';


export default function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
}, [])
  return (
      <AuthContext.Provider value={{user, setUser}}>
         <NavigationContainer>
          
          {user? <AppNavigator/> : <AuthNav/>}
          
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
