import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Constants from "expo-constants";

function RequestSent() {
  return (
    <View style={styles.container}>
      <Text>RequestSent</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Constants.statusBarHeight,
  },
});

export default RequestSent;
