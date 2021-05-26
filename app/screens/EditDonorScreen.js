import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Alert,
  ScrollView,
  Switch,
} from "react-native";
import colors from "../config/colors";
import districts from "../config/districts";
import blood from "../config/blood";

import PickerComponent from "../components/PickerComponent";
import AppButton from "../components/AppButton";
import baseUrl from "../config/baseUrl";
import { Popup } from "popup-ui";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function EditUserScreen(props) {
  const { detail } = props.route.params;
  //   const [firstName, setFirstName] = useState(detail.firstName);
  //   const [lastName, setLastName] = useState(detail.lastName);
  //   const [address, setAddress] = useState(detail.address);
  //   const [donorDistrict, setdonorDistrict] = useState(detail.donorDistrict);
  const [donorData, setDonorData] = useState({
    firstName: detail.firstName,
    lastName: detail.lastName,
    address: detail.address,
    donorDistrict: detail.donorDistrict,
    donorProvince: detail.donorProvince,
    donorContact: detail.donorContact,
    showContact: detail.showContact == 1 ? true : false,
    bloodType: detail.bloodType,
  });

  const checkFirstName = (val) => {
    setDonorData({ ...donorData, firstName: val });
  };
  const checkLastName = (val) => {
    setDonorData({ ...donorData, lastName: val });
  };
  const checkAddress = (val) => {
    setDonorData({ ...donorData, address: val });
  };

  const checkDonorContact = (val) => {
    setDonorData({ ...donorData, donorContact: val });
  };

  const handleShowContact = () => {
    setDonorData({ ...donorData, showContact: !donorData.showContact });
  };

  const handleUpdateDonor = () => {
    if (
      donorData.firstName == "" ||
      donorData.firstName == undefined ||
      donorData.lastName == "" ||
      donorData.lastName == undefined ||
      donorData.address == "" ||
      donorData.address == undefined ||
      donorData.bloodType == "" ||
      donorData.bloodType == undefined ||
      donorData.donorDistrict == "" ||
      donorData.donorDistrict == undefined ||
      donorData.donorProvince == undefined ||
      donorData.donorProvince == "" ||
      donorData.donorContact == "" ||
      donorData.donorContact == undefined
    ) {
      Alert.alert(
        "Some input fields might be missing or empty! Please try again!"
      );
    } else if (
      donorData.firstName.indexOf(" ") >= 0 ||
      donorData.lastName.indexOf(" ") >= 0 ||
      donorData.donorContact.indexOf(" ") >= 0
    ) {
      Alert.alert("Can't have white space");
    } else if (
      donorData.firstName.length < 2 ||
      donorData.firstName.length > 25 ||
      donorData.lastName.length > 25 ||
      donorData.lastName.length < 2 ||
      donorData.address.replaceAll(" ", "").length > 25 ||
      donorData.address.replaceAll(" ", "").length < 2 ||
      donorData.donorContact.length != 10
    ) {
      Alert.alert(
        "Invalid inputs, Check the length of the inputs before trying!"
      );
    } else {
      fetch(`${baseUrl.url}/api/donor`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({ donorData: donorData }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.status === "success") {
            Popup.show({
              type: "Success",
              title: "Donor Updated successfully!",
              button: true,
              textBody: "You have successfully updated the donor details",
              buttontext: "Ok",
              callback: () => {
                Popup.hide();
                props.navigation.navigate("Profile");
              },
            });
          } else if (responseJson.status === "fail") {
            Alert.alert(responseJson.data[Object.keys(responseJson.data)[0]]);
          } else {
            Popup.show({
              type: "Warning",
              title: "Something went wrong!",
              button: true,
              textBody: "Couldn't update the detail of donor",
              buttontext: "Ok",
              callback: () => {
                Popup.hide();
                props.navigation.navigate("Settings");
              },
            });
          }
        })
        .catch((error) => {
          Alert.alert(
            "Your internet connection seems down! Please try again later."
          );
        });
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text
        style={{
          color: "grey",
          width: "85%",
          letterSpacing: 1,
          marginBottom: 20,
        }}
      >
        <MaterialCommunityIcons name="information-outline" size={20} /> You can
        change your donor profile below!
      </Text>
      <Text
        style={{
          alignSelf: "flex-start",
          fontWeight: "600",
          fontSize: 15,
          marginLeft: 20,
          color: colors.blood,
        }}
      >
        First Name
      </Text>
      <TextInput
        value={donorData.firstName}
        onChangeText={(value) => checkFirstName(value)}
        style={[styles.textInput, { borderWidth: 2 }]}
        placeholder="First Name"
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
        Last Name
      </Text>
      <TextInput
        value={donorData.lastName}
        onChangeText={(value) => checkLastName(value)}
        style={[styles.textInput, { borderWidth: 2 }]}
        placeholder="Last Name"
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
        Address
      </Text>
      <TextInput
        value={donorData.address}
        onChangeText={(value) => checkAddress(value)}
        style={[styles.textInput, { borderWidth: 2 }]}
        placeholder="Address"
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
        District
      </Text>

      <PickerComponent
        title={donorData.donorDistrict}
        items={districts.districts}
        selectedItem={donorData.donorDistrict}
        onSelectedItem={(item) =>
          setDonorData({ ...donorData, donorDistrict: item.label })
        }
        style={{ height: 50, width: "90%", borderRadius: 5, margin: 10 }}
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
        Province
      </Text>
      <PickerComponent
        title={donorData.donorProvince}
        items={districts.province}
        selectedItem={donorData.donorProvince}
        onSelectedItem={(item) =>
          setDonorData({ ...donorData, donorProvince: item.label })
        }
        style={{ height: 50, width: "90%", borderRadius: 5, margin: 10 }}
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
        Mobile Number
      </Text>
      <TextInput
        value={donorData.donorContact}
        onChangeText={(value) => checkDonorContact(value)}
        style={[styles.textInput, { borderWidth: 2 }]}
        placeholder="Mobile Number"
        keyboardType="numeric"
        maxLength={10}
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
        Blood Type
      </Text>
      <PickerComponent
        title={donorData.bloodType}
        items={blood.bloodType}
        selectedItem={donorData.bloodType}
        onSelectedItem={(item) =>
          setDonorData({ ...donorData, bloodType: item.label })
        }
        style={{ height: 50, width: "90%", borderRadius: 5, margin: 10 }}
      />

      <View
        style={{ flexDirection: "row", alignSelf: "flex-start", margin: 5 }}
      >
        <Text
          style={{
            alignSelf: "flex-start",
            fontWeight: "600",
            fontSize: 15,
            marginHorizontal: 20,
            color: colors.blood,
            marginTop: 5,
          }}
        >
          Display Contact
        </Text>
        <Switch
          value={donorData.showContact}
          onValueChange={() => handleShowContact()}
        />
      </View>

      <AppButton
        title="Update details"
        onPress={() => handleUpdateDonor()}
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
    paddingTop: 10,
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

export default EditUserScreen;
