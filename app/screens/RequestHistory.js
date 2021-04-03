import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Linking,
  Dimensions,
  Alert,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import Constants from "expo-constants";
import baseUrl from "../config/baseUrl";
import ActivityIndicator from "../components/ActivityIndicator";
import { Fontisto, Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import colors from "../config/colors";

function RequestHistory(props) {
  const [requestHistory, setRequestHistory] = useState("");
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState();
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  const handleConfirm = (date) => {
    setDate(date);
    hideDatePicker();
  };

  const hideDatePicker = () => {
    setIsDatePickerVisible(false);
  };

  const handleDateTimePicker = () => {
    setIsDatePickerVisible(true);
  };

  const getReqHistory = () => {
    fetch(`${baseUrl.url}/api/bloodRequest/history`, { method: "GET" })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === "success") {
          setRequestHistory(responseJson.results);
          //setLoading(false);
          //setLoading(false);
        } else {
          alert(responseJson.status);
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      fetch(`${baseUrl.url}/api/bloodRequest/history`, { method: "GET" })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.status === "success") {
            setRequestHistory(responseJson.results);
            setLoading(false);
            //setLoading(false);
          } else {
            alert(responseJson.status);
          }
        })
        .catch((error) => console.error(error));
    });
    return unsubscribe;
  }, [props.navigation]);

  const handleDonated = (requestId, donationId) => {
    fetch(
      `${baseUrl.url}/api/bloodRequest/donated/${requestId}/${donationId}`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          donatedDate: date,
        }),
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status == false) {
          alert(responseJson.message);
        } else if (responseJson.status == true) {
          getReqHistory();
          alert("Successful");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleNotDonated = (requestId) => {
    fetch(`${baseUrl.url}/api/bloodRequest/not_donated/${requestId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status == "fail") {
          alert("Something went wrong");
        } else if (responseJson.status == "success") {
          getReqHistory();
          alert("Successful");
        } else if (responseJson.status == "error") {
          alert(responseJson.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (loading === true) {
    return <ActivityIndicator />;
  } else {
    return (
      <View style={styles.container}>
        <FlatList
          data={requestHistory}
          style={{ width: "100%" }}
          keyExtractor={(item) => item.requestId.toString()}
          renderItem={({ item }) => {
            return (
              <View style={styles.detailCard}>
                <View
                  style={[
                    styles.textContainer,
                    { justifyContent: "space-between" },
                  ]}
                >
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.label}>Donation Type: </Text>
                    <Text style={styles.textData}>{item.donationType}</Text>
                  </View>
                  <Text style={styles.textData}>
                    Within {item.requirementDays}
                  </Text>
                </View>

                <View style={styles.textContainer}>
                  <Text style={styles.label}>Required Blood: </Text>
                  <Text style={styles.textData}>{item.bloodType}</Text>
                </View>

                <View
                  style={{
                    backgroundColor: "#f5f5f5",
                    height: 1,
                    width: "100%",
                  }}
                />

                <View style={styles.textContainer}>
                  <Fontisto
                    name="person"
                    size={20}
                    style={{ marginLeft: 10 }}
                  />
                  <Text style={styles.label}>Request From: </Text>
                  <Text style={styles.textData}>{item.receiverName}</Text>
                </View>

                <View style={styles.textContainer}>
                  {/* <Text style={styles.label}>Requester's Address: </Text> */}
                  <Entypo
                    name="location-pin"
                    size={20}
                    style={{ marginHorizontal: 10 }}
                    color={colors.blood}
                  />
                  <Text style={styles.textData}>{item.receiverAddress}</Text>
                </View>

                <View style={styles.textContainer}>
                  {/* <Text style={styles.label}>Requester's Contact: </Text> */}
                  <MaterialCommunityIcons
                    name="cellphone"
                    size={20}
                    style={{ marginHorizontal: 10 }}
                  />
                  <Text
                    style={styles.textData}
                    onPress={() => {
                      Linking.openURL(`tel:${item.receiverNumber}`);
                    }}
                  >
                    {item.receiverNumber}
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: "#f5f5f5",
                    height: 1,
                    width: "100%",
                  }}
                />
                <View style={styles.textContainer}>
                  <Text style={styles.label}>Decision: </Text>
                  <Text
                    style={[
                      styles.textData,
                      {
                        color:
                          item.requestStatus === "accepted" ? "green" : "red",
                      },
                    ]}
                  >
                    {item.requestStatus}
                  </Text>
                </View>

                <View
                  style={[styles.textContainer, { flexDirection: "column" }]}
                >
                  <Text style={styles.label}>Your response: </Text>
                  <Text style={[styles.textData, { marginLeft: 10 }]}>
                    {item.donorResponse}
                  </Text>
                </View>
                {item.requestStatus === "marked donated" ? (
                  <View
                    style={{
                      width: "100%",
                      justifyContent: "center",
                      alignItems: "center",

                      padding: 5,
                    }}
                  >
                    <Text style={{ color: "grey", marginLeft: 10 }}>
                      <MaterialCommunityIcons
                        name="information-outline"
                        size={15}
                      />
                      Receiver marked the request as donated. Approve the
                      donation with the donted date!
                    </Text>
                    <View style={styles.inputContainer}>
                      <Text style={[styles.dateLabel, { marginLeft: 15 }]}>
                        Date of donation
                      </Text>
                      <TouchableWithoutFeedback onPress={handleDateTimePicker}>
                        <View style={styles.dateTimePicker}>
                          <Text style={{ fontSize: 18 }}>
                            {date
                              ? moment(date).format("MMMM Do YYYY")
                              : "Select a Date"}
                          </Text>
                          <MaterialCommunityIcons
                            name="calendar"
                            size={20}
                            style={{ marginLeft: 20, alignSelf: "center" }}
                          />
                        </View>
                      </TouchableWithoutFeedback>
                      <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                      />
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        marginBottom: 10,
                      }}
                    >
                      <TouchableOpacity
                        style={[
                          styles.donatedButton,
                          { backgroundColor: colors.success, marginRight: 20 },
                        ]}
                        onPress={() =>
                          handleDonated(item.requestId, item.donorId)
                        }
                      >
                        <Text style={styles.texts}>Donated</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.donatedButton,
                          { backgroundColor: colors.blood },
                        ]}
                        onPress={() => handleNotDonated(item.requestId)}
                      >
                        <Text style={styles.texts}>Not Donated</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : null}
              </View>
            );
          }}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Constants.statusBarHeight,
  },
  detailCard: {
    alignSelf: "center",
    width: "85%",
    marginVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "grey",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: {
      height: 10,
      width: -10,
    },
  },
  textContainer: {
    flexDirection: "row",
    padding: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  textData: {
    fontSize: 16,
    fontWeight: "500",
  },
  donatedButton: {
    width: Dimensions.get("window").width / 2.8,
    backgroundColor: "white",
    height: 40,
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  texts: { fontSize: 16, fontWeight: "400", color: "#fff" },
  dateTimePicker: {
    backgroundColor: "#C8C8C8",
    borderRadius: 5,
    height: 50,
    flexDirection: "row",
    width: "90%",
    padding: 15,
    justifyContent: "center",
  },
  inputContainer: {
    width: "100%",
    margin: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  dateLabel: {
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    fontWeight: "600",
    alignSelf: "flex-start",
    marginLeft: 30,
  },
});

export default RequestHistory;
