import React from 'react';
import { TextInput, View, StyleSheet, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons' 

function AppTextInput({icon, ...otherProps}) {
    return (
        <View style={styles.container}>
            {icon && <MaterialCommunityIcons name={icon} size={20} color="#6e6969" style={styles.icon}/>}
            <TextInput style={styles.textInput}{...otherProps}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#f8f4f4",
        borderRadius: 25,
        flexDirection: "row",
        width: "100%",
        padding: 15,
        marginVertical: 10
    }, 
    textInput: {
        fontSize: 18,
        fontFamily: Platform.OS === "android"?"Roboto": "Avenir",
    },
    icon:{
        marginRight: 10
    }
})
export default AppTextInput;