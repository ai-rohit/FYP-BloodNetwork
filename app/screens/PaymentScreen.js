import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  TextInput,
  StyleSheet,
  Modal,
  Image,
  Text,
  Dimensions,
  ScrollView,
  Alert,
} from "react-native";
import { WebView } from "react-native-webview";
import * as ScreenOrientation from "expo-screen-orientation";
import AppButton from "../components/AppButton";
import colors from "../config/colors";
import baseUrl from "../config/baseUrl";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import { Root, Popup } from "popup-ui";

function PaymentScreen(props) {
  const { navigation } = props;

  // useEffect(() => {
  //   navigation.addListener("focus", () => {
  //     ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
  //   });

  //   navigation.addListener("blur", () => {
  //     ScreenOrientation.lockAsync(
  //       ScreenOrientation.OrientationLock.PORTRAIT_UP
  //     );
  //   });
  // }, [navigation]);
  const [mobileNumber, setMobileNumber] = useState();
  const [khaltiPin, setKhaltiPin] = useState();
  const [otp, setOtp] = useState();
  const [phonePinModal, setPhonePinModal] = useState(false);
  const [otpModalVisible, setOtpModalVisible] = useState(false);
  const [token, setToken] = useState();
  const [amount, setAmount] = useState();

  const mobileNumberValue = (value) => {
    setMobileNumber(value);
  };

  const khaltiPinValue = (value) => {
    setKhaltiPin(value);
  };
  const donationAmountValue = (value) => {
    setAmount(value);
  };

  const handleDonation = () => {
    setPhonePinModal(true);
  };
  const handleKhalti = () => {
    console.log(mobileNumber, khaltiPin);
    fetch("https://khalti.com/api/v2/payment/initiate/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        public_key: "test_public_key_30940c8db7964b09924b70daad5dad1e",
        mobile: mobileNumber,
        transaction_pin: khaltiPin,
        amount: amount * 100,
        product_identity: "book/id-120",
        product_name: "A Song of Ice and Fire",
        product_url: "http://bookexample.com",
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        setToken(responseJson.token);
        setOtpModalVisible(true);
        setPhonePinModal(false);
      })
      .catch((error) => {
        Alert.alert(
          "Your internet connection seems down! Please try again later."
        );
      });
  };

  const handlePayment = () => {
    console.log(mobileNumber, khaltiPin);
    fetch("https://khalti.com/api/v2/payment/confirm/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        public_key: "test_public_key_30940c8db7964b09924b70daad5dad1e",
        token: token,
        confirmation_code: otp,
        transaction_pin: khaltiPin,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        fetch(`${baseUrl.url}/api/payment/charge`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: responseJson.token,
            amount: responseJson.amount,
          }),
        })
          .then((response) => response.json())
          .then((responseJson) => {
            console.log("Hello");
            console.log(responseJson);
            if (responseJson.status == "success") {
              console.log("Payment Successful");
              clearState();
              setOtpModalVisible(false);
              Popup.show({
                type: "Success",
                title: "Donation completed",
                button: true,
                textBody: "Thank you for your donation",
                autoClose: true,
                buttontext: "Ok",
                callback: () => Popup.hide(),
              });
              //window.location.replace("http://www.w3schools.com");
            } else {
              clearState();
              Alert.alert("Something went wrong! Payment not verified");
            }
          })
          .catch((error) => {
            Alert.alert(
              "Your internet connection seems down! Please try again later."
            );
          });
      })
      .catch((error) => {
        Alert.alert(
          "Your internet connection seems down! Please try again later."
        );
      });
  };

  const clearState = () => {
    setMobileNumber("");
    setKhaltiPin("");
    setAmount("");
    setOtp("");
    setToken("");
  };
  return (
    <Root>
      <SafeAreaView style={{ flex: 1, height: "100%" }}>
        <View style={styles.topView}>
          <Image
            source={require("../assets/khalti.png")}
            style={styles.image}
          />
          <View
            style={{
              flexDirection: "row",
              width: "90%",
              justifyContent: "center",
              paddingHorizontal: 10,
            }}
          >
            <MaterialCommunityIcons name="charity" size={40} color="#4d286d" />
            <Text
              style={{
                color: "#4d286d",
                marginBottom: 20,
                fontSize: 16,
                fontWeight: "600",
              }}
            >
              Support Us By Donating Small Amount With Khalti
            </Text>
          </View>
        </View>
        <View style={styles.bottomView}>
          <Text
            style={{
              alignSelf: "flex-start",
              fontWeight: "600",
              fontSize: 15,
              marginLeft: 20,
              color: "#4d286d",
            }}
          >
            Amount For Donation
          </Text>
          <TextInput
            value={amount}
            onChangeText={(value) => donationAmountValue(value)}
            style={styles.textInput}
            placeholder="Amount in rupees"
            placeholderTextColor="grey"
          />
          <AppButton
            title="Donate With Khalti"
            style={{
              backgroundColor: "#4d286d",
              borderRadius: 8,
              width: "90%",
            }}
            onPress={() => handleDonation()}
          />
        </View>
        <Modal
          visible={phonePinModal}
          animationType="fade"
          transparent={true}
          style={{}}
        >
          <View style={styles.modalView}>
            <View
              style={{
                flexDirection: "row",
                padding: 20,
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{ color: "#4d286d", fontSize: 16, fontWeight: "700" }}
              >
                <Entypo
                  name="wallet"
                  size={20}
                  color="#4d286d"
                  style={{ marginLeft: 5 }}
                />
                {"  "}
                KHALTI WALLET
              </Text>
              <Text
                onPress={() => setPhonePinModal(false)}
                style={{ color: "#4d286d", fontSize: 18, fontWeight: "700" }}
              >
                X
              </Text>
            </View>
            <View
              style={{ width: "100%", height: 2, backgroundColor: "#4d286d" }}
            />

            <ScrollView
              contentContainerStyle={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../assets/khalti.png")}
                style={[styles.image, { width: 100, height: 100 }]}
              />
              <Text
                style={{
                  alignSelf: "flex-start",
                  fontWeight: "600",
                  fontSize: 15,
                  marginLeft: 20,
                  color: "#4d286d",
                }}
              >
                Khalti Mobile Number
              </Text>
              <TextInput
                value={mobileNumber}
                onChangeText={(value) => mobileNumberValue(value)}
                style={[styles.textInput, { height: 40, borderWidth: 2 }]}
                placeholder="Enter Khalti registered number"
                keyboardType="numeric"
                maxLength={10}
              />
              <Text
                style={{
                  alignSelf: "flex-start",
                  fontWeight: "600",
                  fontSize: 15,
                  marginLeft: 20,
                  color: "#4d286d",
                }}
              >
                Khalti Pin
              </Text>
              <TextInput
                value={khaltiPin}
                onChangeText={(value) => khaltiPinValue(value)}
                style={[styles.textInput, { height: 40, borderWidth: 2 }]}
                placeholder="Khalti pin"
                keyboardType="numeric"
                maxLength={4}
                secureTextEntry={true}
              />

              <AppButton
                title={`Donate Rs ${amount}/-`}
                style={{ backgroundColor: "#4d286d", borderRadius: 5 }}
                onPress={() => handleKhalti()}
              />
            </ScrollView>
          </View>
        </Modal>

        <Modal
          visible={otpModalVisible}
          animationType="fade"
          transparent={true}
        >
          <View style={styles.modalView}>
            <View
              style={{
                flexDirection: "row",
                padding: 20,
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{ color: "#4d286d", fontSize: 16, fontWeight: "700" }}
              >
                <Entypo
                  name="wallet"
                  size={20}
                  color="#4d286d"
                  style={{ marginLeft: 5 }}
                />
                {"  "}
                KHALTI WALLET
              </Text>
              <Text
                onPress={() => setOtpModalVisible(false)}
                style={{ color: "#4d286d", fontSize: 18, fontWeight: "700" }}
              >
                X
              </Text>
            </View>
            <View
              style={{ width: "100%", height: 2, backgroundColor: "#4d286d" }}
            />

            <ScrollView
              contentContainerStyle={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../assets/khalti.png")}
                style={[styles.image, { width: 100, height: 100 }]}
              />
              <Text
                style={{
                  alignSelf: "flex-start",
                  fontWeight: "600",
                  fontSize: 15,
                  marginLeft: 20,
                  color: "#4d286d",
                }}
              >
                Confirmation Code
              </Text>
              <TextInput
                value={otp}
                onChangeText={(value) => setOtp(value)}
                style={[styles.textInput, { height: 40, borderWidth: 2 }]}
                placeholder="Enter Confirmation Code (OTP)"
                keyboardType="numeric"
                maxLength={6}
              />
              <AppButton
                title={`Donate Rs ${amount}/-`}
                style={{ backgroundColor: "#4d286d", borderRadius: 5 }}
                onPress={() => handlePayment()}
              />
              <Text
                style={{
                  fontWeight: "400",
                  fontSize: 15,
                  color: "grey",
                }}
              >
                <MaterialCommunityIcons
                  name="information-outline"
                  size={20}
                  color="grey"
                />{" "}
                Enter the Confirmation code (OTP) you{"     "}received on your
                phone number and email
              </Text>
            </ScrollView>
          </View>
        </Modal>
      </SafeAreaView>
    </Root>
  );
}
const styles = StyleSheet.create({
  textInput: {
    height: 50,
    borderWidth: 2,
    margin: 10,
    width: "90%",
    borderRadius: 5,
    padding: 10,
    borderColor: "#4d286d",
  },
  image: {
    //flex: 1,
    width: 250,
    height: 250,
    resizeMode: "contain",
  },
  topView: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  bottomView: {
    flex: 1,
    alignItems: "center",
    flexGrow: 1,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  modalView: {
    marginTop: Dimensions.get("window").height / 5,
    height: Dimensions.get("window").height / 2,
    backgroundColor: "white",
    width: "90%",
    alignSelf: "center",
    borderRadius: 10,
    shadowColor: "grey",
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: {
      height: -5,
      width: 5,
    },
  },
});

export default PaymentScreen;
