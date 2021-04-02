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

const districts = [
  { label: "Kathmandu", value: "dist1" },
  { label: "Kaski", value: "dist2" },
  { label: "Chitwan", value: "dist3" },
  { label: "Dang", value: "dist4" },
  { label: "Bara", value: "dist5" },
  { label: "Bhaktapur", value: "dist6" },
  { label: "Lalitpur", value: "dist7" },
  { label: "Mustang", value: "dist8" },
  { label: "Manang", value: "dist9" },
  { label: "Palpa", value: "dist10" },
  { label: "Butwal", value: "dist11" },
  { label: "Mugu", value: "dist12" },
  { label: "Dolpa", value: "dist13" },
  { label: "Ilam", value: "dist14" },
  { label: "Parsa", value: "dist15" },
  { label: "Tanahu", value: "dist16" },
];

const provinces = [
  { label: "Bagmati", value: "prov1" },
  { label: "Gandaki", value: "prov2" },
];

const bloodGroups = [
  { label: "O+", value: "bld1" },
  { label: "A+", value: "bld2" },
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
    if (!val) {
      setErrors({
        ...errors,
        errorFirstName: true,
        fNameMsg: "First Name can't be empty",
      });
    } else if (val.length < 2 || val.length > 25) {
      setErrors({
        ...errors,
        errorFirstName: true,
        fNameMsg: "First Name should 2 to 25 characters",
      });
    } else {
      setFirstName(val);
      setErrors({ ...errors, errorFirstName: false });
    }
  };

  const checkLastName = (val) => {
    if (!val) {
      setErrors({
        ...errors,
        errorLastName: true,
        lNameMsg: "Last Name can't be empty",
      });
    } else if (val.length < 2 || val.length > 25) {
      setErrors({
        ...errors,
        errorLastName: true,
        lNameMsg: "Last Name should 2 to 25 characters",
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
        addressMsg: "Address can't be empty",
      });
    } else if (val.length < 2 || val.length > 70) {
      setErrors({
        ...errors,
        errorAddress: true,
        addressMsg: "Address should be 2 to 70 characters",
      });
    } else {
      setAddress(val);
      setErrors({ ...errors, errorAddress: false });
    }
  };

  const checkContact = (val) => {
    if (!val) {
      setErrors({
        ...errors,
        errorMobileNum: true,
        mobNumMsg: "Contact Number can't be empty",
      });
    } else if (val.length < 9 || val.length > 10) {
      setErrors({
        ...errors,
        errorMobileNum: true,
        mobNumMsg: "Incorrect Contact Number",
      });
    } else {
      setContact(val);
      setErrors({ ...errors, errorMobileNum: false });
    }
  };

  const handleRegisterDonor = () => {
    console.log(firstName);
    console.log(
      //   firstName
      // lastName +
      // address +
      // district +
      // province +
      // contact +
      // bloodGroup +
      // checkedGender +
      date
      // displayContact
    );
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
          alert("User has been registered as donor successfully");
          clearState();
        } else if (responseJson.status === "fail") {
          alert(responseJson.message);
          console.log(responseJson.data);
        } else {
          alert(responseJson.status + responseJson.message);
          console.log(responseJson.data);
        }
      });
  };
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
      </View>
    </ScrollView>
  );
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
