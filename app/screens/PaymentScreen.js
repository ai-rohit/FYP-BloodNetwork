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
  KeyboardAvoidingView,
} from "react-native";
import { WebView } from "react-native-webview";
import * as ScreenOrientation from "expo-screen-orientation";
import AppButton from "../components/AppButton";
import colors from "../config/colors";
import baseUrl from "../config/baseUrl";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import { Root, Popup } from "popup-ui";
import Progress from "../components/Progress";

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
  const [progress, setProgress] = useState({
    progress: false,
    progressMessage: true,
  });

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
    if (amount == "" || amount == undefined) {
      Alert.alert("Please provide the amount you want to donate");
    } else if (parseInt(amount) < 10) {
      Alert.alert("Sorry, khalti won't process with amount less than Rs. 10");
    } else if (parseInt(amount) > 1000) {
      Alert.alert("We accept donation only upto Rs. 1000");
    } else if (amount.indexOf(" ") > 0) {
      Alert.alert("We can't accept white space in amount!");
    } else {
      setPhonePinModal(true);
    }
  };
  const handleKhalti = () => {
    console.log(mobileNumber, khaltiPin);
    if (
      mobileNumber == "" ||
      mobileNumber == undefined ||
      khaltiPin == "" ||
      khaltiPin == undefined
    ) {
      Alert.alert("Mobile number or pin seems to be missing");
    } else if (khaltiPin.length != 4) {
      Alert.alert("Khalti pin should be of 4 digits!");
    } else if (mobileNumber.length != 10) {
      Alert.alert("Incorrect mobile number");
    } else {
      setProgress({
        progress: true,
        progressMessage: "Getting OTP from Khalit",
      });
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
          product_identity: "bloodnetwork/id-100",
          product_name: "A donation to bloodnetwork",
          product_url: "http://localhost:3000/admin",
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          if (responseJson.token) {
            setToken(responseJson.token);
            setPhonePinModal(false);
            setProgress({ progress: false, progressMessage: "" });
            setOtpModalVisible(true);
          } else {
            setProgress({ progress: false, progressMessage: "" });
            Alert.alert(responseJson.detail);
          }
        })
        .catch((error) => {
          setProgress({ progress: false, progressMessage: "" });
          Alert.alert(
            "Your internet connection seems down! Please try again later."
          );
        });
    }
  };

  const handlePayment = () => {
    if (otp == "" || otp == undefined) {
      Alert.alert("Please enter otp to continue");
    } else if (otp.length != 6) {
      Alert.alert("OTP must be of 6 digits");
    } else {
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
                Alert.alert("Payment not verified");
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
    }
  };

  const clearState = () => {
    setMobileNumber("");
    setKhaltiPin("");
    setAmount("");
    setOtp("");
    setToken("");
  };
  if (progress.progress) {
    return <Progress progressMessage={progress.progressMessage} />;
  } else {
    return (
      <Root>
        <KeyboardAvoidingView style={{ flex: 1, height: "100%" }}>
          <KeyboardAvoidingView style={styles.topView}>
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
              <MaterialCommunityIcons
                name="charity"
                size={40}
                color="#4d286d"
              />
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
          </KeyboardAvoidingView>
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
              keyboardType="numeric"
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
        </KeyboardAvoidingView>
      </Root>
    );
  }
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
