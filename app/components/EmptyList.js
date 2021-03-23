import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Constant from "expo-constants";
import LottieView from "lottie-react-native";
import colors from "../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function EmptyList() {
  return (
    <View style={styles.container}>
      <LottieView
        autoSize
        autoPlay
        loop
        source={require("../assets/noResults.json")}
      />
      <Text style={styles.texts}>No pending requests ...</Text>
      <View style={{ flexDirection: "row", marginTop: 20 }}>
        <MaterialCommunityIcons
          name="information-outline"
          size={30}
          color={colors.blood}
          style={{ marginRight: 5, alignSelf: "flex-start" }}
        />
        <Text style={{ color: "grey", fontSize: 18, padding: 5 }}>
          You can find all your accepted and rejected requests in incoming
          request history section of request status page!
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constant.statusBarHeight + 50,
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    height: "50%",
    alignSelf: "center",
  },
  texts: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.blood,
    marginTop: -30,
  },
});

export default EmptyList;
