import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  Modal,
  Button,
  FlatList,
  Switch,
  TouchableHighlight,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { RadioButton } from "react-native-paper";
import {} from "react-native-gesture-handler";
import PickerComponent from "../components/PickerComponent";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import AppButton from "../components/AppButton";
import colors from "../config/colors";
import baseUrl from "../config/baseUrl";
import { Popup } from "popup-ui";
import { add } from "react-native-reanimated";
import Progress from "../components/Progress";
import blood from "../config/blood";
import donationTypes from "../config/donationType";

const districts = [
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
  { label: "Bhojpur", value: "loc17" },
  { label: "Dhankuta", value: "loc18" },
  { label: "Jhapa", value: "loc19" },
  { label: "Khotang", value: "loc20" },
  { label: "Morang", value: "loc21" },
  { label: "Okhaldhunga", value: "loc22" },
  { label: "Panchthar", value: "loc23" },
  { label: "Sankhuwasabha", value: "loc24" },
  { label: "Sunsari", value: "loc25" },
  { label: "Taplejung", value: "loc26" },
  { label: "Tehrathum", value: "loc27" },
  { label: "Udayapur", value: "loc28" },
  { label: "Rautahat", value: "loc29" },
  { label: "Sarlahi", value: "loc30" },
  { label: "Dhanusha", value: "loc31" },
  { label: "Siraha", value: "loc32" },
  { label: "Mahottari", value: "loc33" },
  { label: "Saptari", value: "loc34" },
  { label: "Sindhuli", value: "loc35" },
  { label: "Ramechhap", value: "loc36" },
  { label: "Dolakha", value: "loc37" },
  { label: "Dhading", value: "loc38" },
  { label: "Nuwakot", value: "loc39" },
  { label: "Rasuwa", value: "loc40" },
  { label: "Sindhupalchok", value: "loc41" },
  { label: "Makwanpur", value: "loc42" },
  { label: "Baglung", value: "loc43" },
  { label: "Gorkha", value: "loc44" },
  { label: "Myagdi", value: "loc45" },
  { label: "Nawalpur", value: "loc46" },
  { label: "Parbat", value: "loc47" },
  { label: "Syangja", value: "loc48" },
  { label: "Tanahun", value: "loc49" },
  { label: "Kapilvastu", value: "loc50" },
  { label: "Parasi", value: "loc51" },
  { label: "Rupandehi", value: "loc52" },
  { label: "Gulmi", value: "loc53" },
  { label: "Dang", value: "loc54" },
  { label: "Pyuthan", value: "loc55" },
  { label: "Rolpa", value: "loc56" },
  { label: "Eastern Rukum", value: "loc57" },
  { label: "Banke", value: "loc58" },
  { label: "Bardiya", value: "loc59" },
  { label: "Salyan", value: "loc60" },
  { label: "Humla", value: "loc61" },
  { label: "Jumla", value: "loc62" },
  { label: "Kalikot", value: "loc63" },
  { label: "Surkhet", value: "loc64" },
  { label: "Dailekh", value: "loc65" },
  { label: "Jajarkot", value: "loc66" },
  { label: "Kailali", value: "loc67" },
  { label: "Achham", value: "loc68" },
  { label: "Doti", value: "loc69" },
  { label: "Bajhang", value: "loc70" },
  { label: "Bajura", value: "loc71" },
  { label: "Kanchanpur", value: "loc72" },
  { label: "Dadeldhura", value: "loc73" },
  { label: "Baitadi", value: "loc74" },
  { label: "Darchula", value: "loc75" },
];

const provinces = [
  { label: "Province No.1", value: "prov1" },
  { label: "Province No.2", value: "prov2" },
  { label: "Bagmati", value: "prov3" },
  { label: "Gandaki", value: "prov4" },
  { label: "Lumbini", value: "prov5" },
  { label: "Karnali", value: "prov6" },
  { label: "Sudurpashchim", value: "prov7" },
];

const bloodGroups = [
  { label: "O+", value: "bld1" },
  { label: "A+", value: "bld2" },
  { label: "A-", value: "bld3" },
  { label: "O-", value: "bld4" },
  { label: "B+", value: "bld5" },
  { label: "B-", value: "bld6" },
  { label: "AB+", value: "bld7" },
  { label: "AB-", value: "bld8" },
];

