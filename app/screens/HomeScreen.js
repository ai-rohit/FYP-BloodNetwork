import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
  RefreshControl,
} from "react-native";
import Constants from "expo-constants";
import ProfileComponent from "../components/ProfileComponent";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import ActivityIndicator from "../components/ActivityIndicator";
import baseUrl from "../config/baseUrl";
import storage from "../auth/storage";
import { color } from "react-native-reanimated";

function HomeScreen(props) {
  const [userProfile, setUserProfile] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState();
  const [refreshing, setRefreshing] = useState(false);

  const genToken = async () => {
    const token = await storage.getToken();
    setToken(token);
  };
  useEffect(() => {
    let unmounted = false;
    genToken();
    //console.log(token);
    fetch(`${baseUrl.url}/api/profile/me`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (!unmounted) {
          if (json.status == "success") {
            console.log(genToken());
            setUserProfile(json.userDetails);
            setLoading(false);
          } else {
            Alert.alert("Something went wrong!");
          }
        }
      })
      .catch((error) =>
        Alert.alert(
          "Your internet connection seems down! Please try again later."
        )
      );
    return () => {
      unmounted = true;
    };
  }, []);

  if (loading === true) {
    return <ActivityIndicator />;
  } else {
    return (
      <View style={styles.homeContainer}>
        <ScrollView
          style={{ width: "100%" }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                fetch(`${baseUrl.url}/api/profile/me`)
                  .then((response) => response.json())
                  .then((json) => {
                    if (json.status == "success") {
                      console.log(genToken());
                      setUserProfile(json.userDetails);
                      setLoading(false);
                      setRefreshing(false);
                    } else {
                      Alert.alert("Something went wrong!");
                    }
                  })
                  .catch((error) => {
                    console.log(error.message);
                    Alert.alert(
                      "Your internet connection seems down! Please try again later."
                    );
                  });
              }}
            />
          }
        >
          <View style={styles.homeProfile}>
            <ProfileComponent
              image={userProfile.user.profileImage}
              title={`${userProfile.user.firstName} ${userProfile.user.lastName}`}
              subTitle={userProfile.user.address}
              navigation={props.navigation}
            />
          </View>

          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <TouchableOpacity
              style={styles.homeButton}
              onPress={() => props.navigation.navigate("FindDonor")}
            >
              <View style={styles.home}>
                <View style={styles.iconContainer}>
                  <MaterialIcons
                    name="person-search"
                    size={20}
                    color={"#fea064"}
                    // style={{ marginTop: 20, marginRight: 20 }}
                  />
                </View>
                <View style={{ flexShrink: 1 }}>
                  <Text style={{ fontSize: 18, fontWeight: "500" }}>
                    Find Donors
                  </Text>
                  <Text
                    style={{
                      color: "#6e6969",
                      fontSize: 14,
                      fontWeight: "300",
                    }}
                  >
                    You can find donors around your location and request them
                    for the blood donation for the blood you need.
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      paddingTop: 10,
                      marginLeft: 170,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "500",
                        color: colors.blood,
                      }}
                    >
                      Find Now
                    </Text>
                    <MaterialCommunityIcons
                      name={"chevron-right"}
                      size={20}
                      color={colors.blood}
                    />
                  </View>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.homeButton}
              onPress={() => props.navigation.navigate("BecomeDonor")}
            >
              <View style={styles.home}>
                <View
                  style={[styles.iconContainer, { backgroundColor: "#e5f9fb" }]}
                >
                  <MaterialCommunityIcons
                    name="hand-heart"
                    size={20}
                    color={"#00b6d3"}
                    // style={{ marginTop: 20, marginRight: 20 }}
                  />
                </View>
                <View style={{ flexShrink: 1 }}>
                  <Text style={{ fontSize: 18, fontWeight: "500" }}>
                    Become a Donor
                  </Text>
                  <Text
                    style={{
                      color: "#6e6969",
                      fontSize: 14,
                      fontWeight: "300",
                    }}
                  >
                    You can be a donor right now. Just fill the required details
                    and you are all ready to help and donate blood around you.
                  </Text>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      paddingTop: 10,
                      marginLeft: 130,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "500",
                        color: colors.blood,
                      }}
                    >
                      Become Donor
                    </Text>
                    <MaterialCommunityIcons
                      name={"chevron-right"}
                      size={20}
                      color={colors.blood}
                    />
                  </View>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.homeButton}
              onPress={() => props.navigation.navigate("BloodBank")}
            >
              <View style={styles.home}>
                <View
                  style={[styles.iconContainer, { backgroundColor: "#fadce2" }]}
                >
                  <MaterialCommunityIcons
                    name="hospital-marker"
                    size={20}
                    color={colors.blood}
                    style={{ opacity: 0.9 }}
                  />
                </View>
                <View style={{ flexShrink: 1, marginVertical: 10 }}>
                  <Text style={{ fontSize: 18, fontWeight: "500" }}>
                    Blood Banks Near Me
                  </Text>
                  <Text
                    style={{
                      color: "#6e6969",
                      fontSize: 14,
                      fontWeight: "300",
                    }}
                  >
                    Blood banks are always short of bloods. Lookfor the blood
                    banks near you and help them by donating blood.
                  </Text>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      paddingTop: 10,
                      marginLeft: 150,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "500",
                        color: colors.blood,
                      }}
                    >
                      Find Banks
                    </Text>
                    <MaterialCommunityIcons
                      name={"chevron-right"}
                      size={20}
                      color={colors.blood}
                    />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  homeContainer: {
    backgroundColor: "#f9f9f9",
    flex: 1,
    alignItems: "center",
    paddingTop: Constants.statusBarHeight,
    marginTop: -50,
  },

  homeButton: {
    marginVertical: 10,
    width: "90%",
    shadowColor: "grey",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: {
      height: -10,
      width: -10,
    },
  },
  home: {
    backgroundColor: "white",
    flexDirection: "row",
    borderRadius: 15,
    padding: 10,
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginHorizontal: 10,
    marginTop: 20,
  },
  homeProfile: {
    marginTop: 5,
    width: "100%",
  },
  iconContainer: {
    height: 35,
    width: 35,
    backgroundColor: "#ffe7d7",
    borderRadius: 17.5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: 10,
  },
});

export default HomeScreen;
