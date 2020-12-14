import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import MapView, { Marker } from 'react-native-maps';
import BloodBankList from '../components/BloodBankList';
import colors from "../config/colors"

const nearbyBloodBanks = [
    {label: "ABCDEFGH Blood bank", contact: "1234567890", id: "bdb1"},
    {label: "ABC Blood bank", contact: "1234567890", id: "bdb2"},
    {label: "ABC Blood bank", contact: "1234567890", id: "bdb3"},
    {label: "ABC Blood bank", contact: "1234567890", id: "bdb4"},
    {label: "ABC Blood bank", contact: "1234567890", id: "bdb5"},
    {label: "ABC Blood bank", contact: "1234567890", id: "bdb6"},
    {label: "ABC Blood bank", contact: "1234567890", id: "bdb7"},
    {label: "ABC Blood bank", contact: "1234567890", id: "bdb8"},
    {label: "ABC Blood bank", contact: "1234567890", id: "bdb9"},
];

function BloodBanks(props) {
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