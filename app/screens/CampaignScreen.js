import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import baseUrl from "../config/baseUrl";
import ActivityIndicator from "../components/ActivityIndicator";

function CampaignScreen(props) {
  const [campaigns, setCampaigns] = useState();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      fetch(`${baseUrl.url}/api/campaigns`)
        .then((response) => response.json())
        .then((json) => {
          setCampaigns(json.data);
          setLoading(false);
        })
        .catch((error) => console.error(error));
    });
    return unsubscribe;
  }, [props.navigation]);
  if (loading === true) {
    return <ActivityIndicator />;
  } else {
    return (
      <View style={styles.container}>
        <View style={{ backgroundColor: colors.blood, padding: 10 }}>
          <Text
            style={[
              styles.texts,
              {
                fontWeight: "bold",
                fontSize: 20,
                color: colors.white,
                alignSelf: "center",
                marginRight: 5,
              },
            ]}
          >
            List of campaigns around your place
          </Text>
        </View>
        <View
          style={{
            width: "100%",
            height: 1,
            backgroundColor: "grey",
          }}
        />
        <FlatList
          showsVerticalScrollIndicator={false}
          data={campaigns}
          keyExtractor={(campaign) => campaign.campaignId.toString()}
          renderItem={({ item }) => {
            console.log(item);
            return (
              <View
                style={{
                  width: "100%",
                  justifyContent: "center",
                  padding: 15,
                }}
              >
                <Text
                  style={{
                    alignSelf: "center",
                    marginTop: 10,
                    fontSize: 20,
                    fontWeight: "bold",
                    color: "grey",
                  }}
                >
                  {item.campaignName}
                </Text>

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <MaterialIcons
                    name="location-history"
                    size={20}
                    color="grey"
                  />
                  <Text style={[styles.texts]}>
                    District: {item.campaignDistrict}
                  </Text>
                </View>

                <View style={{ flexDirection: "row", width: "70%" }}>
                  <Entypo
                    name="open-book"
                    size={20}
                    color="grey"
                    style={{ marginTop: 10 }}
                  />
                  <Text style={styles.texts}>Details:</Text>
                  <Text style={styles.texts}>{item.campaignDetails}</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Entypo name="location" size={20} color="grey" />
                  <Text style={[styles.texts, { flexGrow: 1 }]}>
                    Location: {item.campaignLocation}
                  </Text>
                </View>

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <MaterialIcons name="date-range" size={20} color="grey" />
                  <Text style={styles.texts}>Date: {item.campaignDate}</Text>
                </View>
              </View>
            );
          }}
          ItemSeparatorComponent={() => (
            <View
              style={{
                width: "95%",
                height: 1,
                backgroundColor: "#000",
                alignSelf: "center",
              }}
            />
          )}
          refreshing={refreshing}
          onRefresh={() => {
            fetch(`${baseUrl.url}/api/campaigns`)
              .then((response) => response.json())
              .then((json) => {
                setCampaigns(json.data);
              })
              .catch((error) => console.error(error));
          }}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  texts: {
    fontSize: 16,
    marginTop: 10,
    marginLeft: 10,
    color: "grey",
    fontWeight: "500",
  },
});

export default CampaignScreen;
