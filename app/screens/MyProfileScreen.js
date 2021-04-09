import React from "react";
import { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Platform,
  Alert,
  TouchableOpacity,
} from "react-native";
import ActivityIndicator from "../components/ActivityIndicator";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import baseUrl from "../config/baseUrl";
import colors from "../config/colors";
import moment from "moment";
import AuthContext from "../auth/context";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

function MyProfileScreen(props) {
  const [userDetails, setUserDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageUri, setImageUri] = useState();
  const [imageChosen, setImageChosen] = useState(false);

  const getProfile = () => {
    fetch(`${baseUrl.url}/api/profile/me`)
      .then((response) => response.json())
      .then((json) => {
        if (json.status === "success") {
          setUserDetails(json.userDetails);
          setImageUri(json.userDetails.user.profileImage);
          setLoading(false);
        } else {
          Alert.alert("Something went wrong");
        }
      })
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    setImageChosen(false);
    fetch(`${baseUrl.url}/api/profile/me`)
      .then((response) => response.json())
      .then((json) => {
        if (json.status === "success") {
          setUserDetails(json.userDetails);
          setImageUri(json.userDetails.user.profileImage);
          setLoading(false);
        } else {
          Alert.alert("Something went wrong");
        }
      })
      .catch((error) => console.error(error));
  }, []);

  const { setUser } = useContext(AuthContext);

  const handleEditImage = async () => {
    try {
      const result = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (!result.granted) {
        alert("You need to enable camera permission from settings");
      } else {
        // props.navigation.navigate("EditPhoto", {
        //   image: userDetails.user.profileImage,
        // });
        const image = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });

        if (!image.cancelled) {
          setImageChosen(true);
          setImageUri(image.uri);
        }
      }
    } catch (ex) {
      alert(ex.message);
    }
  };

  const handleUploadImage = async () => {
    let body = new FormData();
    body.append("profileImage", {
      uri: imageUri,
      name: imageUri.split("/").pop(),
      type: "image/png",
    });
    // body.append("Content-Type", "image/png");

    fetch(`${baseUrl.url}/api/users/image`, {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: body,
    })
      .then((res) => res.json())
      .then((resJson) => {
        if (resJson.status === "success") {
          alert("Image uploaded successfully");
          getProfile();
          setImageChosen(false);
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleDeleteImage = async () => {
    Alert.alert("Delete Image", "Do you want to delete your photo?");
  };

  if (loading === true) {
    return <ActivityIndicator />;
  } else {
    return (
      <View style={styles.container}>
        <ScrollView style={{ paddingBottom: 20 }}>
          <View style={styles.topView}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                top: 110,
              }}
            >
              {imageChosen ? (
                <Image
                  source={{
                    uri: imageUri,
                  }}
                  style={styles.imageProfile}
                />
              ) : (
                <Image
                  source={{
                    uri: `http://192.168.100.10:3000/uploads/` + imageUri,
                  }}
                  style={styles.imageProfile}
                />
              )}
              <Text
                style={{ fontWeight: "bold", fontSize: 25 }}
              >{`${userDetails.user.firstName} ${userDetails.user.lastName}`}</Text>
              <View style={{ flexDirection: "row" }}>
                <View>
                  <Text
                    onPress={() => {
                      handleEditImage();
                    }}
                  >
                    <MaterialCommunityIcons
                      name="camera-image"
                      size={30}
                      color="grey"
                    />
                  </Text>
                </View>
                {imageChosen ? (
                  <Text
                    onPress={() => {
                      handleUploadImage();
                    }}
                  >
                    <MaterialCommunityIcons
                      name="file-upload"
                      size={30}
                      color="grey"
                    />
                  </Text>
                ) : null}
                {imageUri === "images.png" ? (
                  <Text
                    onPress={() => {
                      handleDeleteImage();
                    }}
                  >
                    <MaterialCommunityIcons
                      name="delete-circle"
                      size={30}
                      color="grey"
                    />
                  </Text>
                ) : null}
              </View>
            </View>
          </View>

          <View style={styles.profileDetails}>
            <Text
              style={styles.textDetails}
            >{`Lives in ${userDetails.user.address}`}</Text>
            {/* <Text style={styles.textDetails}>Kaski, Gandaki, Nepal</Text> */}
            <Text style={styles.textDetails}>
              Email: {userDetails.user.emailAddress}
            </Text>
            <Text style={styles.textDetails}>
              Joined:{" "}
              {moment(userDetails.user.joinedDate).format("Do MMMM YYYY")}
            </Text>
          </View>
          <Text
            style={[
              styles.textDetails,
              { marginTop: 20, fontWeight: "bold", fontSize: 20 },
            ]}
          >
            Donor Details
          </Text>
          <View
            style={{
              width: "90%",
              backgroundColor: "#f2f2f2",
              height: 1,
              alignSelf: "center",
            }}
          />
          {userDetails.user.role == "donor" ? (
            <>
              <View
                style={[
                  styles.donorDetails,
                  { paddingVertical: 10, flexDirection: "row" },
                ]}
              >
                <View style={{ alignSelf: "flex-start", marginLeft: -10 }}>
                  <Text
                    style={[
                      styles.textDetails,
                      { fontSize: 15, alignSelf: "center" },
                    ]}
                  >
                    {userDetails.donor.numOfDonation}
                  </Text>
                  <Text style={[styles.textDetails, { alignSelf: "center" }]}>
                    Donations made
                  </Text>
                </View>

                <View
                  style={{
                    alignSelf: "flex-start",
                    borderLeftColor: "grey",
                    borderLeftWidth: 1,
                    marginLeft: 15,
                  }}
                >
                  <Text
                    style={[
                      styles.textDetails,
                      { alignSelf: "center", fontSize: 15 },
                    ]}
                  >
                    {moment(userDetails.donor.lastDonated).format(
                      "Do MMMM YYYY"
                    )}
                  </Text>
                  <Text style={[styles.textDetails, { alignSelf: "center" }]}>
                    Last donated
                  </Text>
                </View>
              </View>
              <View style={[styles.donorDetails, { alignItems: "flex-start" }]}>
                <Text style={[styles.textDetails, { color: colors.blood }]}>
                  Registered Donor in Blood Network
                </Text>

                <Text style={styles.textDetails}>
                  Provided Address: {userDetails.donor.address}
                </Text>
                <Text style={styles.textDetails}>
                  District: {userDetails.donor.donorDistrict}
                </Text>
                <Text style={styles.textDetails}>
                  Blood type is {userDetails.donor.bloodType}, Gender:{" "}
                  {userDetails.donor.gender}
                </Text>
                <Text style={styles.textDetails}>
                  Born on {moment(userDetails.donor.dob).format("Do MMMM YYYY")}
                </Text>
                <Text style={styles.textDetails}>
                  Provided Mobile: {userDetails.donor.donorContact}
                </Text>
              </View>
            </>
          ) : (
            <View>
              <Text>You are not registered as donor</Text>
            </View>
          )}
          <TouchableOpacity
            style={[
              styles.donorDetails,
              {
                paddingVertical: 10,
                flexDirection: "row",
                borderRadius: 5,
                alignItems: "center",
                justifyContent: "space-between",
              },
            ]}
            onPress={() => props.navigation.navigate("RequestStatus")}
          >
            <Text style={{ marginLeft: 20, fontSize: 16, fontWeight: "500" }}>
              See My Blood Request Details
            </Text>
            <MaterialCommunityIcons
              name="chevron-right"
              size={20}
              color="grey"
              style={{ marginRight: 10 }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.donorDetails,
              {
                paddingVertical: 10,
                flexDirection: "row",
                borderRadius: 5,
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 10,
              },
            ]}
          >
            <Text style={{ marginLeft: 20, fontSize: 16, fontWeight: "500" }}>
              Settings
            </Text>
            <AntDesign
              name="setting"
              size={20}
              color="grey"
              style={{ marginRight: 10 }}
            />
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
    paddingBottom: 10,
  },
  topView: {
    backgroundColor: colors.blood,
    height: 200,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    //opacity: 0.9,
    flexDirection: "row",
    justifyContent: "center",
  },
  imageProfile: {
    width: 160,
    height: 160,
    borderRadius: 80,
    borderColor: "#fff",
    borderWidth: 4,
  },
  profileDetails: {
    paddingVertical: 20,
    alignItems: "flex-start",
    alignSelf: "center",
    backgroundColor: "#f2f2f2",
    width: "90%",
    borderRadius: 10,
    marginTop: "35%",
  },
  textDetails: {
    fontSize: 18,
    marginLeft: 30,
    fontFamily: Platform.OS === "ios" ? "Avenir" : "Roboto",
    fontWeight: "500",
  },
  donorDetails: {
    paddingVertical: 20,
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#f2f2f2",
    width: "90%",
    borderRadius: 10,
    marginTop: 20,
  },
});

export default MyProfileScreen;
