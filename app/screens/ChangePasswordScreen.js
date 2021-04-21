import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import AppButton from "../components/AppButton";
import baseUrl from "../config/baseUrl";
import colors from "../config/colors";
import { Popup } from "popup-ui";
import { MaterialCommunityIcons } from "@expo/vector-icons";
function ChangePasswordScreen(props) {
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [erroMsg, setErrorMsg] = useState();

  const checkOldPassword = (value) => {
    setOldPassword(value);
  };

  const checkNewPassword = (value) => {
    setNewPassword(value);
  };

  const checkConfirmPassword = (value) => {
    setConfirmPassword(value);
  };

  const handlePasswordChange = () => {
    console.log(oldPassword, newPassword, confirmPassword);
    fetch(`${baseUrl.url}/api/login_auth/password`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        oldPassword: oldPassword,
        newPassword: newPassword,
        confirmPassword: confirmPassword,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === "fail") {
          //Alert.alert(Object.keys(responseJson.data)[0]);
          setErrorMsg(responseJson.data[Object.keys(responseJson.data)[0]]);
        } else if (responseJson.status === "success") {
          Popup.show({
            type: "Success",
            title: "Password Changed",
            button: true,
            textBody: "You changed the password successfully!",
            buttontext: "Ok",
            callback: () => {
              Popup.hide();
              props.navigation.navigate("Settings");
            },
          });
        } else {
          alert("Sorry, Something went wrong!");
        }
      })
      .catch((error) => {
        alert("Sorry, Something went wrong!");
      });
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
        change your password below!
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
        Old Password
      </Text>
      <TextInput
        value={oldPassword}
        onChangeText={(value) => checkOldPassword(value)}
        style={[styles.textInput, { borderWidth: 2 }]}
        placeholder="Old Password"
        keyboardType="default"
        secureTextEntry={true}
        maxLength={16}
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
        New Password
      </Text>
      <TextInput
        value={newPassword}
        onChangeText={(value) => checkNewPassword(value)}
        style={[styles.textInput, { borderWidth: 2 }]}
        placeholder="New Password"
        keyboardType="default"
        secureTextEntry={true}
        maxLength={16}
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
        Confirm New Password
      </Text>
      <TextInput
        value={confirmPassword}
        onChangeText={(value) => checkConfirmPassword(value)}
        style={[styles.textInput, { borderWidth: 2 }]}
        placeholder="Confirm Password"
        keyboardType="default"
        secureTextEntry={true}
        maxLength={16}
      />
      {erroMsg ? <Text style={{ color: "red" }}>{erroMsg}</Text> : null}

      <AppButton
        title="Change Password"
        style={{ width: "90%", borderRadius: 5, backgroundCOlor: colors.blood }}
        onPress={() => handlePasswordChange()}
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
export default ChangePasswordScreen;
