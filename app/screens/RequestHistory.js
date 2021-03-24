import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Constants from "expo-constants";
import baseUrl from "../config/baseUrl";
import ActivityIndicator from "../components/ActivityIndicator";

function RequestHistory(props) {
  const [requestHistory, setRequestHistory] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      fetch(`${baseUrl.url}/api/bloodRequest/history`, { method: "GET" })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.status === "success") {
            console.log(responseJson);
            setRequestHistory(responseJson.results);
            setLoading(false);
            //setLoading(false);
          } else {
            console.log(responseJson);
            alert(responseJson.status);
          }
        })
        .catch((error) => console.error(error));
    });
    return unsubscribe;
  }, [props.navigation]);

  if (loading === true) {
    return <ActivityIndicator />;
  } else {
    console.log("Details: ", requestHistory);
    return (
      <FlatList
        data={requestHistory}
        keyExtractor={(item) => item.requestId.toString()}
        renderItem={({ item }) => {
          return (
            <View style={styles.container}>
              <Text>{item.requestId}</Text>
            </View>
          );
        }}
      />
    );
  }
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
