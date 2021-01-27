import React from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, Platform, Linking } from 'react-native';
import Constants from "expo-constants";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import colors from "../config/colors"
import { Colors } from 'react-native/Libraries/NewAppScreen';


function BloodBankList({items}) {

    if(items.length<1 || items == undefined){
        return(
            <View>
                <Text>No Blood Banks Around You</Text>
            </View>
        );
    }else{
        console.log(items);
        return(
                <FlatList
                    data={items}
                    keyExtractor = {item=> item.bankId.toString()}
                    renderItem={({item}) => ( 
                        <View style={{flexDirection: 'row', padding: 10, alignItems: 'center'}}>
                            
                            <View style={{width:"40%", flexDirection: 'row', alignItems:"center", marginLeft: 10}}>
                            <View>
                            <MaterialCommunityIcons name={"hospital-marker"} size={25} style={styles.icon} color={colors.blood}/>
                            </View>
                            <Text style={styles.bloodText}>{item.hospitalName}</Text>
                            </View>
                            <TouchableOpacity style={{flexDirection: 'row', marginLeft: 60}} onPress={
                                ()=>{
                                    Platform.OS==="ios"?Linking.openURL(`telprompt:${item.hospitalContact}`):Linking.openURL(`tel:${item.contact}`)
                                }
                            }>
                                <Text style={styles.bloodText}>{item.hospitalContact}</Text>
                                <MaterialCommunityIcons name={"phone"} size={25} style={{marginLeft: 9}} color={colors.success}/>
                            </TouchableOpacity>
                        </View>
                    )}
                    ItemSeparatorComponent = {()=> <View style={{width:"100%", backgroundColor: colors.blood, height: 1}}/>}
                   />     
            
                    );
        }
      
    }
    const styles = StyleSheet.create({
        bloodText:{
            fontWeight: "600",
            fontSize:  18,
            color: colors.blood
        }
        
    })
export default BloodBankList;