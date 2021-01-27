import React from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, TouchableWithoutFeedback, ScrollView } from 'react-native';
import Constants from "expo-constants";
import RenderDonorList from './RenderDonorList';
import {MaterialCommunityIcons, Fontisto} from '@expo/vector-icons';
import {  } from 'react-native-gesture-handler';
import colors from "../config/colors"

function DonorListComponent({items, showResults, location, bloodGroup}) {
        
        if (showResults==="default"){
                
                return(
                        <ScrollView>
                        <View style={{alignItems: 'center', justifyContent: 'center'}}>
                                <MaterialCommunityIcons name={"account-search"} size={300} color={"#a9a9a9"} style={{opacity: 0.5, marginTop: 50}}/>
                                <Text style={{fontSize: 20, fontWeight: "bold", color:"#a9a9a9"}}>Your results will be shown here</Text>
                        </View>
                        </ScrollView>
                );
        }else if(items.length>=1 && showResults===true){

        
                return(
                        
                        <FlatList
                        data={items}
                        keyExtractor = {item=> item.donorId.toString()}
                        renderItem={({item}) => ( <RenderDonorList name={item.firstName} bloodGroup={item.bloodType} address={item.address} age={item.gender}
                                contact={item.showContact==="0"?item.contact:"Contact Hidden"} displayContact={item.showContact}/>
                        )}
                        /> 
                      
                );
                        }
        else if(showResults===false){
                
                return(
                        <View>
                                <View style={{flexDirection: 'row', marginTop: 80}}>
                                        <MaterialCommunityIcons name={"emoticon-cry-outline"} size={200} color={colors.blood}/>   
                                </View>
                                
                                <Text style={{color: "#a9a9a9", fontSize:20, opacity: 1, fontWeight: "500", marginTop: 20, marginLeft: 20}}>No results found....</Text>
                               
                        </View>
                );
        }

      
    }
export default DonorListComponent;