import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { useState } from 'react/cjs/react.development';
import PickerComponent from '../components/PickerComponent';
import {MaterialCommunityIcons} from "@expo/vector-icons"
import Constants from "expo-constants";
import DonorListComponent from '../components/DonorListComponent';

export const locations = [
    {label: "Kavrepalanchok", value: "loc1"},
    {label: "Kaski", value: "loc2"},
    {label: "Chitwan", value: "loc3"},
    {label: "Dang", value: "loc4"},
    {label: "Bara", value: "loc5"},
    {label: "Bhaktapur", value: "loc6"},
    {label: "Lalitpur", value: "loc7"},
    {label: "Mustang", value: "loc8"},
    {label: "Manang", value: "loc9"},
    {label: "Palpa", value: "loc10"},
    {label: "Butwal", value: "loc11"},
    {label: "Mugu", value: "loc12"},
    {label: "Dolpa", value: "loct13"},
    {label: "Ilam", value: "loc14"},
    {label: "Parsa", value: "loc15"},
    {label: "Arghakhanchi", value: "loc16"},
];

const bloods = [
    {label: "O+", value: "bd1"},
    {label: "O-", value: "bd2"},
    {label: "A+", value: "bd3"}
]

function FindDonorScreen(props) {
    const [location, setLocation] = useState("");
    const [blood, setBlood] = useState("");
    const [donors, setDonors] = useState([]);
    const [isResultVisible, setIsResultVisible] = useState("default");

    const handleDonorSearch = ()=>{  
            if(location==="" || blood===""){
                alert("Please select location or blood group properly");
                return;
            }else{
            fetch(`http://cd1135ab6a96.ngrok.io/api/donor/${location}/${blood}`)
            .then((response)=>response.json())
            .then((json)=> {
                    if(json.status===false){
                        
                        setIsResultVisible(false);
                    }else{
                        setDonors(json)
                        setIsResultVisible(true);
                    }
                        })
            .catch((error)=> console.error(error))
        }
            
    }

    return (
        <View style={styles.container}>
            <View style={styles.topTab}>
                <View style={{flexDirection: 'row', borderTopColor: "#fff", borderTopWidth: 1, marginTop: 20}}>
                    
                    <PickerComponent selectedItem={location} 
                    onSelectedItem={item=> setLocation(item.label)} 
                    title= "Location" 
                    items={locations} 
                    style = {styles.locationPicker}
                    textStyle= {{fontSize: 18, color: "#fff", fontWeight: "700"}}/>
                    
                    <PickerComponent selectedItem={blood} 
                    onSelectedItem={item=> setBlood(item.label)} 
                    title= "Blood Group" 
                    items={bloods} 
                    style = {styles.bloodPicker}
                    textStyle= {{fontSize: 18, color: "#fff", fontWeight: "700"}}
                
                />
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={{flexDirection: 'row', marginLeft: 20}} onPress={handleDonorSearch}>
                    <View style={{flexDirection: 'row', alignItems: 'center', height: 40}}>
                    <Text style={styles.buttonText}>Find Donor</Text>
                    <MaterialCommunityIcons name ={"arrow-right"} size={30} style={{
                        color: "#dc143c",
                        marginLeft: 5,
                        
                    }}/>
                    </View>
                    
                    </TouchableOpacity> 

                </View>

               
            </View>

            <View style={{width: "100%", marginTop: 50,}}>            
                <View style={{height: 80, backgroundColor: "#dc143c", justifyContent: 'center'}}>
                <Text style={{marginLeft: 80, 
                    fontSize: 30, 
                    fontWeight: "bold", 
                    fontFamily: Platform.OS === 'ios'? "Avenir": "Roboto", 
                    color: "white",}}>Search Results</Text> 
                </View>
            </View>
            <ScrollView >
                <DonorListComponent items={donors} showResults={isResultVisible} location={location} bloodGroup={blood}/> 
            </ScrollView>
             
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
            paddingBottom: 20,
            backgroundColor: "#f2f2f2",
            flex: 1,
            alignItems: 'center',
            width:"100%",
        },
        
    topTab:{
        backgroundColor: "#dc143c",
        width: "100%",
        height: 120,
        paddingTop: 50
        
    },
    locationPicker:{
        borderRadius:0, 
        width: "50%",
        backgroundColor: "#dc143c",
       
    },
    bloodPicker:{
        borderRadius:0, 
        width: "50%",
        backgroundColor: "#dc143c",
        borderLeftWidth: 1,
        borderLeftColor: "#fff",
       
        
    },
    buttonContainer:{
        justifyContent: 'center',
        backgroundColor:"white",
        height: 50,
        padding: 10
    },
    buttonText:{
        color: "#dc143c",
        fontSize: 22,
        fontWeight: "bold",
        marginTop: 0
    }
    
})
export default FindDonorScreen;