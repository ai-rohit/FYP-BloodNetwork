import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function EditUserScreen(props) {
  const { user, donor } = props.route.params;

  return (
    <View style={styles.container}>
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
        onPress={() => props.navigation.navigate("EditUser", { detail: user })}
      >
        <Text style={{ marginLeft: 20, fontSize: 16, fontWeight: "500" }}>
          Edit My details
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
        onPress={() => props.navigation.navigate("ChangePassword")}
      >
        <Text style={{ marginLeft: 20, fontSize: 16, fontWeight: "500" }}>
          Change Password
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
          Edit Donor Details
        </Text>
        <MaterialCommunityIcons
          name="chevron-right"
          size={20}
          color="grey"
          style={{ marginRight: 10 }}
        />
      </TouchableOpacity>
      <Text>{user.firstName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
  },
  donorDetails: {
    paddingVertical: 20,
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#ffffff",
    width: "90%",
    borderRadius: 10,
    marginTop: 20,
    shadowColor: "grey",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: {
      height: -5,
      width: 5,
    },
  },
});

export default EditUserScreen;
