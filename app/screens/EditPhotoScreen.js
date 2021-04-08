import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Dimensions, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import AppButton from "../components/AppButton";
import baseUrl from "../config/baseUrl";

function EditPhotoScreen(props) {
  const [imageUri, setImageUri] = useState();

  const handleSelectImage = async () => {
    try {
      const image = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });
      if (!image.cancelled) {
        let localUri = image.uri;
        let fileName = localUri.split("/").pop();
        // setImageUri(image.uri);
        let match = /\.(\w+)$/.exec(fileName);
        let type = match ? `image/${match[1]}` : `image`;

        let formData = new FormData();

        formData.append("profileImage", {
          uri: localUri,
          name: fileName,
          type,
        });

        await fetch(`${baseUrl.url}/api/users/image`, {
          method: "POST",
          body: formData,
          headers: {
            "content-type": "multipart/form-data",
          },
        })
          .then((response) => response.json())
          .then((responseJson) => {
            alert(responseJson);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } catch (ex) {
      Alert.alert(ex.message);
      console.log(ex);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <Image
            source={require("../assets/images.png")}
            style={styles.image}
          />
        )}
      </View>

      <AppButton title="Select Image" onPress={() => handleSelectImage()} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",
  },
  imageContainer: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height / 3,
    backgroundColor: "grey",
    opacity: 0.8,
    justifyContent: "center",
  },
  image: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderColor: "#fff",
    borderWidth: 4,
    alignSelf: "center",
  },
});

export default EditPhotoScreen;
