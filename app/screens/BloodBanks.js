import React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import MapView, { Marker } from 'react-native-maps';
import BloodBankList from '../components/BloodBankList';
import colors from "../config/colors"

function BloodBanks(props) {
    const [nearbyBloodBanks, setNearByBloodBanks] = useState([]);
    
    useEffect(()=>{
        fetch("http://ca946d24a8f1.ngrok.io/api/blood_banks")
        .then((response)=>response.json())
        .then((json)=> {
                    setNearByBloodBanks(json)})
        .catch((error)=> console.error(error))
    
    }, []);
    
    return (
        <View style={styles.container}>
            <MapView style={styles.map} initialRegion={{latitude: 28.216816, longitude: 83.985873,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,}}>
               
                <Marker
                coordinate={{latitude: 28.216816, longitude: 83.985873}}
                title={"My location"}
                description={"You re here right now"}
                />
            </MapView>

            <ScrollView>
                <View style={{backgroundColor: colors.blood, width: "100%", height: 50, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize:25, fontWeight: "bold", color: "#fff", }}>Blood Banks in Your Area</Text>
                </View>
                
                <BloodBankList items={nearbyBloodBanks}/>
            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        paddingBottom: 20
        
        
      },
    map:{
        width: "100%",
        height: "50%",
    }
})
export default BloodBanks;