import React, { useState } from "react";
import {
  ScrollView,
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Linking,
  Platform,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Alert,
} from "react-native";

import Constants from "expo-constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import baseUrl from "../config/baseUrl";
import PickerComponent from "./PickerComponent";
import AppButton from "./AppButton";
import { Popup } from "popup-ui";
import donationTypes from "../config/donationType";
import blood from "../config/blood";

// const donationTypes = [
//   {
//     label: "Whole Blood",
//     value: "dt1",
//   },
//   {
//     label: "Red Cells",
//     value: "dt2",
//   },
//   {
//     label: "Plasma",
//     value: "dt3",
//   },
//   {
//     label: "Platelets",
//     value: "dt4",
//   },
// ];

const bloodTypes = [
  {
    label: "O+",
    value: "bt1",
  },
  {
    label: "A+",
    value: "bt2",
  },
  {
    label: "B+",
    value: "bt3",
  },
  {
    label: "B-",
    value: "bt4",
  },
];

function RenderDonorList({
  donorId,
  firstName,
  lastName,
  age,
  bloodGroup,
  address,
  contact,
  displayContact,
}) {
  const [donorNum, setDonorNum] = useState("");
  const [isRequestModalVisible, setIsRequestModalVisible] = useState(false);
  const [receiverName, setReceiverName] = useState("");
  const [receiverAddress, setReceiverAddress] = useState("");
  const [requirementDays, setRequirementDays] = useState("");
  const [receiverNumber, setReceiverNumber] = useState("");
  const [donationDetails, setDonationDetails] = useState("");
  const [donationType, setDonationType] = useState("");
  const [bloodType, setBloodType] = useState("");

  const [errors, setErrors] = useState({
    errorFullName: false,
    errorAddress: false,
    errorReqDays: false,
    errorMobNum: false,
    errorDonationDetails: false,

    mobNumMsg: "",
  });

  const clearAllState = () => {
    setReceiverNumber("");
    setReceiverAddress("");
    setRequirementDays("");
    setReceiverNumber("");
    setDonationDetails("");
    setDonationType("");
    setBloodType("");
    setDonorNum("");
  };

  const checkReceiverName = (val) => {
    if (!val) {
      setErrors({ ...errors, errorFullName: true });
    } else if (
      val.replaceAll(" ", "").length < 5 ||
      val.replaceAll(" ", "").length > 50
    ) {
      setErrors({ ...errors, errorFullName: true });
    } else {
      setErrors({ ...errors, errorFullName: false });
      setReceiverName(val);
    }
  };
  const checkReceiverAddress = (val) => {
    if (!val) {
      setErrors({ ...errors, errorAddress: true });
    } else if (
      val.replaceAll(" ", "").length < 2 ||
      val.replaceAll(" ", "").length > 50
    ) {
      setErrors({ ...errors, errorAddress: true });
    } else {
      setErrors({ ...errors, errorAddress: false });
      setReceiverAddress(val);
    }
  };

  const checkContact = (val) => {
    if (!val) {
      setErrors({
        ...errors,
        errorMobNum: true,
        mobNumMsg: "*Contact Number can't be empty",
      });
    } else if (val.indexOf(" ") >= 0) {
      setErrors({
        ...errors,
        errorMobNum: true,
        mobNumMsg: "*Invalid Contact Number",
      });
    } else if (val.length < 9 || val.length > 10) {
      setErrors({
        ...errors,
        errorMobNum: true,
        mobNumMsg: "*Invalid Contact Number",
      });
    } else {
      setErrors({ ...errors, errorMobNum: false });
      setReceiverNumber(val);
    }
  };

  const checkDonationDetail = (val) => {
    if (!val) {
      setErrors({ ...errors, errorDonationDetails: true });
    } else if (
      val.replaceAll(" ", "").length < 30 ||
      val.replaceAll(" ", "").length > 100
    ) {
      setErrors({ ...errors, errorDonationDetails: true });
    } else {
      setErrors({ ...errors, errorDonationDetails: false });
      setDonationDetails(val);
    }
  };

  const handleRequestButton = () => {
    if (
      errors.errorFullName ||
      errors.errorMobNum ||
      errors.errorAddress ||
      errors.errorDonationDetails
    ) {
      Alert.alert("Cannot send request with incorrect details");
    } else if (
      receiverName == "" ||
      receiverNumber == "" ||
      receiverAddress == "" ||
      requirementDays == "" ||
      donationDetails == "" ||
      donationType == "" ||
      bloodType == "" ||
      receiverName == undefined ||
      receiverNumber == undefined ||
      receiverAddress == undefined ||
      requirementDays == undefined ||
      donationDetails == undefined ||
      donationType == undefined ||
      bloodType == undefined
    ) {
      Alert.alert("Some fields seems to be missing! Please try again.");
    } else {
      fetch(`${baseUrl.url}/api/bloodRequest`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          receiverName: receiverName,
          receiverAddress: receiverAddress,
          requirementDays: requirementDays,
          receiverNumber: receiverNumber,
          donationDetails: donationDetails,
          donationType: donationType,
          bloodType: bloodType,
          donorId: donorNum,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.status === "success") {
            clearAllState();
            // Alert.alert("Blood Request", "The request is being sent", [
            //   {
            //     text: "OK",
            //     onPress: () => {
            //       setIsRequestModalVisible(false);
            //     },
            //   },
            // ]);
            setIsRequestModalVisible(false);
            Popup.show({
              type: "Success",
              title: "Blood Request",
              button: true,
              textBody: "Your request for blood is being sent to the user",
              buttontext: "Ok",
              callback: () => {
                Popup.hide();
              },
            });
          } else {
            Alert.alert("The request was not sent to the donor!");
          }
        })
        .catch((error) => {
          Alert.alert(
            "Failed to send request! Check your internet connection and try again"
          );
        });
    }
  };
  return (
    <View style={styles.donorContainer}>
      {/* <View style= {styles.donor}> */}
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#fff",
          width: "100%",
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          shadowColor: "grey",
          shadowOpacity: 0.1,
          shadowRadius: 15,
          shadowOffset: { height: -5, width: 5 },
        }}
      >
        <TouchableHighlight>
          <Image
            style={styles.donorImage}
            source={require("../assets/images.png")}
          />
        </TouchableHighlight>
        <View style={styles.detailContainer}>
          <Text style={styles.txt}>
            Name: {firstName} {lastName}
          </Text>
          <Text style={styles.txt}>Blood Group: {bloodGroup}</Text>
          <Text style={styles.txt}>Address: {address}</Text>
          <Text style={styles.txt}>Age: 20</Text>

          <Text style={styles.txt}>Contact: {contact}</Text>
        </View>
      </View>

      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#dc143c",
          width: "100%",
          flexDirection: "row",
          height: 45,
          borderBottomRightRadius: 20,
          borderBottomLeftRadius: 20,
        }}
      >
        <TouchableOpacity
          style={styles.callBtn}
          onPress={() => {
            if (contact === "Contact Hidden") {
              alert(
                "Cannot Call!! Contact is hidden. You can only make requests to donor like this"
              );
            } else {
              Platform.OS === "ios"
                ? Linking.openURL(`telprompt:${contact}`)
                : Linking.openURL(`tel:${contact}`);
            }
          }}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: "600",
              color: "#f5f5f5",
              marginLeft: 15,
            }}
          >
            Call
          </Text>
          <MaterialCommunityIcons
            name={"phone"}
            color={"#fff"}
            size={25}
            style={{ marginLeft: 10, marginBottom: 2 }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.reqBtn}
          onPress={() => {
            setIsRequestModalVisible(true);
            setDonorNum(donorId);
          }}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: "600",
              color: "#f5f5f5",
              marginLeft: 30,
            }}
          >
            Request Donation
          </Text>
          <MaterialCommunityIcons
            name={"hand-heart"}
            color={"#fff"}
            size={25}
            style={{ marginLeft: 10, marginBottom: 6 }}
          />
        </TouchableOpacity>
      </View>

      <Modal
        visible={isRequestModalVisible}
        transparent={true}
        animationType="slide"
      >
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          style={{
            justifyContent: "center",
            alignSelf: "center",
            height: "100%",
            width: "90%",
          }}
        >
          <SafeAreaView
            style={{
              backgroundColor: "#f7f7f7",
              borderRadius: 20,
              borderWidth: 3,
              borderColor: "gray",
            }}
          >
            <View style={styles.requestFormModal}>
              <View
                style={{ flexDirection: "row", marginLeft: 10, marginTop: -20 }}
              >
                <Text
                  style={{
                    fontSize: 25,
                    fontWeight: "bold",
                    color: colors.blood,
                  }}
                >
                  Request Form
                </Text>
                <Text
                  onPress={() => {
                    setIsRequestModalVisible(false);
                  }}
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    color: colors.blood,
                    marginLeft: "40%",
                  }}
                >
                  X
                </Text>
              </View>
              <View
                style={{
                  width: "100%",
                  backgroundColor: colors.blood,
                  height: 2,
                  marginVertical: 5,
                }}
              />

              <ScrollView>
                <Text
                  style={{
                    color: colors.blood,
                    fontSize: 16,
                    fontWeight: "700",
                    marginTop: 5,
                    marginLeft: 20,
                  }}
                >
                  Receiver's full name
                </Text>
                <TextInput
                  placeholder="Full name"
                  placeholderTextColor="#a9a9a9"
                  keyboardType="default"
                  autoCapitalize="none"
                  maxLength={25}
                  clearButtonMode="always"
                  onChangeText={(receiverName) =>
                    checkReceiverName(receiverName)
                  }
                  style={styles.modalTextInput}
                />

                {errors.errorFullName ? (
                  <Text
                    style={{
                      alignSelf: "flex-start",
                      color: "red",
                      marginLeft: 20,
                    }}
                  >
                    "Full name must be between 5-50 characters"
                  </Text>
                ) : null}

                <Text
                  style={{
                    color: colors.blood,
                    fontSize: 16,
                    fontWeight: "700",
                    marginTop: 5,
                    marginLeft: 20,
                  }}
                >
                  Receiver's address
                </Text>
                <TextInput
                  placeholder="Address"
                  placeholderTextColor="#a9a9a9"
                  keyboardType="default"
                  autoCapitalize="none"
                  maxLength={35}
                  clearButtonMode="always"
                  onChangeText={(receiverAddress) =>
                    checkReceiverAddress(receiverAddress)
                  }
                  style={styles.modalTextInput}
                />

                {errors.errorAddress ? (
                  <Text
                    style={{
                      alignSelf: "flex-start",
                      color: "red",
                      marginLeft: 20,
                    }}
                  >
                    "Address must be between 2-70 characters"
                  </Text>
                ) : null}

                <Text
                  style={{
                    color: colors.blood,
                    fontSize: 16,
                    fontWeight: "700",
                    marginTop: 5,
                    marginLeft: 20,
                  }}
                >
                  Requirement days
                </Text>
                <TextInput
                  placeholder="Value can be 'Emergency' or days"
                  placeholderTextColor="#a9a9a9"
                  keyboardType="default"
                  autoCapitalize="none"
                  maxLength={35}
                  clearButtonMode="always"
                  onChangeText={(requirementDays) =>
                    setRequirementDays(requirementDays)
                  }
                  style={styles.modalTextInput}
                />

                <Text
                  style={{
                    color: colors.blood,
                    fontSize: 16,
                    fontWeight: "700",
                    marginTop: 5,
                    marginLeft: 20,
                  }}
                >
                  Mobile number
                </Text>
                <TextInput
                  placeholder="Mobile Number"
                  placeholderTextColor="#a9a9a9"
                  keyboardType="numeric"
                  autoCapitalize="none"
                  maxLength={10}
                  clearButtonMode="always"
                  onChangeText={(receiverNumber) =>
                    checkContact(receiverNumber)
                  }
                  style={styles.modalTextInput}
                />
                {errors.errorMobNum ? (
                  <Text
                    style={{
                      alignSelf: "flex-start",
                      color: "red",
                      marginLeft: 20,
                    }}
                  >
                    {errors.mobNumMsg}
                  </Text>
                ) : null}

                <Text
                  style={{
                    color: colors.blood,
                    fontSize: 16,
                    fontWeight: "700",
                    marginTop: 5,
                    marginLeft: 20,
                  }}
                >
                  Describe the detail for donation
                </Text>
                <TextInput
                  placeholder="Write about reason for receiving blood"
                  multiline={true}
                  placeholderTextColor="#a9a9a9"
                  keyboardType="default"
                  autoCapitalize="none"
                  maxLength={200}
                  clearButtonMode="always"
                  onChangeText={(donationDetails) =>
                    checkDonationDetail(donationDetails)
                  }
                  style={{
                    alignSelf: "center",
                    width: "90%",
                    borderWidth: 1,
                    height: 70,
                    borderRadius: 10,
                    padding: 5,
                    marginVertical: 5,
                  }}
                />
                {errors.errorDonationDetails ? (
                  <Text
                    style={{
                      alignSelf: "flex-start",
                      color: "red",
                      marginLeft: 20,
                    }}
                  >
                    *Donation detail needs to be betweenn 30 to 100 characters
                  </Text>
                ) : null}
                <Text
                  style={{
                    color: colors.blood,
                    fontSize: 16,
                    fontWeight: "700",
                    marginTop: 5,
                    marginLeft: 20,
                  }}
                >
                  Type of donation
                </Text>
                <PickerComponent
                  title="Choose Donation Type"
                  items={donationTypes.donationType}
                  selectedItem={donationType}
                  onSelectedItem={(item) => setDonationType(item.label)}
                  style={{
                    height: 50,
                    alignSelf: "center",
                    width: "90%",
                    marginTop: 5,
                  }}
                />

                <Text
                  style={{
                    color: colors.blood,
                    fontSize: 16,
                    fontWeight: "700",
                    marginTop: 10,
                    marginLeft: 20,
                  }}
                >
                  Required Blood Group
                </Text>
                <PickerComponent
                  title="Choose Blood Group"
                  items={blood.bloodType}
                  selectedItem={bloodType}
                  onSelectedItem={(item) => setBloodType(item.label)}
                  style={{
                    height: 50,
                    alignSelf: "center",
                    width: "90%",
                    marginTop: 5,
                  }}
                />

                <AppButton
                  title="Request"
                  style={{
                    backgroundColor: colors.blood,
                    alignSelf: "center",
                    borderRadius: 15,
                  }}
                  onPress={handleRequestButton}
                />
                {/* <Text
                  style={{
                    alignSelf: "flex-start",
                    color: "red",
                    marginLeft: 20,
                  }}
                >
                  <MaterialCommunityIcons
                    name="information-outline"
                    size={15}
                  />{" "}
                  Invalid inputs! Please try again
                </Text> */}
              </ScrollView>
            </View>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  donorContainer: {
    paddingTop: 20,
    backgroundColor: "#f2f2f2",
    alignItems: "center",
  },
  donor: {
    backgroundColor: "#fff",
    width: "90%",
    borderRadius: 20,
  },

  donorImage: {
    height: 80,
    width: 80,
    borderRadius: 40,
    marginTop: 20,
    marginLeft: 10,
  },
  detailContainer: {
    padding: 20,
    flexShrink: 1,
  },
  txt: {
    fontSize: 15,
    fontWeight: "600",
    padding: 3,
    flexWrap: "wrap",
  },
  callBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
  reqBtn: {
    flexDirection: "row",
    marginLeft: 20,
    alignItems: "center",
    borderLeftColor: "#fff",
    borderLeftWidth: 1,
  },
  requestFormModal: {
    paddingTop: Constants.statusBarHeight,
    width: "100%",
    paddingBottom: 18,
  },
  closeIcon: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.blood,
    marginLeft: 120,
  },
  modalTextInput: {
    alignSelf: "center",
    width: "90%",
    borderWidth: 1,
    height: 40,
    borderRadius: 10,
    padding: 5,
    marginVertical: 5,
  },
});

export default RenderDonorList;
