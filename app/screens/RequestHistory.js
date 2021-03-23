import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Constants from "expo-constants";

function RequestHistory() {
  return (
    <View style={styles.container}>
      <Text>RequestHistory</Text>
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

export default RequestHistory;
