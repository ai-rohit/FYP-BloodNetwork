import React from "react";
import { Text, View, StyleSheet } from "react-native";
import colors from "../config/colors";
import Constants from "expo-constants";
import { useNetInfo } from "@react-native-community/netinfo";
import { AntDesign } from "@expo/vector-icons";

function OfflineNotice(props) {
  const netInfo = useNetInfo();
  if (netInfo.type !== "unknown" && netInfo.isInternetReachable === false)
    return (
      <View style={styles.container}>
        <AntDesign name="warning" color="#ffffff" size={20} />
        <Text style={styles.text}>{"  "}No Internet Connection</Text>
      </View>
    );
  return null;
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    height: 50,
    position: "absolute",
    width: "100%",
    top: Constants.statusBarHeight,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  text: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
export default OfflineNotice;
