import React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as Location from "expo-location";
import MapView, { Marker } from 'react-native-maps';
import BloodBankList from '../components/BloodBankList';
import colors from "../config/colors";
import baseUrl from '../config/baseUrl';

function BloodBanks(props) {
    //const [nearbyBloodBanks, setNearByBloodBanks] = useState([]);
    
    // const getUserLocation = async ()=>{
    //     const {granted} = await Location.requestPermissionsAsync();
    //     if(!granted) return;

    //     const {coords:{latitude, longitude}} = await Location.getCurrentPositionAsync();
    //     setLocation({latitude, longitude});

    // }

    // useEffect(()=>{
    //     fetch("http://ea3bfb99c16d.ngrok.io/api/blood_banks")
    //     .then((response)=>response.json())
    //     .then((json)=> {
    //                 setNearByBloodBanks(json)})
    //     .catch((error)=> console.error(error))
    
    // }, []);
    const nearbyBloodBanks = [{bankId: "bd1", hospitalName: "ABCasdasdasdasdaasdasdasdD", hospitalContact: "98989898", hospitalDistrict: "Kaski", hospitalLocation: "Newroad, Pokhara"},
     {bankId: "bd2", hospitalName: "ABCD", hospitalContact: "98989898", hospitalDistrict: "Kaski", hospitalLocation: "Newroad, Pokhara"},
     {bankId: "bd3", hospitalName: "ABCD", hospitalContact: "98989898", hospitalDistrict: "Kaski", hospitalLocation: "Newroad, Pokhara"}]
    return (
        <View style={styles.container}>
            <MapView style={styles.map} 
            provider="google"
            initialRegion={{latitude: 28.216816, longitude: 83.985873,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,}}>
               
                <Marker
                coordinate={{latitude: 28.216816, longitude: 83.985873}}
                title={"My location"}
                description={"You re here right now"}
                />
            </MapView>

            <View style={{flex: 1, backgroundColor:"f7f7f7"}}>
                <View style={{backgroundColor: colors.blood, width: "100%", height: 50, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize:25, fontWeight: "bold", color: "#fff", }}>Blood Banks in Your Area</Text>
                </View>
                
                    <BloodBankList items={nearbyBloodBanks}/>
                
            </View> 
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        paddingBottom: 20
    
      },
    map:{
        width: "100%",
        height: "40%",
        //flex: 1
    }
})
export default BloodBanks;