function BecomeDonor({ title }) {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [address, setAddress] = useState();
  const [district, setDistrict] = useState();
  const [province, setProvince] = useState();
  const [contact, setContact] = useState();
  const [bloodGroup, setBloodGroup] = useState();
  const [checkedGender, setCheckedGender] = useState();
  const [date, setDate] = useState();
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [displayContact, setDisplayContact] = useState(false);
  const [progress, setProgress] = useState({
    progress: false,
    progressMessage: "",
  });
  const [errors, setErrors] = useState({
    errorFirstName: false,
    errorLastName: false,
    errorAddress: false,
    errorMobileNum: false,
    fNameMsg: "",
    lNameMsg: "",
    addressMsg: "",
    mobNumMsg: "",
  });

  const handleContactToggle = () => setDisplayContact(!displayContact);

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
  const clearState = () => {
    setFirstName("");
    setLastName("");
    setAddress("");
    setDistrict("");
    setProvince("");
    setContact("");
    setBloodGroup("");
    setCheckedGender("");
    setDate("");
    setDisplayContact("");
  };

  const checkFirstName = (val) => {
    if (val.indexOf(" ") >= 0) {
      setErrors({
        ...errors,
        errorFirstName: true,
        fNameMsg: "*First Name can't have any white spaces",
      });
    } else if (!val) {
      setErrors({
        ...errors,
        errorFirstName: true,
        fNameMsg: "*First Name can't be empty",
      });
    } else if (val.length < 2 || val.length > 25) {
      setErrors({
        ...errors,
        errorFirstName: true,
        fNameMsg: "*First Name should 2 to 25 characters",
      });
    } else {
      setFirstName(val);
      setErrors({ ...errors, errorFirstName: false });
    }
  };

  const checkLastName = (val) => {
    if (val.indexOf(" ") >= 0) {
      setErrors({
        ...errors,
        errorLastName: true,
        lNameMsg: "*Last Name can't have any white spaces",
      });
    } else if (!val) {
      setErrors({
        ...errors,
        errorLastName: true,
        lNameMsg: "*Last Name can't be empty",
      });
    } else if (val.length < 2 || val.length > 25) {
      setErrors({
        ...errors,
        errorLastName: true,
        lNameMsg: "*Last Name should 2 to 25 characters",
      });
    } else {
      setLastName(val);
      setErrors({ ...errors, errorLastName: false });
    }
  };

  const checkAddress = (val) => {
    if (!val) {
      setErrors({
        ...errors,
        errorAddress: true,
        addressMsg: "*Address can't be empty",
      });
    } else if (
      val.replaceAll(" ", "").length < 2 ||
      val.replaceAll(" ", "").length > 70
    ) {
      setErrors({
        ...errors,
        errorAddress: true,
        addressMsg: "*Address should be 2 to 70 characters",
      });
    } else {
      setAddress(val);
      setErrors({ ...errors, errorAddress: false });
    }
  };

  const checkContact = (val) => {
    if (val.indexOf(" ") >= 0) {
      setErrors({
        ...errors,
        errorMobileNum: true,
        mobNumMsg: "*Contact can't have any white spaces",
      });
    } else if (!val) {
      setErrors({
        ...errors,
        errorMobileNum: true,
        mobNumMsg: "*Contact Number can't be empty",
      });
    } else if (val.length < 9 || val.length > 10) {
      setErrors({
        ...errors,
        errorMobileNum: true,
        mobNumMsg: "*Incorrect Contact Number",
      });
    } else {
      setContact(val);
      setErrors({ ...errors, errorMobileNum: false });
    }
  };

  const handleRegisterDonor = () => {
    var now = moment(new Date());
    var end = moment(date);
    var duration = moment.duration(now.diff(end));
    var years = duration.asYears();

    if (
      errors.errorFirstName ||
      errors.errorLastName ||
      errors.errorAddress ||
      errors.errorMobileNum
    ) {
      Alert.alert("Some inputs seem to be invalid! Please check again.");
    } else if (
      firstName == "" ||
      lastName == "" ||
      address == "" ||
      contact == "" ||
      district == "" ||
      province == "" ||
      bloodGroup == "" ||
      firstName == undefined ||
      lastName == undefined ||
      address == undefined ||
      contact == undefined ||
      district === undefined ||
      province === undefined ||
      bloodGroup === undefined ||
      date === undefined
    ) {
      Alert.alert("You might have forgot to select some fields");
    } else if (years < 16) {
      Alert.alert("Your age must be more than 16 years to register as donor");
    } else if (checkedGender == undefined || checkedGender == "") {
      Alert.alert("Please select your gender!");
    } else {
      setProgress({
        progress: true,
        progressMessage: "Registering Donor...",
      });
      fetch(`${baseUrl.url}/api/register/donor`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          address: address,
          district: district,
          province: province,
          mobileNum: contact,
          bloodType: bloodGroup,
          gender: checkedGender,
          dob: date,
          showContact: displayContact,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.status === "success") {
            Popup.show({
              type: "Success",
              title: "User Registered as Donor",
              button: true,
              textBody: "You have been registered as donor successfully!",
              buttontext: "Ok",
              callback: () => {
                Popup.hide();
              },
            });
            setProgress({ progress: false, progressMessage: "" });
            clearState();
          } else if (responseJson.status === "fail") {
            setProgress({ progress: false, progressMessage: "" });
            Alert.alert(responseJson.message);
            clearState();
          } else {
            setProgress({ progress: false, progressMessage: "" });
            Alert.alert("Something went wrong");
            clearState();
          }
        })
        .catch((error) => {
          setProgress({ progress: false, progressMessage: "" });
          clearState();
          Alert.alert(
            "Couldn't register as donor! Please check your connection or wait few minutes before trying"
          );
        });
    }
  };

  if (progress.progress) {
    return <Progress progressMessage={progress.progressMessage} />;
  } else {
    return (
      <ScrollView
        style={{ width: "100%", backgroundColor: colors.blood }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.try}>
          <Text
            style={{
              alignSelf: "flex-start",
              color: colors.white,
              fontSize: 25,
              marginBottom: 20,
              marginLeft: 10,
              fontWeight: "bold",
            }}
          >
            Become a Donor now!
          </Text>
          <Text
            style={{
              alignSelf: "flex-start",
              color: colors.white,
              fontSize: 16,
              marginBottom: 30,
              marginLeft: 10,
              fontWeight: "500",
            }}
          >
            Registering yourself as Donor will make you available as blood donor
            when blood recievers will search for donors of your blood group
          </Text>
        </View>
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            flex: 1,
            backgroundColor: "#ffffff",
            shadowRadius: 15,
            shadowColor: "orange",
            shadowOpacity: 0.5,
            shadowOffset: { height: -10, width: 10 },
          }}
        >
          <View style={styles.inputContainer}>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={styles.textInput}
              autoCapitalize="none"
              placeholder="First Name"
              keyboardType="default"
              clearButtonMode="always"
              onChangeText={(value) => checkFirstName(value)}
            />
          </View>
          {errors.errorFirstName ? (
            <Text
              style={{
                alignSelf: "flex-start",
                color: "red",
                marginLeft: 30,
              }}
            >
              {errors.fNameMsg}
            </Text>
          ) : null}

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={styles.textInput}
              autoCapitalize="none"
              placeholder="Last Name"
              secureTextEntry={false}
              clearButtonMode="always"
              onChangeText={(value) => checkLastName(value)}
            />
          </View>
          {errors.errorLastName ? (
            <Text
              style={{
                alignSelf: "flex-start",
                color: "red",
                marginLeft: 30,
              }}
            >
              {errors.lNameMsg}
            </Text>
          ) : null}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Address</Text>
            <TextInput
              style={styles.textInput}
              autoCapitalize="none"
              placeholder="Address"
              secureTextEntry={false}
              clearButtonMode="always"
              onChangeText={(value) => {
                checkAddress(value);
              }}
            />
          </View>

          {errors.errorAddress ? (
            <Text
              style={{
                alignSelf: "flex-start",
                color: "red",
                marginLeft: 30,
              }}
            >
              {errors.addressMsg}
            </Text>
          ) : null}

          <View style={styles.inputContainer}>
            <Text style={styles.label}>District</Text>
            <PickerComponent
              selectedItem={district}
              onSelectedItem={(item) => setDistrict(item.label)}
              title="Choose a District"
              items={districts}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Province</Text>
            <PickerComponent
              selectedItem={province}
              onSelectedItem={(item) => setProvince(item.label)}
              title="Choose a Province"
              items={provinces}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Mobile number</Text>
            <TextInput
              style={styles.textInput}
              autoCapitalize="none"
              placeholder="Mobile num."
              keyboardType="numeric"
              secureTextEntry={false}
              clearButtonMode="always"
              onChangeText={(value) => checkContact(value)}
            />
          </View>

          {errors.errorMobileNum ? (
            <Text
              style={{
                alignSelf: "flex-start",
                color: "red",
                marginLeft: 30,
              }}
            >
              {errors.mobNumMsg}
            </Text>
          ) : null}

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Your Blood Group</Text>
            <PickerComponent
              selectedItem={bloodGroup}
              onSelectedItem={(item) => setBloodGroup(item.label)}
              title="Choose a Blood Group"
              items={bloodGroups}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Gender</Text>
            <View
              style={{
                flexDirection: "row",
                width: "85%",
                height: 50,
                backgroundColor: "#C8C8C8",
                paddingLeft: 20,
                borderRadius: 15,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TouchableWithoutFeedback
                  onPress={() => setCheckedGender("male")}
                >
                  <Text style={styles.radioStyle}>Male</Text>
                </TouchableWithoutFeedback>
                <RadioButton
                  value="male"
                  status={checkedGender === "male" ? "checked" : "unchecked"}
                  onPress={() => setCheckedGender("male")}
                  uncheckedColor="#dc143c"
                  color="#dc143c"
                />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  borderLeftWidth: 1,
                  borderLeftColor: "#f4f8f8",
                }}
              >
                <TouchableWithoutFeedback
                  onPress={() => setCheckedGender("female")}
                >
                  <Text style={styles.radioStyle}>Female</Text>
                </TouchableWithoutFeedback>

                <RadioButton
                  value="female"
                  status={checkedGender === "female" ? "checked" : "unchecked"}
                  onPress={() => setCheckedGender("female")}
                  uncheckedColor="#dc143c"
                  color="#dc143c"
                />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  borderLeftWidth: 1,
                  borderLeftColor: "#f4f8f8",
                }}
              >
                <TouchableWithoutFeedback
                  onPress={() => setCheckedGender("others")}
                >
                  <Text style={styles.radioStyle}>Others</Text>
                </TouchableWithoutFeedback>
                <RadioButton
                  value="second"
                  status={checkedGender === "others" ? "checked" : "unchecked"}
                  onPress={() => setCheckedGender("others")}
                  uncheckedColor="#dc143c"
                  color="#dc143c"
                />
              </View>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Date of Birth</Text>
            <TouchableWithoutFeedback onPress={handleDateTimePicker}>
              <View style={styles.dateTimePicker}>
                <Text style={{ fontSize: 18 }}>
                  {date ? moment(date).format("MMMM Do YYYY") : "Select a Date"}
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
          {/* <Text
          style={{
            alignSelf: "flex-start",
            color: "red",
            marginLeft: 30,
          }}
        >
          *Age must be 16 years or more to become a donor
        </Text> */}

          <View style={styles.inputContainer}>
            <View style={{ flexDirection: "row" }}>
              <Switch
                value={displayContact}
                onValueChange={handleContactToggle}
              />
              <Text
                style={{
                  fontSize: 18,
                  marginLeft: 10,
                  marginTop: 5,
                  color: "#000",
                  fontWeight: "bold",
                }}
              >
                Display contact to requesters
              </Text>
            </View>
          </View>

          <AppButton
            title="Register as Donor"
            style={{ backgroundColor: colors.blood }}
            onPress={handleRegisterDonor}
          />
          {/* <Text
          style={{
            alignSelf: "flex-start",
            color: "red",
            marginLeft: 30,
            marginBottom: 10,
          }}
        >
          <MaterialCommunityIcons name="information-outline" size={15} />{" "}
          *Invalid inputs please try again
        </Text> */}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#dc143c",
    width: "100%",
  },
  try: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#dc143c",
    height: 200,
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
  inputContainer: {
    width: "100%",
    margin: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 18,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    fontWeight: "600",
    alignSelf: "flex-start",
    marginLeft: 30,
  },
  radioStyle: {
    fontSize: 18,
    marginLeft: 10,
  },
  dateTimePicker: {
    backgroundColor: "#C8C8C8",
    borderRadius: 15,
    flexDirection: "row",
    width: "85%",
    padding: 15,
    justifyContent: "center",
  },
});

export default BecomeDonor;
