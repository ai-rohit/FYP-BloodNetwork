import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Constant from "expo-constants";
import LottieView from "lottie-react-native";
import colors from "../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function Progress({ progressMessage }) {
  return (
    <View style={styles.container}>
      <LottieView
        autoSize
        autoPlay
        loop
        source={require("../assets/progress.json")}
        style={{ width: "90%", marginBottom: -40 }}
      />
      <Text style={styles.texts}>{progressMessage}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constant.statusBarHeight + 150,
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    // height: "50%",
    alignSelf: "center",
  },
  texts: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.blood,
    marginTop: -40,
  },
});

export default Progress;
