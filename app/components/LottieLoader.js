import React from 'react';
import LottieView from "lottie-react-native";

function LottieLoader({visible}){
    if(visible){
        return <LottieView
            autoPlay
            loop
            source={require("../assets/loader.json")}
        />
    }

}

export default LottieLoader;