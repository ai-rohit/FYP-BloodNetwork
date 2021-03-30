import React, { useEffect } from "react";
import { View, SafeAreaView } from "react-native";
import { WebView } from "react-native-webview";
const PaymentWeb = require("../components/index.html");
import * as ScreenOrientation from "expo-screen-orientation";

function PaymentScreen(props) {
  const { navigation } = props;

  useEffect(() => {
    navigation.addListener("focus", () => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
    });

    navigation.addListener("blur", () => {
      ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
    });
  }, [navigation]);

  return (
    <SafeAreaView
      style={{ flex: 1, height: "100%", backgroundColor: "purple" }}
    >
      <WebView
        originWhitelist={["*"]}
        source={PaymentWeb}
        style={{ flex: 1, width: "100%", borderRadius: 10, height: "100%" }}
      />
    </SafeAreaView>
  );
}

export default PaymentScreen;
