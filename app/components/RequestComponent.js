import React from 'react';
import { View, TouchableHighlight, Text, Image, StyleSheet, Linking } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {MaterialCommunityIcons} from "@expo/vector-icons"
import colors from '../config/colors';

function RequestComponent({requestId, name, bloodGroup, address, contact, donationType, requiredDay, donationDetails}) {

    const handleRequestPress = ()=>{
        alert("You pressed");
    }
    return (
        <View style={styles.requestContainer}>
            <TouchableOpacity style= {styles.request} onPress={handleRequestPress}>
                <View style={{flexDirection: 'row'}}>
                <TouchableHighlight>
                    <Image style={styles.requesterImage} source={require("../assets/chair.jpg")}/>
                </TouchableHighlight>
                <View style={styles.detailContainer}>
                    <Text style={styles.txt}>You have a blood request from {name}.</Text>
                </View>
                </View>
                <View style={{flexDirection: "row", marginTop: -20, marginRight: 20, justifyContent: "flex-end"}}>
                    <Text style={{color:colors.blood}}>Details</Text>
                    <MaterialCommunityIcons name="chevron-right" size={20} color={colors.blood}/>
                </View>
            
            </TouchableOpacity>
        </View>


    );
}
const styles = StyleSheet.create({
    requestContainer: {
        paddingTop: 20,
        backgroundColor: "#f2f2f2",
        
        alignItems: 'center',
    },
    request:{
        backgroundColor: "#fff",
        width: "90%",
        borderRadius: 10,
        
        
    },

    requesterImage:{
        height: 40,
        width: 40,
        borderRadius: 40,
        marginTop: 20,
        marginLeft: 10
    },
    detailContainer:{
        padding: 20,
        flexShrink: 1,
    },
    txt:{
        fontSize: 15,
        fontWeight: "600",
        padding: 3,
        
    },
})

export default RequestComponent;