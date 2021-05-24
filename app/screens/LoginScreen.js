import React, { useState, useContext } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Text,
  View,
  Platform,
  TouchableOpacity,
  Modal,
  Alert,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import Constants from "expo-constants";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import AppButton from "../components/AppButton";
import colors from "../config/colors";
import AuthContext from "../auth/context";
import baseUrl from "../config/baseUrl";
import PickerComponent from "../components/PickerComponent";
import authStorage from "../auth/storage";

export const districts = [
  { label: "Kavrepalanchok", value: "loc1" },
  { label: "Kaski", value: "loc2" },
  { label: "Chitwan", value: "loc3" },
  { label: "Dang", value: "loc4" },
  { label: "Bara", value: "loc5" },
  { label: "Bhaktapur", value: "loc6" },
  { label: "Lalitpur", value: "loc7" },
  { label: "Mustang", value: "loc8" },
  { label: "Manang", value: "loc9" },
  { label: "Palpa", value: "loc10" },
  { label: "Butwal", value: "loc11" },
  { label: "Mugu", value: "loc12" },
  { label: "Dolpa", value: "loct13" },
  { label: "Ilam", value: "loc14" },
  { label: "Parsa", value: "loc15" },
  { label: "Arghakhanchi", value: "loc16" },
];

function LoginScreen({ navigation }) {
  const [userAddress, setUserAddress] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [forgotPasswordModal, setForgotPassWordModal] = useState(false);
  const [passwordCodeModal, setPasswordCodeModal] = useState(false);
  const [passwordResetModal, setPasswordResetModal] = useState(false);
  const [signupModalVisible, setSignupModalVisible] = useState(false);
  const [finalSetup, setFinalSetup] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [resetPassword, setResetPassword] = useState("");
  const [resetConfirmPassword, setConfirmResetPassword] = useState("");

  const [errors, setErrors] = useState({
    errorMail: false,
    errorPassword: false,
    errorSubmission: false,
    errorFirstName: false,
    errorLastName: false,
    errorAddress: false,
    errorRegEmail: false,
    errorPassowrd: false,
    errorResetEmail: false,
    errorResetPw: false,
    errorResetConfPw: false,
    errorRegPw: false,
    errorRegConfPw: false,
    msgRegPw: "",
    msgRegConfPw: "",
    resetPwMsg: "",
    resetConfPwMsg: "",
    mailErrorMsg: "",
    pwErrorMsg: "",
    submissionMsg: "",
    firstSubError: false,
    resetMailError: "",
    regEmailMessage: "",
  });

  const authContext = useContext(AuthContext);

  const clearTextState = () => {
    setFirstName("");
    setLastName("");
    setAddress("");
    setEmailAddress("");
    setPassword("");
    setDistrict("");
  };

  const handleSignup = () => {
    clearTextState();
    setSignupModalVisible(!signupModalVisible);
    setErrors({
      ...errors,
      errorMail: false,
      errorSubmission: false,
      errorPassword: false,
    });
  };
  const checkFirstName = (val) => {
    if (!val) {
      setErrors({ ...errors, errorFirstName: true });
    } else if (val.length < 2 || val.length > 25) {
      setErrors({ ...errors, errorFirstName: true });
    } else {
      setFirstName(val);
      setErrors({ ...errors, errorFirstName: false });
    }
  };

  const checkLastName = (val) => {
    if (!val) {
      setErrors({ ...errors, errorLastName: true });
    } else if (val.length < 2 || val.length > 25) {
      setErrors({ ...errors, errorLastName: true });
    } else {
      setLastName(val);
      setErrors({ ...errors, errorLastName: false });
    }
  };

  const checkAddress = (val) => {
    if (!val) {
      setErrors({ ...errors, errorAddress: true });
    } else if (val.length < 2 || val.length > 70) {
      setErrors({ ...errors, errorAddress: true });
    } else {
      setAddress(val);
      setErrors({ ...errors, errorAddress: false });
    }
  };

  const emailCheck = (val) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (val === "" || val === undefined || val === null) {
      setErrors({
        ...errors,
        errorMail: true,
        mailErrorMsg: "Email missing! Please enter a valid email",
      });
    } else if (val.length < 2) {
      setErrors({
        ...errors,
        errorMail: true,
        mailErrorMsg: "Email length can't be less than 2",
      });
    } else if (reg.test(val) === false) {
      setErrors({
        ...errors,
        errorMail: true,
        mailErrorMsg: "*Email seems to be invalid",
      });
    } else {
      setErrors({
        ...errors,
        errorMail: false,
      });
      setUserAddress(val);
    }
  };

  const passwordCheck = (val) => {
    if (val.length < 8 || val.length > 16) {
      setErrors({
        ...errors,
        errorPassword: true,
        pwErrorMsg: "Password length must be between 8-16 digits",
      });
    } else {
      setErrors({
        ...errors,
        errorPassword: false,
      });
      setUserPassword(val);
    }
  };

  const handleRegister = () => {
    if (errors.errorRegPw || errors.errorResetConfPw) {
      Alert.alert("Cannot proceed for registration with invalid details");
    } else if (password != confirmPassword) {
      console.log(password, "+", confirmPassword);
      Alert.alert("Password and Confirm Password doesn't match!");
    } else {
      fetch(`${baseUrl.url}/api/register`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          address: address,
          userDistrict: district,
          emailAddress: emailAddress,
          password: password,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.status == false) {
            console.log(responseJson);
            alert(responseJson.message);
          } else if (responseJson.status === true) {
            Alert.alert("Email has been sent for verification");
            setTimeout(() => {
              clearTextState();
              setSignupModalVisible(false);
              setFinalSetup(false);
            }, 3000);
          }
        })
        .catch((error) => {
          Alert.alert("Failed to register user!");
        });
    }
  };

  const handleLogin = () => {
    if (errors.errorMail === true || errors.errorPassword === true) {
      setErrors({
        ...errors,
        errorSubmission: true,
        submissionMsg: "Invalid inputs, Please Try Again",
      });
    } else {
      setErrors({ ...errors, errorSubmission: false });
      fetch(`${baseUrl.url}/api/login_auth`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailAddress: userAddress,
          password: userPassword,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.status === true) {
            const user = responseJson.user;
            const jwt = responseJson.token;
            authContext.setUser(user);
            authStorage.storeToken(jwt);
          } else if (responseJson.status === false) {
            setErrors({
              ...errors,
              errorSubmission: true,
              submissionMsg: "Username and Password doesn't match",
            });
          }
        })
        .catch((error) => {
          Alert.alert("Error Logging In! \n Couldn't Connect to Server");
        });
    }
  };

  const checkResetEmail = (val) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (val === "" || val === undefined || val === null) {
      setErrors({
        ...errors,
        errorResetEmail: true,
        resetMailError: "Email missing! Please enter a valid email",
      });
    } else if (val.length < 2) {
      setErrors({
        ...errors,
        errorResetMail: true,
        resetMailError: "Email length can't be less than 2",
      });
    } else if (reg.test(val) === false) {
      setErrors({
        ...errors,
        errorResetMail: true,
        resetMailError: "*Email seems to be invalid",
      });
    } else {
      setErrors({
        ...errors,
        resetMailError: "",
        errorResetEmail: false,
      });
      setResetEmail(val);
    }
  };

  const checkResetCode = (val) => {
    setResetCode(val);
  };

  const checkResetPassword = (pw) => {
    if (pw == "" || pw == undefined || pw.length < 8 || pw.length > 16) {
      setErrors({
        ...errors,
        errorResetPw: true,
        resetPwMsg: "*Password seems to be invalid",
      });
    } else {
      setErrors({ ...errors, errorResetPw: false, resetPwMsg: "" });
      setResetPassword(pw);
    }
  };

  const checkResetConfirmPassword = (confirmPw) => {
    if (
      confirmPw == "" ||
      confirmPw == undefined ||
      confirmPw.length < 8 ||
      confirmPw.length > 16
    ) {
      setErrors({
        ...errors,
        errorResetConfPw: true,
        resetConfPwMsg: "*Confirm Password seems to be invalid",
      });
    } else {
      setErrors({ ...errors, errorResetConfPw: false, resetConfPwMsg: "" });
      setConfirmResetPassword(confirmPw);
    }
  };

  const handleNext = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (errors.errorResetEmail) {
      Alert.alert("Can't proceed to change password with incorrect email");
    } else if (reg.test(resetEmail) === false) {
      Alert.alert("Can't proceed to change password with incorrect email");
    } else {
      fetch(`${baseUrl.url}/api/login_auth/user/reset`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: resetEmail }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.status === "success") {
            //alert("Reset token sent");
            setPasswordCodeModal(true);
          } else {
            // console.log(
            //   responseJson.message[Object.keys(responseJson.message)[0]]
            // );
            Alert.alert(
              responseJson.message[Object.keys(responseJson.message)[0]]
            );
          }
        })
        .catch((error) => {
          Alert.alert("Something is wrong with server!");
        });
    }
  };

  const handleResetCodeSub = () => {
    if (resetCode.length == 6) {
      fetch(`${baseUrl.url}/api/login_auth/user/reset/check_token`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: resetEmail, token: resetCode }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.status === "success") {
            //alert("Reset token sent");
            console.log(responseJson);
            setPasswordResetModal(true);
          } else {
            alert("Token didn't match");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      Alert.alert("The pin for password reset is of 6-digits!");
    }
  };

  const handleResetPassword = () => {
    console.log(resetEmail);
    if (errors.errorResetConfPw || errors.errorResetPw) {
      Alert.alert("Can't proceed to change password with invalid inputs!");
    } else if (resetPassword !== resetConfirmPassword) {
      Alert.alert("Password and confirm password doesn't match");
    } else {
      fetch(`${baseUrl.url}/api/login_auth/user/reset/change_password`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: resetPassword,
          email: resetEmail,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.status === "success") {
            alert("Password changed successfully!");
            setTimeout(() => {
              setForgotPassWordModal(false);
              setPasswordCodeModal(false);
              setPasswordResetModal(false);
            }, 2000);
          } else {
            alert("Something went wrong while changing the password");
          }
        })
        .catch((error) => {
          alert("Something went wrong");
        });
    }
  };

  // const emailError = (val) => {
  //   let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  //   if (reg.test(val) === false) {
  //     setErrors({
  //       ...errors,
  //       errorResetMail: true,
  //       resetMailError: "*Email seems to be invalid",
  //     });
  //   }
  // };
  const checkRegistrationEmail = (val) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(val) === false) {
      setErrors({
        ...errors,
        errorRegEmail: true,
        regEmailMessage: "*Email seems to be invalid",
      });
    } else {
      setErrors({
        ...errors,
        errorRegEmail: false,
        regEmailMessage: "",
      });
      setEmailAddress(val);
    }
  };

  const checkRegPassword = (val) => {
    if (val.length < 8 || val.length > 18 || val == "" || val == "undefined") {
      setErrors({
        ...errors,
        errorRegPw: true,
        msgRegPw: "Password must be between 8-16 characaters",
      });
    } else {
      setErrors({ ...errors, errorRegPw: false, msgRegPw: "" });
      setPassword(val);
    }
  };
  const checkRegConfPassword = (val) => {
    if (val.length < 8 || val.length > 18 || val == "" || val == "undefined") {
      setErrors({
        ...errors,
        errorRegConfPw: true,
        msgRegConfPw: "Password must be between 8-16 characaters",
      });
    } else {
      setErrors({ ...errors, errorRegConfPw: false, msgRegConfPw: "" });
      setConfirmPassword(val);
    }
  };
  return (
    <>
      <ScrollView style={styles.container}>
        <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
          <Image
            source={require("../assets/logo.png")}
            style={{ height: 180, width: 180, marginTop: 20 }}
          />
          <Text
            style={{
              position: "absolute",
              color: "#770001",
              fontSize: 40,
              fontWeight: "bold",
              left: 150,
              top: 60,
            }}
          >
            Blood
          </Text>
          <Text
            style={{
              position: "absolute",
              color: "#770001",
              fontSize: 40,
              fontWeight: "bold",
              left: 180,
              top: 100,
            }}
          >
            Network
          </Text>
        </View>

        <View style={{ width: "100%", marginTop: -110 }}>
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 80,
            }}
          >
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.textInput}
                autoCapitalize="none"
                placeholder="Email"
                keyboardType="email-address"
                clearButtonMode="always"
                onChangeText={(userAddress) => emailCheck(userAddress)}
                // onEndEditing={(e) => emailError(e.nativeEvent.text)}
              />
            </View>
            {errors.errorMail ? (
              <Text
                style={{
                  alignSelf: "flex-start",
                  marginLeft: 35,
                  color: "red",
                }}
              >
                <MaterialCommunityIcons
                  name="information-outline"
                  size={15}
                  style={{ marginLeft: 5 }}
                />{" "}
                {errors.mailErrorMsg}
              </Text>
            ) : null}

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.textInput}
                autoCapitalize="none"
                placeholder="Password"
                maxLength={16}
                secureTextEntry={true}
                onChangeText={(userPassword) => passwordCheck(userPassword)}
              />
            </View>
            {errors.errorPassword ? (
              <Text
                style={{
                  alignSelf: "flex-start",
                  marginLeft: 35,
                  color: "red",
                  marginBottom: 5,
                }}
              >
                <MaterialCommunityIcons
                  name="information-outline"
                  size={15}
                  style={{ marginLeft: 5 }}
                />{" "}
                {errors.pwErrorMsg}
              </Text>
            ) : null}
          </View>

          <View
            style={{
              marginTop: -80,
              width: "100%",
              height: 50,
              marginLeft: Platform.OS === "ios" ? 220 : 250,
            }}
          >
            <Text
              style={{
                color: "red",
                fontSize: 15,
                fontWeight: "500",
                marginTop: 5,
              }}
              onPress={() => setForgotPassWordModal(true)}
            >
              Forgot Password?
            </Text>
          </View>

          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              marginTop: -10,
            }}
          >
            <AppButton title="Login" onPress={handleLogin} />
          </View>
          {errors.errorSubmission ? (
            <Text
              style={{
                alignSelf: "flex-start",
                marginLeft: 35,
                color: "red",
                marginBottom: 10,
              }}
            >
              <Entypo
                name="circle-with-cross"
                size={15}
                style={{ marginLeft: 5 }}
              />{" "}
              {errors.submissionMsg}
            </Text>
          ) : null}

          <View style={styles.signup}>
            <Text>Don't have a account? </Text>
            <TouchableOpacity onPress={handleSignup}>
              <Text style={{ color: "#000", fontWeight: "bold" }}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <Modal
        visible={forgotPasswordModal}
        animationType="slide"
        style={{ backgroundColor: "#f2f2f2" }}
      >
        <View style={styles.passwordModal}>
          <View
            style={{
              flexDirection: "row",
              marginTop: 20,
              marginLeft: 10,
              marginBottom: 5,
            }}
          >
            <Text
              style={{ fontSize: 25, fontWeight: "bold", color: colors.blood }}
            >
              Forgot Password?
            </Text>
            <Text
              onPress={() => {
                setForgotPassWordModal(false);
                setErrors({
                  ...errors,
                  resetMailError: "",
                  errorResetEmail: false,
                });
              }}
              style={styles.closeIcon}
            >
              X
            </Text>
          </View>
          <View
            style={{ width: "100%", backgroundColor: colors.blood, height: 1 }}
          />
          <View style={styles.forgotContainer}>
            <MaterialCommunityIcons
              name={"account-lock"}
              size={150}
              color={colors.blood}
              style={{ marginLeft: 80 }}
            />
            <Text
              style={{
                fontFamily: Platform.OS === "ios" ? "Avenir" : "Roboto",
                fontSize: 18,
                fontWeight: "800",
                fontSize: 20,
                marginLeft: "23%",
                marginBottom: 20,
              }}
            >
              Trouble Logging In?
            </Text>
            <Text
              style={{
                fontFamily: Platform.OS === "ios" ? "Avenir" : "Roboto",
                fontSize: 18,
                fontWeight: "600",
                marginLeft: 10,
              }}
            >
              Enter Your Email and we will send you code to reset your password.
            </Text>
            <View
              style={{
                width: "100%",
                backgroundColor: colors.blood,
                height: 2,
                marginVertical: 10,
              }}
            />

            <Text style={[styles.label, { marginBottom: 10, marginTop: 20 }]}>
              Email
            </Text>
            <TextInput
              style={{
                borderRadius: 15,
                borderBottomWidth: 5,
                height: 40,
                width: "100%",
                fontSize: 18,
                paddingLeft: 30,
                borderBottomColor: colors.blood,
                color: "#000",
              }}
              // onEndEditing={(e) => emailError(e.nativeEvent.text)}
              autoCapitalize="none"
              placeholder="Email"
              keyboardType="email-address"
              clearButtonMode="always"
              onChangeText={(email) => checkResetEmail(email)}
            />
            {errors.errorResetEmail ? (
              <Text
                style={{
                  alignSelf: "flex-start",
                  marginLeft: 20,
                  color: "red",
                  marginTop: 5,
                }}
              >
                <MaterialCommunityIcons
                  name="information-outline"
                  size={15}
                  style={{ marginLeft: 5 }}
                />{" "}
                {errors.resetMailError}
              </Text>
            ) : null}
          </View>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => setForgotPassWordModal(false)}
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginLeft: 20,
              }}
            >
              <MaterialCommunityIcons
                name={"chevron-left"}
                size={25}
                color={colors.blood}
              />
              <Text style={{ fontSize: 18, color: colors.blood }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flexDirection: "row", marginLeft: "50%" }}
              onPress={() => handleNext()}
            >
              <Text style={{ fontSize: 18, color: colors.blood }}>Next</Text>
              <MaterialCommunityIcons
                name={"chevron-right"}
                size={25}
                color={colors.blood}
              />
            </TouchableOpacity>
          </View>
        </View>

        <Modal visible={passwordCodeModal} animationType="fade">
          <View style={{ backgroundColor: "#f2f2f2", flex: 1 }}>
            <View style={styles.passwordModal}>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 20,
                  marginLeft: 10,
                  marginBottom: 5,
                }}
              >
                <Text
                  style={{
                    fontSize: 25,
                    fontWeight: "bold",
                    color: colors.blood,
                  }}
                >
                  Forgot Password?
                </Text>
                <Text
                  onPress={() => {
                    setPasswordCodeModal(false);
                    setForgotPassWordModal(false);
                  }}
                  style={styles.closeIcon}
                >
                  X
                </Text>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                backgroundColor: colors.blood,
                height: 1,
              }}
            />
            <View style={{ width: "100%" }}>
              <Entypo
                name={"water"}
                color={colors.blood}
                size={150}
                style={{ marginLeft: "30%", marginVertical: 20 }}
              />
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: Platform.OS === "ios" ? "Avenir" : "Roboto",
                  fontWeight: "bold",
                  marginLeft: "7%",
                  marginVertical: 20,
                }}
              >
                Please wait for few seconds. We sent you a code for password
                reset. Please enter the code below
              </Text>
              <TextInput
                style={{
                  marginLeft: "5%",
                  borderRadius: 15,
                  borderWidth: 5,
                  height: 50,
                  width: "90%",
                  fontSize: 18,
                  paddingLeft: 30,
                  borderBottomColor: colors.blood,
                  backgroundColor: "#f2f2f2",
                }}
                maxLength={6}
                autoCapitalize="none"
                placeholder="Code"
                keyboardType="numeric"
                clearButtonMode="never"
                onChangeText={(resetCode) => checkResetCode(resetCode)}
              />
            </View>

            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                onPress={() => setPasswordCodeModal(false)}
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginLeft: 20,
                  marginTop: 10,
                }}
              >
                <MaterialCommunityIcons
                  name={"chevron-left"}
                  size={25}
                  color={colors.blood}
                />
                <Text style={{ fontSize: 18, color: colors.blood }}>
                  Previous
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  marginLeft: "49%",
                  marginTop: 10,
                }}
                onPress={() => handleResetCodeSub()}
              >
                <Text style={{ fontSize: 18, color: colors.blood }}>Next</Text>
                <MaterialCommunityIcons
                  name={"chevron-right"}
                  size={25}
                  color={colors.blood}
                />
              </TouchableOpacity>
            </View>
          </View>

          <Modal visible={passwordResetModal} animationType="fade">
            <View style={{ backgroundColor: "#ffffff", flex: 1 }}>
              <View style={styles.passwordModal}>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 20,
                    marginLeft: 10,
                    marginBottom: 5,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 25,
                      fontWeight: "bold",
                      color: colors.blood,
                    }}
                  >
                    Forgot Password?
                  </Text>
                  <Text
                    onPress={() => {
                      setPasswordCodeModal(false);
                      setForgotPassWordModal(false);
                      setPasswordResetModal(false);
                    }}
                    style={styles.closeIcon}
                  >
                    X
                  </Text>
                </View>
                <View
                  style={{
                    width: "100%",
                    backgroundColor: colors.blood,
                    height: 2,
                    marginVertical: 10,
                  }}
                />
              </View>
              <Text style={styles.label}>New Password</Text>
              <TextInput
                style={{
                  marginLeft: "5%",
                  borderRadius: 15,
                  borderBottomWidth: 5,
                  height: 50,
                  width: "90%",
                  fontSize: 18,
                  paddingLeft: 30,
                  borderBottomColor: colors.blood,
                }}
                autoCapitalize="none"
                placeholder="New Password"
                placeholderTextColor="#a9a9a9"
                maxLength={16}
                secureTextEntry={true}
                onChangeText={(val) => {
                  checkResetPassword(val);
                }}
              />
              {errors.errorResetPw ? (
                <Text
                  style={{
                    alignSelf: "flex-start",
                    marginLeft: 20,
                    color: "red",
                    marginTop: 5,
                  }}
                >
                  <MaterialCommunityIcons
                    name="information-outline"
                    size={15}
                    style={{ marginLeft: 5 }}
                  />{" "}
                  {errors.resetPwMsg}
                </Text>
              ) : null}
              <Text style={styles.label}>Confirm Password</Text>
              <TextInput
                style={{
                  marginLeft: "5%",
                  borderRadius: 15,
                  borderBottomWidth: 5,
                  height: 50,
                  width: "90%",
                  fontSize: 18,
                  paddingLeft: 30,
                  borderBottomColor: colors.blood,
                }}
                autoCapitalize="none"
                placeholder="Confirm Password"
                placeholderTextColor="#a9a9a9"
                maxLength={16}
                secureTextEntry={true}
                onChangeText={(val) => {
                  checkResetConfirmPassword(val);
                }}
              />
              {errors.errorResetConfPw ? (
                <Text
                  style={{
                    alignSelf: "flex-start",
                    marginLeft: 20,
                    color: "red",
                    marginTop: 5,
                  }}
                >
                  <MaterialCommunityIcons
                    name="information-outline"
                    size={15}
                    style={{ marginLeft: 5 }}
                  />{" "}
                  {errors.resetConfPwMsg}
                </Text>
              ) : null}

              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  onPress={() => setPasswordResetModal(false)}
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginLeft: 20,
                    marginTop: 10,
                  }}
                >
                  <MaterialCommunityIcons
                    name={"chevron-left"}
                    size={25}
                    color={colors.blood}
                  />
                  <Text style={{ fontSize: 18, color: colors.blood }}>
                    Previous
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    marginLeft: "20%",
                    marginTop: 10,
                  }}
                  onPress={() => handleResetPassword()}
                >
                  <Text style={{ fontSize: 18, color: colors.blood }}>
                    Change Password
                  </Text>
                  <MaterialCommunityIcons
                    name={"chevron-right"}
                    size={25}
                    color={colors.blood}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </Modal>
      </Modal>

      <Modal visible={signupModalVisible} animationType="slide">
        <View style={{ backgroundColor: "#ffffff", flex: 1 }}>
          <View style={styles.passwordModal}>
            <View
              style={{
                flexDirection: "row",
                marginTop: 20,
                marginLeft: 10,
                marginBottom: 5,
              }}
            >
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: "bold",
                  color: colors.blood,
                }}
              >
                Sign Up
              </Text>
              <Text
                onPress={() => {
                  setSignupModalVisible(false);
                }}
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: colors.blood,
                  marginLeft: "65%",
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
                marginVertical: 10,
              }}
            />
          </View>

          <View style={{ paddingTop: 20 }}>
            <Text
              style={{
                alignSelf: "center",
                color: colors.blood,
                fontSize: 18,
                fontWeight: "700",
              }}
            >
              What's Your Name?
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
                paddingTop: 5,
              }}
            >
              <TextInput
                placeholder="First name"
                placeholderTextColor="#a9a9a9"
                clearButtonMode="always"
                autoCapitalize="none"
                onChangeText={(firstName) => checkFirstName(firstName)}
                style={{
                  width: "40%",
                  borderWidth: 1,
                  height: 40,
                  borderRadius: 10,
                  padding: 5,
                }}
              />
              <TextInput
                placeholder="Last name"
                clearButtonMode="always"
                autoCapitalize="none"
                onChangeText={(lastName) => checkLastName(lastName)}
                style={{
                  width: "40%",
                  borderWidth: 1,
                  height: 40,
                  borderRadius: 10,
                  padding: 5,
                }}
              />
            </View>

            {errors.errorFirstName || errors.errorLastName ? (
              <Text
                style={{
                  alignSelf: "flex-start",
                  color: "red",
                  marginLeft: 30,
                  marginTop: 10,
                }}
              >
                *First Name/Last Name are required
                {"\n"}
                They can't exceed 25 characters
              </Text>
            ) : null}

            <View>
              <Text
                style={{
                  alignSelf: "center",
                  color: colors.blood,
                  fontSize: 18,
                  fontWeight: "700",
                  marginTop: 20,
                }}
              >
                What's Your Address?
              </Text>
              <TextInput
                placeholder="Address"
                clearButtonMode="always"
                autoCapitalize="none"
                onChangeText={(address) => checkAddress(address)}
                style={{
                  alignSelf: "center",
                  width: "90%",
                  borderWidth: 1,
                  height: 40,
                  borderRadius: 10,
                  padding: 5,
                  marginVertical: 10,
                }}
              />

              {errors.errorAddress ? (
                <Text
                  style={{
                    alignSelf: "flex-start",
                    color: "red",
                    marginLeft: 30,
                    marginTop: 5,
                  }}
                >
                  *Address is required
                  {"\n"}
                  They can't exceed 70 characters
                </Text>
              ) : null}

              <Text
                style={{
                  alignSelf: "center",
                  color: colors.blood,
                  fontSize: 18,
                  fontWeight: "700",
                  marginTop: 20,
                }}
              >
                What's Your District?
              </Text>
              <PickerComponent
                selectedItem={district}
                onSelectedItem={(item) => setDistrict(item.label)}
                title="Choose a District"
                items={districts}
                style={{
                  marginLeft: 20,
                  width: "90%",
                  height: 50,
                  marginVertical: 10,
                }}
              />
              <AppButton
                title="Next"
                style={{
                  backgroundColor: colors.blood,
                  alignSelf: "center",
                  borderRadius: 10,
                }}
                onPress={() => {
                  if (
                    errors.errorFirstName == true ||
                    errors.errorLastName == true ||
                    errors.errorAddress == true
                  ) {
                    setErrors({ ...errors, firstSubError: true });
                  } else if (!firstName || !lastName || !address) {
                    setErrors({ ...errors, firstSubError: true });
                  } else if (district == "") {
                    Alert.alert("You forgot to choose your district");
                  } else {
                    setFinalSetup(true);
                  }
                }}
              />
              {errors.firstSubError ? (
                <Text
                  style={{
                    alignSelf: "flex-start",
                    color: "red",
                    marginLeft: 30,
                    marginTop: -5,
                    marginBottom: 10,
                  }}
                >
                  <MaterialCommunityIcons
                    name="information-outline"
                    size={15}
                    style={{ marginLeft: 5 }}
                  />{" "}
                  Invalid Inputs! Please try again
                </Text>
              ) : null}
              <View style={{ flexDirection: "row", marginLeft: "17%" }}>
                <Text style={{ fontSize: 16, fontWeight: "400" }}>
                  Already have an account?
                </Text>
                <Text
                  style={{ fontSize: 16, fontWeight: "bold", marginLeft: 10 }}
                  onPress={() => setSignupModalVisible(!signupModalVisible)}
                >
                  Log In
                </Text>
              </View>
            </View>
          </View>
        </View>

        <Modal visible={finalSetup} animationType="fade">
          <View style={{ backgroundColor: "#fff", flex: 1 }}>
            <View style={styles.passwordModal}>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 20,
                  marginLeft: 10,
                  marginBottom: 5,
                }}
              >
                <MaterialCommunityIcons
                  name={"chevron-left"}
                  size={30}
                  color={colors.blood}
                  style={{ alignSelf: "center" }}
                  onPress={() => setFinalSetup(false)}
                />
                <Text
                  style={{
                    fontSize: 25,
                    fontWeight: "bold",
                    color: colors.blood,
                  }}
                >
                  Sign Up
                </Text>
                <Text
                  onPress={() => {
                    setSignupModalVisible(false);
                    setFinalSetup(false);
                  }}
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    color: colors.blood,
                    marginLeft: "58%",
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
                  marginVertical: 10,
                }}
              />
              <Text
                style={{
                  alignSelf: "center",
                  color: colors.blood,
                  fontSize: 18,
                  fontWeight: "700",
                  marginTop: 20,
                }}
              >
                What's Your Email Address?
              </Text>
              <TextInput
                placeholder="Email Address"
                placeholderTextColor="#a9a9a9"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={(emailAddress) =>
                  checkRegistrationEmail(emailAddress)
                }
                style={{
                  alignSelf: "center",
                  width: "90%",
                  borderWidth: 1,
                  height: 40,
                  borderRadius: 10,
                  padding: 5,
                  marginVertical: 10,
                }}
              />
              {errors.errorRegEmail ? (
                <Text
                  style={{
                    alignSelf: "flex-start",
                    color: "red",
                    marginLeft: 30,
                    marginTop: -5,
                    marginBottom: 10,
                  }}
                >
                  <MaterialCommunityIcons
                    name="information-outline"
                    size={15}
                    style={{ marginLeft: 5 }}
                  />{" "}
                  {errors.regEmailMessage}
                </Text>
              ) : null}
              <Text
                style={{
                  alignSelf: "center",
                  color: colors.blood,
                  fontSize: 18,
                  fontWeight: "700",
                  marginTop: 10,
                }}
              >
                Set Password
              </Text>
              <TextInput
                placeholder="Password"
                placeholderTextColor="#a9a9a9"
                keyboardType="email-address"
                autoCapitalize="none"
                secureTextEntry={true}
                onChangeText={(password) => checkRegPassword(password)}
                style={{
                  alignSelf: "center",
                  width: "90%",
                  borderWidth: 1,
                  height: 40,
                  borderRadius: 10,
                  padding: 5,
                  marginVertical: 10,
                }}
              />
              {errors.errorRegPw ? (
                <Text
                  style={{
                    alignSelf: "flex-start",
                    color: "red",
                    marginLeft: 30,
                    marginTop: -5,
                    marginBottom: 10,
                  }}
                >
                  <MaterialCommunityIcons
                    name="information-outline"
                    size={15}
                    style={{ marginLeft: 5 }}
                  />{" "}
                  {errors.msgRegPw}
                </Text>
              ) : null}
              <Text
                style={{
                  alignSelf: "center",
                  color: colors.blood,
                  fontSize: 18,
                  fontWeight: "700",
                  marginTop: 10,
                }}
              >
                Confirm Password
              </Text>
              <TextInput
                placeholder="Confirm Password"
                placeholderTextColor="#a9a9a9"
                keyboardType="email-address"
                autoCapitalize="none"
                secureTextEntry={true}
                onChangeText={(val) => checkRegConfPassword(val)}
                style={{
                  alignSelf: "center",
                  width: "90%",
                  borderWidth: 1,
                  height: 40,
                  borderRadius: 10,
                  padding: 5,
                  marginVertical: 10,
                }}
              />
              {errors.errorRegConfPw ? (
                <Text
                  style={{
                    alignSelf: "flex-start",
                    color: "red",
                    marginLeft: 30,
                    marginTop: -5,
                    marginBottom: 10,
                  }}
                >
                  <MaterialCommunityIcons
                    name="information-outline"
                    size={15}
                    style={{ marginLeft: 5 }}
                  />{" "}
                  {errors.msgRegConfPw}
                </Text>
              ) : null}
              <AppButton
                title="Register & Get Started"
                style={{ backgroundColor: colors.blood, alignSelf: "center" }}
                onPress={handleRegister}
              />

              <View style={{ flexDirection: "row", marginLeft: "17%" }}>
                <Text style={{ fontSize: 16, fontWeight: "400" }}>
                  Already have an account?
                </Text>
                <Text
                  style={{ fontSize: 16, fontWeight: "bold", marginLeft: 10 }}
                  onPress={() => {
                    setSignupModalVisible(!signupModalVisible);
                    setFinalSetup(!finalSetup);
                  }}
                >
                  Log In
                </Text>
              </View>
            </View>
          </View>
        </Modal>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f2f7f9",
    flex: 1,
    paddingTop: Dimensions.get("window").height / 9,
    // justifyContent: "center",
    // alignItems: "center",
    // alignContent: "center"
  },
  textInput: {
    borderRadius: 25,
    borderBottomWidth: 1,
    height: 40,
    width: "90%",
    fontSize: 18,
    paddingLeft: 20,
    color: "#a9a9a9",
  },
  text: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#dc143c",
  },
  inputContainer: {
    width: "100%",
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    fontWeight: "600",
    alignSelf: "flex-start",
    marginLeft: 30,
    marginTop: 20,
  },
  signup: {
    justifyContent: "center",
    flexDirection: "row",
  },
  passwordModal: {
    paddingTop: Constants.statusBarHeight,
    width: "100%",
  },
  closeIcon: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.blood,
    marginLeft: 120,
  },
  forgotContainer: {
    padding: 20,
    width: "100%",
    // justifyContent: 'center',
    // alignItems: 'center'
  },
});
export default LoginScreen;
