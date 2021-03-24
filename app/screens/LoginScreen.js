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
  BackHandler,
} from "react-native";
import Constants from "expo-constants";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import AppButton from "../components/AppButton";
import colors from "../config/colors";
import AuthContext from "../auth/context";
import baseUrl from "../config/baseUrl";

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
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const authContext = useContext(AuthContext);

  const clearTextState = () => {
    setFirstName("");
    setLastName("");
    setAddress("");
    setEmailAddress("");
    setPassword("");
  };

  const handleSignup = () => {
    setSignupModalVisible(!signupModalVisible);
  };

  const handleRegister = () => {
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
        emailAddress: emailAddress,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === false) {
          alert(JSON.stringify(responseJson.message));
        } else if (responseJson.status === true) {
          clearTextState();
          setSignupModalVisible(false);
          setFinalSetup(false);
          alert(JSON.stringify(responseJson.message));
        }
      });
  };

  const handleLogin = () => {
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
          authContext.setUser(user);
        } else if (responseJson.status === false) {
          Alert.alert(responseJson.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Text
          style={{
            color: "#770001",
            fontSize: 30,
            fontWeight: "bold",
            marginLeft: Platform.OS === "android" ? 35 : 35,
            marginTop: 20,
            marginBottom: -20,
          }}
        >
          Welcome to Blood Network!
        </Text>

        <View style={{ width: "100%", marginTop: -30 }}>
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 80,
            }}
          >
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Username, Email</Text>
              <TextInput
                style={styles.textInput}
                autoCapitalize="none"
                placeholder="Email, Username or number"
                keyboardType="email-address"
                clearButtonMode="always"
                onChangeText={(userAddress) => setUserAddress(userAddress)}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.textInput}
                autoCapitalize="none"
                placeholder="Password"
                maxLength={16}
                secureTextEntry={true}
                onChangeText={(userPassword) => setUserPassword(userPassword)}
              />
            </View>
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

          <View style={styles.signup}>
            <Text>Don't have a account? </Text>
            <TouchableOpacity onPress={handleSignup}>
              <Text style={{ color: "#000", fontWeight: "bold" }}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

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
              onPress={() => setForgotPassWordModal(false)}
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
              Enter Your Phone no. or Email and we will send you code to reset
              your password.
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
              Email, Mobile number
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
              autoCapitalize="none"
              placeholder="Email or Mobile number"
              keyboardType="email-address"
              clearButtonMode="always"
            />
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
              onPress={() => setPasswordCodeModal(true)}
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
                autoCapitalize="none"
                placeholder="Code"
                keyboardType="numeric"
                clearButtonMode="never"
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
                onPress={() => setPasswordResetModal(true)}
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
              />

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
              />

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
                  onPress={() => {
                    Alert.alert(
                      "Password Changed",
                      "Password has been changed sucessfully",
                      [
                        {
                          text: "OK",
                          onPress: () => {
                            setForgotPassWordModal(false);
                            setPasswordCodeModal(false);
                            setPasswordResetModal(false);
                          },
                        },
                      ]
                    );
                  }}
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
                onChangeText={(firstName) => setFirstName(firstName)}
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
                onChangeText={(lastName) => setLastName(lastName)}
                style={{
                  width: "40%",
                  borderWidth: 1,
                  height: 40,
                  borderRadius: 10,
                  padding: 5,
                }}
              />
            </View>

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
                onChangeText={(address) => setAddress(address)}
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
              <AppButton
                title="Next"
                style={{
                  backgroundColor: colors.blood,
                  alignSelf: "center",
                  borderRadius: 10,
                }}
                onPress={() => setFinalSetup(true)}
              />
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
                onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
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
                onChangeText={(password) => setPassword(password)}
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
    backgroundColor: "#FFFFFF",
    flex: 1,
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
