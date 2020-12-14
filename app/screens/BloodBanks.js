import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

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
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
    map:{
        width: "100%",
        height: "50%",
    }
})
export default BloodBanks;