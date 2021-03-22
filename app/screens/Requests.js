import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useState } from "react/cjs/react.development";
import RequestList from "../components/RequestList";
import colors from "../config/colors";
import baseUrl from "../config/baseUrl";
import ActivityIndicator from "../components/ActivityIndicator";

// const request = [

//         {name: "Rohit Shrestha", reqId: "bd1", bloodType: "A+", address: "Newroad, Pokhara", contact:"9866014624",
//         details: "Need donation as my friend has suffered from corona virus", donationType: "Plasma", reqDay: "emergency"},
//         {name: "Rohit Shrestha", reqId: "bd2", bloodType: "A+", address: "Newroad, Pokhara", contact:"9866014624",
//         details: "Need donation as my friend has suffered from corona virus", donationType: "Plasma", reqDay: "emergency"}

// ]

function Requests(props) {
  const [request, setRequest] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${baseUrl.url}/api/bloodRequest`, { method: "GET" })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === true) {
          setRequest(responseJson.results);
          setLoading(false);
        } else {
          alert("Something went wrong!");
        }
      })
      .catch((error) => console.error(error));
  }, []);

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
            You have {request.length} incoming blood requests
          </Text>
        </View>

        <RequestList items={request} navigation={props.navigation} />
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
