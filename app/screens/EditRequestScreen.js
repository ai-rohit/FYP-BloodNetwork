import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  TextInput,
  Text,
  Alert,
} from "react-native";
import AppButton from "../components/AppButton";
import PickerComponent from "../components/PickerComponent";
import donationType from "../config/donationType";
import colors from "../config/colors";
import baseUrl from "../config/baseUrl";
import { Root, Popup } from "popup-ui";

function EditRequestScreen(props) {
  const { request } = props.route.params;
  const [requestDetails, setRequestDetails] = useState({
    requestId: request.requestId,
    receiverName: request.receiverName,
    receiverAddress: request.receiverAddress,
    requirementDays: request.requirementDays,
    receiverNumber: request.receiverNumber,
    donationDetails: request.donationDetails,
    donationType: request.donationType,
  });
  const checkReceiverName = (val) => {
    setRequestDetails({ ...requestDetails, receiverName: val });
  };

  const checkReceiverAddress = (val) => {
    setRequestDetails({ ...requestDetails, receiverAddress: val });
  };

  const checkRequirementDays = (val) => {
    setRequestDetails({ ...requestDetails, requirementDays: val });
  };

  const checkReceiverNumber = (val) => {
    setRequestDetails({ ...requestDetails, receiverNumber: val });
  };

  const checkDonationDetails = (val) => {
    setRequestDetails({ ...requestDetails, donationDetails: val });
  };

  const onUpdate = () => {
    fetch(`${baseUrl.url}/api/bloodRequest`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        request: requestDetails,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === "success") {
          Popup.show({
            type: "Success",
            title: "Request updated",
            button: true,
            textBody: "Details of request have been updated successfully",
            buttontext: "Ok",
            callback: () => {
              Popup.hide();
              props.navigation.navigate("RequestStatus");
            },
          });
        } else if (responseJson.status === "fail") {
          Alert.alert("Couldn't update the request");
        } else {
          Alert.alert("Something went wrong");
        }
      })
      .catch((error) =>
        Alert.alert(
          "Your internet connection seems down! Please try again later."
        )
      );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text
        style={{
          alignSelf: "flex-start",
          fontWeight: "600",
          fontSize: 15,
          marginLeft: 20,
          color: colors.blood,
        }}
      >
        Receiver's Name
      </Text>
      <TextInput
        value={requestDetails.receiverName}
        onChangeText={(value) => checkReceiverName(value)}
        style={[styles.textInput, { borderWidth: 2 }]}
        placeholder="Receiver Name"
        keyboardType="default"
        //maxLength={6}
      />

      <Text
        style={{
          alignSelf: "flex-start",
          fontWeight: "600",
          fontSize: 15,
          marginLeft: 20,
          color: colors.blood,
        }}
      >
        Receiver's Address
      </Text>
      <TextInput
        value={requestDetails.receiverAddress}
        onChangeText={(value) => checkReceiverAddress(value)}
        style={[styles.textInput, { borderWidth: 2 }]}
        placeholder="Receiver's Address"
        keyboardType="default"
        //maxLength={6}
      />

      <Text
        style={{
          alignSelf: "flex-start",
          fontWeight: "600",
          fontSize: 15,
          marginLeft: 20,
          color: colors.blood,
        }}
      >
        Requirement Days
      </Text>
      <TextInput
        value={requestDetails.requirementDays}
        onChangeText={(value) => checkRequirementDays(value)}
        style={[styles.textInput, { borderWidth: 2 }]}
        placeholder="Requirement days"
        keyboardType="default"
        //maxLength={6}
      />

      {/* <PickerComponent
        title={donorData.donorDistrict}
        items={districts.districts}
        selectedItem={donorData.donorDistrict}
        onSelectedItem={(item) =>
          setDonorData({ ...donorData, donorDistrict: item.label })
        }
        style={{ height: 50, width: "90%", borderRadius: 5, margin: 10 }}
      /> */}
      {/* <Text
        style={{
          alignSelf: "flex-start",
          fontWeight: "600",
          fontSize: 15,
          marginLeft: 20,
          color: colors.blood,
        }}
      >
        Receiver's Number
      </Text> */}
      {/* <PickerComponent
        title={donorData.donorProvince}
        items={districts.province}
        selectedItem={donorData.donorProvince}
        onSelectedItem={(item) =>
          setDonorData({ ...donorData, donorProvince: item.label })
        }
        style={{ height: 50, width: "90%", borderRadius: 5, margin: 10 }}
      /> */}

      <Text
        style={{
          alignSelf: "flex-start",
          fontWeight: "600",
          fontSize: 15,
          marginLeft: 20,
          color: colors.blood,
        }}
      >
        Receiver's Number
      </Text>
      <TextInput
        value={requestDetails.receiverNumber}
        onChangeText={(value) => checkReceiverNumber(value)}
        style={[styles.textInput, { borderWidth: 2 }]}
        placeholder="Mobile Number"
        keyboardType="default"
        //maxLength={6}
      />
      <Text
        style={{
          alignSelf: "flex-start",
          fontWeight: "600",
          fontSize: 15,
          marginLeft: 20,
          color: colors.blood,
        }}
      >
        Donation details
      </Text>
      <TextInput
        value={requestDetails.donationDetails}
        onChangeText={(value) => checkDonationDetails(value)}
        style={[styles.textInput, { borderWidth: 2, paddingTop: 15 }]}
        placeholder="Donation details"
        keyboardType="default"
        multiline={true}
        //maxLength={6}
      />

      <Text
        style={{
          alignSelf: "flex-start",
          fontWeight: "600",
          fontSize: 15,
          marginLeft: 20,
          color: colors.blood,
        }}
      >
        Donation Type
      </Text>

      <PickerComponent
        title={requestDetails.donationType}
        items={donationType.donationType}
        selectedItem={requestDetails.donationType}
        onSelectedItem={(item) =>
          setRequestDetails({ ...requestDetails, donationType: item.label })
        }
        style={{ height: 50, width: "90%", borderRadius: 5, margin: 10 }}
      />

      <AppButton
        title="Update Request"
        onPress={() => onUpdate()}
        style={{
          backgroundColor: colors.blood,
          borderRadius: 8,
          marginTop: 10,
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  textInput: {
    height: 50,
    borderWidth: 2,
    margin: 10,
    width: "90%",
    borderRadius: 5,
    padding: 10,
    borderColor: colors.blood,
  },
});

export default EditRequestScreen;
