import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import colors from "../config/colors";
import districts from "../config/districts";

import PickerComponent from "../components/PickerComponent";
import AppButton from "../components/AppButton";
import baseUrl from "../config/baseUrl";
import { Popup } from "popup-ui";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function EditUserScreen(props) {
  const { detail } = props.route.params;
  const [firstName, setFirstName] = useState(detail.firstName);
  const [lastName, setLastName] = useState(detail.lastName);
  const [address, setAddress] = useState(detail.address);
  const [userDistrict, setUserDistrict] = useState(detail.userDistrict);
  const [errors, setErrors] = useState({
    errorFirstName: "",
    errorLastName: "",
    errorAddress: "",
  });
  const checkFirstName = (val) => {
    if (val == "" || val.length < 2 || val.length > 25 || val == undefined) {
      setErrors({
        ...errors,
        errorFirstName: "*First Name can be of 2-25 characters only.",
      });
    } else {
      setErrors({ ...errors, errorFirstName: "" });
      setFirstName(val);
    }
  };
  const checkLastName = (val) => {
    if (val == "" || val.length < 2 || val.length > 25 || val == undefined) {
      setErrors({
        ...errors,
        errorLastName: "*Last Name can be of 2-25 characters only.",
      });
    } else {
      setErrors({ ...errors, errorLastName: "" });
      setLastName(val);
    }
  };
  const checkAddress = (val) => {
    if (val == "" || val.length < 2 || val.length > 70 || val == undefined) {
      setErrors({
        ...errors,
        errorAddress: "*Address can be of 2-70 characters only.",
      });
    } else {
      setErrors({ ...errors, errorAddress: "" });
      setAddress(val);
    }
  };

  const handleUpdate = () => {
    if (errors.errorLastName || errors.errorFirstName || errors.errorAddress) {
      Alert.alert("Can't Proceed with invalid inputs!");
    } else {
      fetch(`${baseUrl.url}/api/users`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          address: address,
          userDistrict: userDistrict,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.status === "success") {
            Popup.show({
              type: "Success",
              title: "User updated",
              button: true,
              textBody: "Details of user have been updated successfully",
              buttontext: "Ok",
              callback: () => {
                Popup.hide();
                props.navigation.navigate("Profile");
              },
            });
          } else {
            Popup.show({
              type: "Danger",
              title: "User updated",
              button: true,
              textBody: "Details of user have been updated successfully",
              autoClose: true,
              buttontext: "Ok",
              callback: () => {
                Popup.hide();
              },
            });
          }
        })
        .catch((error) => {
          Alert.alert("Sorry, Something went wrong");
        });
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text
        style={{
          color: "grey",
          width: "90%",
          letterSpacing: 1,
          marginBottom: 20,
        }}
      >
        <MaterialCommunityIcons name="information-outline" size={20} /> You can
        edit your information by filling the details in the form presented below
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
        // value={firstName}
        onChangeText={(value) => checkFirstName(value)}
        style={[styles.textInput, { borderWidth: 2 }]}
        placeholder="First Name"
        keyboardType="default"
        //maxLength={6}
      />
      {errors.errorFirstName ? (
        <Text
          style={{
            alignSelf: "flex-start",
            marginLeft: 20,
            color: "red",
            marginBottom: 5,
          }}
        >
          <MaterialCommunityIcons
            name="information-outline"
            size={15}
            style={{ marginLeft: 5 }}
          />{" "}
          {errors.errorFirstName}
        </Text>
      ) : null}
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
        onChangeText={(value) => checkLastName(value)}
        style={[styles.textInput, { borderWidth: 2 }]}
        placeholder="Last Name"
        keyboardType="default"
        //maxLength={6}
      />
      {errors.errorLastName ? (
        <Text
          style={{
            alignSelf: "flex-start",
            marginLeft: 20,
            color: "red",
            marginBottom: 5,
          }}
        >
          <MaterialCommunityIcons
            name="information-outline"
            size={15}
            style={{ marginLeft: 5 }}
          />{" "}
          {errors.errorLastName}
        </Text>
      ) : null}
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
        onChangeText={(value) => checkAddress(value)}
        style={[styles.textInput, { borderWidth: 2 }]}
        placeholder="Address"
        keyboardType="default"
        //maxLength={6}
      />
      {errors.errorAddress ? (
        <Text
          style={{
            alignSelf: "flex-start",
            marginLeft: 20,
            color: "red",
            marginBottom: 5,
          }}
        >
          <MaterialCommunityIcons
            name="information-outline"
            size={15}
            style={{ marginLeft: 5 }}
          />{" "}
          {errors.errorAddress}
        </Text>
      ) : null}
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
        title={userDistrict}
        items={districts.districts}
        selectedItem={userDistrict}
        onSelectedItem={(item) => setUserDistrict(item.label)}
        style={{ height: 50, width: "90%", borderRadius: 5, margin: 15 }}
      />

      <AppButton
        title="Update details"
        onPress={() => handleUpdate()}
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
    flex: 1,
    justifyContent: "center",
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
