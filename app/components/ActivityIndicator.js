import React from "react";
import {View, StyleSheet} from "react-native";
import LottieView from "lottie-react-native";

function ActivityIndicator(){
   
    return(
        <LottieView
            autoPlay
            loop
            source={require("../assets/loader.json")}
        />    
        )  
}

export default ActivityIndicator;