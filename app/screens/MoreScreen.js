import React, { useEffect, useState } from "react";
import Constants from "expo-constants";
import { Text, StyleSheet, View, Dimensions, Image } from "react-native";

import colors from "../config/colors";
import Svg, { Path } from "react-native-svg";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as ScreenOrientation from "expo-screen-orientation";
import baseUrl from "../config/baseUrl";
import ActivityIndicator from "../components/ActivityIndicator";

var height = Dimensions.get("window").height;
var width = Dimensions.get("window").width;
function MoreScreen(props) {
  const { navigation } = props;

  // useEffect(() => {
  //   navigation.addListener("focus", () => {
  //     ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  //   });
  // }, [navigation]);
  // const [userDetails, setUserDetails] = useState();
  // const [loading, setLoading] = useState(false);
  // const [imageUri, setImageUri] = useState();

  // useEffect(() => {
  //   const unsubscribe = props.navigation.addListener("focus", () => {
  //     fetch(`${baseUrl.url}/api/profile/me`)
  //       .then((response) => response.json())
  //       .then((json) => {
  //         if (json.status === "success") {
  //           setUserDetails(json.userDetails);
  //           setImageUri(json.userDetails.user.profileImage);
  //           setLoading(false);
  //           console.log(userDetails);
  //         } else {
  //           Alert.alert("Something went wrong");
  //         }
  //       })
  //       .catch((error) =>
  //         Alert.alert(
  //           "Your internet connection seems down! Please try again later."
  //         )
  //       );
  //   });
  //   return unsubscribe;
  // }, [props.navigation]);

  // if (userDetails == undefined) {
  //   return <ActivityIndicator />;
  // } else {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.customStyles}>
          <View
            style={{
              backgroundColor: colors.blood,
              height: height / 2.6,
              justifyContent: "center",
            }}
          >
            <View style={{ marginTop: 20 }}>
              <Image
                style={styles.image}
                source={require("../assets/logo.png")}
              />
              <Text style={styles.txt}>Blood Network Application</Text>
              {/* <Text style={styles.txt}>Newroad, Pokhara</Text> */}
            </View>
            <Svg
              height="60%"
              width="100%"
              viewBox="0 0 1440 320"
              style={{ position: "absolute", top: height / 3.2 }}
            >
              <Path
                fill={colors.blood}
                d="M0,96L48,112C96,128,192,160,288,186.7C384
                    ,213,480,235,576,213.3C672,192,768,128,864,
                    128C960,128,1056,192,1152,208C1248,224,1344,192,
                    1392,176L1440,160L1440,0L1392,0C1344,0,1248,0,
                    1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,
                    384,0,288,0C192,0,96,0,48,0L0,0Z"
              />
            </Svg>
          </View>
        </View>
      </View>

      <View style={styles.buttons}>
        <View style={{ flexDirection: "row", alignSelf: "center", padding: 5 }}>
          <TouchableOpacity
            style={styles.buttonBars}
            onPress={() => props.navigation.navigate("Campaigns")}
          >
            <View>
              <View
                style={{
                  height: 60,
                  width: 60,
                  borderRadius: 30,
                  backgroundColor: "#ffe7d7",
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                }}
              >
                <MaterialIcons
                  name="campaign"
                  size={40}
                  color="#fea064"
                  style={{ opacity: 0.9 }}
                />
              </View>
              <Text style={styles.iconText}>Campaigns</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonBars}
            onPress={() => {
              props.navigation.navigate("Donation");
            }}
          >
            <View>
              <View
                style={{
                  height: 60,
                  width: 60,
                  borderRadius: 30,
                  backgroundColor: "#fadce2",
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                }}
              >
                <MaterialCommunityIcons
                  name="charity"
                  size={40}
                  color={colors.blood}
                  style={{ opacity: 0.9 }}
                />
              </View>
              <Text style={styles.iconText}>Make Donations</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignSelf: "center",
            padding: 10,
            paddingTop: -20,
          }}
        >
          <TouchableOpacity
            style={styles.buttonBars}
            onPress={() => props.navigation.navigate("Profile")}
          >
            <View>
              <View
                style={{
                  height: 60,
                  width: 60,
                  borderRadius: 30,
                  backgroundColor: "#e5f9fb",
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                }}
              >
                <MaterialIcons
                  name="person"
                  size={40}
                  color="#00b6d3"
                  style={{ opacity: 0.9 }}
                />
              </View>
              <Text style={styles.iconText}>My Profile</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonBars}
            onPress={() => props.navigation.navigate("RequestStatus")}
          >
            <View>
              <View
                style={{
                  height: 60,
                  width: 60,
                  borderRadius: 30,
                  backgroundColor: "#efebff",
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                }}
              >
                <MaterialCommunityIcons
                  name="blood-bag"
                  size={40}
                  color="#6332ff"
                  style={{ opacity: 0.9 }}
                />
              </View>
              <Text style={styles.iconText}>Request Status</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1.5,
    backgroundColor: "#f9f9f9",
  },
  topSection: {
    height: height / 3,
    justifyContent: "center",
    borderBottomLeftRadius: 25,
    backgroundColor: colors.blood,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 10,
  },
  txt: {
    alignSelf: "center",
    fontSize: 24,
    color: colors.white,
    fontWeight: "800",
    marginTop: 5,
  },
  customStyles: {
    position: "absolute",
    width: Dimensions.get("window").width,
  },
  buttons: {
    flex: 1.7,
    backgroundColor: "#f9f9f9",
    // backgroundColor: "blue"
  },
  buttonBars: {
    height: 130,
    width: width / 2.4,
    borderRadius: 8,
    backgroundColor: colors.white,
    margin: 10,
    shadowColor: "grey",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: {
      height: 10,
      width: 10,
    },
    justifyContent: "center",
    alignItems: "center",
  },
  iconText: {
    marginTop: 5,
    fontWeight: "600",
    fontSize: 17,
  },
});

export default MoreScreen;
