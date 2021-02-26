import React from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, Platform, Linking, Dimensions, Image, ScrollView } from 'react-native';
import Constants from "expo-constants";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import colors from "../config/colors"
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { color } from 'react-native-reanimated';


var width = Dimensions.get("window").width;
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
            <View style={{ width: "100%", justifyContent: 'center', alignItems: 'center', marginTop: 15, flex:1}}>                
                <FlatList
                    data={items}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor = {item=> item.bankId.toString()}
                    snapToInterval = {width*0.8}
                    decelerationRate={0}
                    bounces={false}
                    renderItem={({item}) => ( 
                        <View style={styles.hospitalContainer}>
                                    {/* <Image source={require("../assets/chair.jpg")} style={{width: "100%", height: "55%", borderTopLeftRadius: 20, borderTopRightRadius: 20}}/> */}
                            
                                <View style={{width:"100%", justifyContent: 'center', alignItems: 'center', backgroundColor: "#fadce2", padding: 10, borderTopLeftRadius: 20, borderTopRightRadius: 20}}>
                                    <MaterialCommunityIcons name="hospital-marker" size={50} color={colors.blood}/>
                                </View>
                                <View style={{marginTop: 5, width: "100%"}}>
                                    <Text style={{fontWeight:"bold", fontSize:20, alignSelf: 'center', color:colors.blood, }}>{item.hospitalName}</Text>
                                    <Text style={styles.text}>District: {item.hospitalDistrict}</Text>
                                    <Text style={styles.text}>Location: {item.hospitalLocation}</Text>
                                    <Text style={styles.text}>Contact: {item.hospitalContact}</Text>
                                </View>
                                <View style={{alignItems: 'center', width:"103%", position:'absolute', bottom:1, alignSelf: 'center'}}>

                                    <TouchableOpacity style={styles.callBtn}>
                                        <MaterialCommunityIcons name="phone" color={colors.white} size={30}/>    
                                    </TouchableOpacity>    
                                </View>       
                        </View>
                       
                    )}
                            
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
        },
        text:{
            fontSize: 16,
            paddingTop: 5,
            fontWeight: "700",
            color: colors.blood,
            opacity:0.8,
            marginLeft: 5,
            marginTop: 5
        },
        hospitalContainer:{
            padding: 5,
            backgroundColor: "white", 
            borderRadius: 20,
            width: width*0.8, 
            margin: 10,
            marginTop: 19,
            shadowColor: "grey",
            shadowRadius: 10,
            shadowOffset:{
                width:-10,
                height:-5
            },
            shadowOpacity:0.4
        },
        callBtn:{backgroundColor: colors.primary, 
                width:"100%",
                 height:45,
                borderBottomLeftRadius:20,
                borderBottomRightRadius:20,
                justifyContent:'center',
                alignItems:'center'}
        
    })
export default BloodBankList;