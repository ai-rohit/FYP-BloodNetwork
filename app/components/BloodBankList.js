import React from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, Platform, Linking, Dimensions } from 'react-native';
import Constants from "expo-constants";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import colors from "../config/colors"
import { Colors } from 'react-native/Libraries/NewAppScreen';



function BloodBankList({items}) {
    var width = Dimensions.get("window").width;
    if(items.length<1 || items == undefined){
        return(
            <View>
                <Text>No Blood Banks Around You</Text>
            </View>
        );
    }else{
        console.log(items);
        return(
            <View style={{ width: "100%", height: "100%", justifyContent: 'center', alignItems: 'center', marginTop: 30}}>                
                <FlatList
                    data={items}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor = {item=> item.bankId.toString()}
                    snapToInterval = {width*0.8}
                    decelerationRate={0}
                    bounces={false}
                    renderItem={({item}) => ( 
                        <View style={{flexDirection: 'column', padding: 10, alignItems: 'center', height: "60%", backgroundColor: "white", borderRadius: 20, width: width*0.8, flex:1, margin: 10}}>
                            <Text>Name: {item.hospitalName}</Text>
                            <Text>District: {item.hospitalDistrict}</Text>
                            <Text>location: {item.hospitalLocation}</Text>
                            <Text>contact: {item.hospitalContact}</Text>
                            {/* <View style={{width:"40%", flexDirection: 'row', alignItems:"center", marginLeft: 10}}>
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
                            </TouchableOpacity> */}
                        </View>
                        //<View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: "blue", flexGrow: 1, height: "100%"}}>
                        //     <View style={{backgroundColor: "white", height: "50%", borderRadius: 20, width: "90%", height: "20%"}}>

                        //     </View>
                        // //</View>
                    )}
                    //ItemSeparatorComponent = {()=> <View style={{width:"100%", backgroundColor: colors.blood, height: 1}}/>}
                   />     
                </View>

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