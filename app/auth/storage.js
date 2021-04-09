import * as SecureStore from "expo-secure-store";
import { Alert } from "react-native";

const key = "authToken";
const storeToken = async (authToken) => {
  try {
    await SecureStore.setItemAsync(key, authToken);
  } catch (ex) {
    Alert.alert("Something went wrong");
  }
};

const getToken = async () => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (ex) {
    Alert.alert(ex.message);
  }
};

const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (ex) {
    Alert.alert(ex.message);
  }
};

export default { getToken, storeToken, removeToken };
