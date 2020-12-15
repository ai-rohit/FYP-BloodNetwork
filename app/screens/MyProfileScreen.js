import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Platform } from 'react-native';
import colors from '../config/colors';

function MyProfileScreen(props) {
    return (
        <View style={styles.container}>
            <ScrollView style={{ paddingBottom: 20}}>
            <View style={styles.topView}>
                <View style={{justifyContent: 'center', alignItems: 'center',
                 position: 'absolute',
                 top: 110}}>
                <Image source={require("../assets/chair.jpg")} style={styles.imageProfile}/>
                <Text style={{fontWeight: "bold", fontSize: 25}}>Rohit Shrestha</Text>
                </View>
            </View>
            

            <View style={styles.profileDetails}>  
                <Text style={styles.textDetails}>Lives at Newroad, Pokhara</Text>
                <Text style={styles.textDetails}>Kaski, Gandaki, Nepal</Text>
                <Text style={styles.textDetails}>Email: shrestharohit553@gmail.com</Text>
            </View>
            <View style={styles.donorDetails}>  
                <Text>Donor details</Text>
                <Text style={styles.textDetails}>2 blood donations made till now</Text>
                <Text style={styles.textDetails}>Can sonate around Kaski area</Text>
                <Text style={styles.textDetails}>Blood type is A+</Text>
                <Text style={styles.textDetails}>Born on September 30, 2000</Text>
                <Text style={styles.textDetails}>Registered Donor in Blood Network</Text>

            </View>
            </ScrollView>
            
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
        flex: 1,
       
    },
    topView:{
        backgroundColor: colors.blood,
        height: 200,
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
        opacity: 0.7,
        flexDirection: 'row',
        justifyContent: 'center',
        
        
    },
    imageProfile:{
        width: 160,
        height: 160,
        borderRadius: 80,
        borderColor: '#fff',
        borderWidth: 4,
       
        
    },
    profileDetails:{
        paddingVertical: 20,
        alignItems: "center",
        alignSelf:"center",
        backgroundColor:"#f2f2f2",
        width: "90%",
        borderRadius: 15,
        marginTop: "35%"
    },
    textDetails:{
        fontSize: 18,
        fontFamily: Platform.OS==="ios"?"Avenir": "Roboto",
        fontWeight: "500",
    },
    donorDetails:{
        
        paddingVertical: 20,
        alignItems: "center",
        alignSelf:"center",
        backgroundColor:"#f2f2f2",
        width: "90%",
        borderRadius: 15,
        marginTop: 20
    }
})

export default MyProfileScreen;