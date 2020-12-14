import React from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, TouchableWithoutFeedback, ScrollView } from 'react-native';
import Constants from "expo-constants";
import RenderDonorList from './RenderDonorList';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {  } from 'react-native-gesture-handler';

function DonorListComponent({items, showResults, location, bloodGroup}) {
        console.log(showResults)
        if (showResults===false){
                return(
                        <ScrollView>
                        <View style={{alignItems: 'center', justifyContent: 'center'}}>
                                <MaterialCommunityIcons name={"account-search"} size={300} color={"#a9a9a9"} style={{opacity: 0.5, marginTop: 100}}/>
                                <Text style={{fontSize: 20, fontWeight: "bold", color:"#a9a9a9"}}>Your results will be shown here</Text>
                        </View>
                        </ScrollView>
                );
        }else if(items.length>=1 && showResults===true){

        
                return(
                        
                        <FlatList
                        data={items}
                        keyExtractor = {item=> item.id.toString()}
                        renderItem={({item}) => ( <RenderDonorList name={item.name} bloodGroup={item.bloodType} address={item.address} age={item.age}
                                contact={item.displayContact==="true"?item.contact:"Contact Hidden"} displayContact={item.displayContact}/>
                        )}
                        /> 
                      
                );
                        }
        else{
                
                console.log(showResults);
                console.log(items.length);
                return(
                        <View>
                                <Text>No results found</Text>
                        </View>
                );
        }

      
    }
export default DonorListComponent;