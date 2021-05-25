import React from "react";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Alert,
  ScrollView,
} from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import BloodBankList from "../components/BloodBankList";
import colors from "../config/colors";
import baseUrl from "../config/baseUrl";
import LottieLoader from "../components/LottieLoader";
import ActivityIndicator from "../components/ActivityIndicator";

function BloodBanks(props) {
  const [nearbyBloodBanks, setNearByBloodBanks] = useState([]);
  const [locations, setLocations] = useState();

  // const getUserLocation = async ()=>{
  //     const {granted} = await Location.requestPermissionsAsync();
  //     if(!granted) return;

  //     const {coords:{latitude, longitude}} = await Location.getCurrentPositionAsync();
  //     setLocation({latitude, longitude});

  // }

  useEffect(() => {
    fetch(`${baseUrl.url}/api/blood_banks`)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        if (json.status == "success") {
          setNearByBloodBanks(json.data);
          setLocations(json.locations);
          console.log(locations);
        } else {
          Alert.alert("Internal Server Error! Come back in few minutes");
        }
      })
      .catch((error) =>
        Alert.alert(
          "Your internet connection seems to be down. Please try again"
        )
      );
  }, []);
  //   const getBloodBanks = async () => {
  //     const data = await fetch(`${baseUrl.url}/api/blood_banks`);
  //     const bloodBanks = await data.json();
  //     return bloodBanks;
  //   };
  //   const details = getBloodBanks();
  //   setNearByBloodBanks(details);
  //   console.log("nearby", nearbyBloodBanks);
  // }, []);
  // const nearbyBloodBanksArray = [
  //   {
  //     bankId: "bd1",
  //     hospitalName: "Fewa Blood Bank",
  //     hospitalContact: "98989898",
  //     hospitalDistrict: "Kaski",
  //     hospitalLocation: "Newroad, Pokhara",
  //   },
  //   {
  //     bankId: "bd2",
  //     hospitalName: "Fishtail Blood Bank Hospital",
  //     hospitalContact: "98989898",
  //     hospitalDistrict: "Kaski",
  //     hospitalLocation: "Newroad, Pokhara",
  //   },
  //   {
  //     bankId: "bd3",
  //     hospitalName: "Padma Nursing Home",
  //     hospitalContact: "98989898",
  //     hospitalDistrict: "Kaski",
  //     hospitalLocation: "Newroad, Pokhara",
  //   },
  // ];
  if (locations == undefined) {
    return <ActivityIndicator />;
  } else {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          provider="google"
          initialRegion={{
            latitude: 28.216816,
            longitude: 83.985873,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {locations.map((location, index) => (
            <MapView.Marker
              key={index}
              coordinate={location.coordinates}
              title={location.name}
              description={"You re here right now"}
            />
          ))}
        </MapView>

        <View style={{ flex: 1, backgroundColor: "f7f7f7" }}>
          <View
            style={{
              backgroundColor: colors.blood,
              width: "100%",
              height: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 25, fontWeight: "bold", color: "#fff" }}>
              Blood Banks in Your Area
            </Text>
          </View>

          <BloodBankList items={nearbyBloodBanks} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    paddingBottom: 20,
  },
  map: {
    width: "100%",
    height: "40%",
    //flex: 1
  },
});
export default BloodBanks;
