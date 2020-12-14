import React from 'react';
import { View, StyleSheet, Text, Image, TouchableHighlight, TouchableOpacity } from 'react-native';
import Constants from "expo-constants";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {  } from 'react-native-gesture-handler';

function RenderDonorList({name, age, bloodGroup, address, contact, displayContact}) {

    return (
       <View style={styles.donorContainer}>
           <View style= {styles.donor}>
               <View style={{flexDirection: 'row'}}>
                <TouchableHighlight>
                    <Image style={styles.donorImage} source={require("../assets/chair.jpg")}/>
                </TouchableHighlight>
                <View style={styles.detailContainer}>
                    <Text style={styles.txt}>Name: {name}</Text>
                    <Text style={styles.txt}>Blood Group: {bloodGroup}</Text>
                    <Text style={styles.txt}>Address: {address}</Text>
                    <Text style={styles.txt}>Age: {age}</Text>
                    
                    <Text style={styles.txt}>Contact: {contact}</Text>
                </View>

                </View>

                <View style={{ alignItems:'center', justifyContent:'center', backgroundColor: "#dc143c", width:"100%", flexDirection: 'row', height: 45, borderBottomRightRadius: 20, borderBottomLeftRadius: 20}}>
                        <TouchableOpacity style={styles.callBtn}>
                            <Text style={{fontSize: 15, fontWeight: "600", color: "#f5f5f5", marginLeft: 15}}>Call</Text>
                            <MaterialCommunityIcons name={"phone"} color={"#fff"} size={25} style={{marginLeft: 10, marginBottom: 2}}/>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.reqBtn}>
                            <Text style={{fontSize: 15, fontWeight: "600", color: "#f5f5f5", marginLeft: 30}}>Request Donation</Text>
                            <MaterialCommunityIcons name={"hand-heart"} color={"#fff"} size={25} style={{marginLeft: 10, marginBottom: 6}}/>
                            
                        </TouchableOpacity>
                </View>
                </View>
       </View>
    );
}

const styles = StyleSheet.create({
    donorContainer: {
        paddingTop: 20,
        backgroundColor: "#f2f2f2",
        
        alignItems: 'center',
    },
    donor:{
        backgroundColor: "#fff",
        width: "90%",
        borderRadius: 20,
        
        
    },

    donorImage:{
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
        flexWrap: "wrap"
    },
    callBtn:{
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20
    },
    reqBtn:{
        flexDirection: "row",
        marginLeft: 20,
        alignItems: 'center',
        borderLeftColor: "#fff",
        borderLeftWidth: 1,
    }
})

export default RenderDonorList;