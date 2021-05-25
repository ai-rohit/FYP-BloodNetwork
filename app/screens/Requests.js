import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Alert } from "react-native";
import RequestComponent from "../components/RequestComponent";
import colors from "../config/colors";
import baseUrl from "../config/baseUrl";
import ActivityIndicator from "../components/ActivityIndicator";
import EmptyList from "../components/EmptyList";

function Requests(props) {
  const [request, setRequest] = useState();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      fetch(`${baseUrl.url}/api/bloodRequest`, { method: "GET" })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.status === true) {
            setRequest(responseJson.results);
            setLoading(false);
          } else {
            Alert.alert("Something went wrong!");
          }
        })
        .catch((error) =>
          Alert.alert(
            "Your internet connection seems down! Please try again later."
          )
        );
    });
    return unsubscribe;
  }, [props.navigation]);

  if (loading === true) {
    return <ActivityIndicator />;
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.topView}>
          <Text
            style={{
              color: "#fff",
              fontSize: 20,
              fontWeight: "bold",
              alignSelf: "center",
              marginLeft: 20,
            }}
          >
            You have {request.length} pending blood requests
          </Text>
        </View>

        <FlatList
          data={request}
          showsVerticalScrollIndicator={false}
          keyExtractor={(request) => request.requestId.toString()}
          ListEmptyComponent={EmptyList}
          renderItem={({ item }) => (
            <RequestComponent
              name={item.receiverName}
              requestId={item.requestId}
              navigation={props.navigation}
            />
          )}
          refreshing={refreshing}
          onRefresh={() => {
            fetch(`${baseUrl.url}/api/bloodRequest`, { method: "GET" })
              .then((response) => response.json())
              .then((responseJson) => {
                if (responseJson.status === true) {
                  setRequest(responseJson.results);
                } else {
                  Alert.alert("Something went wrong!");
                }
              })
              .catch((error) =>
                Alert.alert(
                  "Your internet connection seems down! Please try again later."
                )
              );
          }}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: "#f7f7f7",
  },
  topView: {
    backgroundColor: colors.blood,
    height: 60,
    opacity: 0.9,
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default Requests;
