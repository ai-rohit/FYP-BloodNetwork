import React from 'react';
import { View, TouchableHighlight, Text, Image, StyleSheet, Linking } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {MaterialCommunityIcons} from "@expo/vector-icons"
import colors from '../config/colors';

function RequestComponent({name, bloodGroup, address, contact, donationType, requiredDay, donationDetails}) {
    return (
        <View style={styles.requestContainer}>
        <View style= {styles.request}>
            <View style={{flexDirection: 'row'}}>
             <TouchableHighlight>
                 <Image style={styles.requesterImage} source={require("../assets/chair.jpg")}/>
             </TouchableHighlight>
             <View style={styles.detailContainer}>
                 <Text style={styles.txt}>Name: {name}</Text>
                 <Text style={styles.txt}>Required Blood Group: {bloodGroup}</Text>
                 <Text style={styles.txt}>Address: {address}</Text>
                 <Text style={styles.txt}>Donate within: {requiredDay==="emergency"? requiredDay: donationType + "days"} </Text>
                 
                 <Text style={styles.txt}>Contact: {contact}</Text>

             </View>
            </View>
            <View style={{backgroundColor: colors.success, flexDirection: 'row', height: 50, borderBottomRightRadius: 20, borderBottomLeftRadius: 20, alignItems: "center", justifyContent:"center"}}>
                     <TouchableOpacity style={{flexDirection: 'row'}}>
                            <Text style={{fontSize: 15, fontWeight: "600", color: "#f5f5f5", marginRight: 10, marginTop: 5}}>Show Details</Text>
                            <MaterialCommunityIcons name={"page-next-outline"} color={"#fff"} size={25} style={{marginRight: 15, marginBottom: 2}}/>
                        </TouchableOpacity>

                        <TouchableOpacity style={{flexDirection: 'row', borderLeftWidth:1, borderLeftColor:"#fff"}} onPress={()=> alert("Hello")}>
                            <Text style={{fontSize: 15, fontWeight: "600", color: "#f5f5f5", marginLeft: 20, marginTop: 5}}>Reject</Text>
                            <MaterialCommunityIcons name={"alpha-x-circle-outline"} color={colors.white} size={25} style={{marginLeft: 10, marginBottom: 6}}/>
                            
                        </TouchableOpacity>
            </View>
        </View>
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
        borderRadius: 20,
        
        
    },

    requesterImage:{
        height: 80,
        width: 80,
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