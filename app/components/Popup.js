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

import { Root, Popup } from "popup-ui";

function PopupUI(type, title, textBody) {
  Popup.show({
    type: type,
    title: title,
    button: true,
    textBody: textBody,
    buttonText: "OK",
    callback: () => Popup.hide(),
  });
}

export default PopupUI;
