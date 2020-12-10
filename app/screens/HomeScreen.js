import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Alert } from 'react-native';
import Constants from 'expo-constants';
import ProfileComponent from '../components/ProfileComponent'
import { ScrollView } from 'react-native-gesture-handler';
function HomeScreen(props) {
    return (
        <View style={styles.homeContainer}>
            <ScrollView style={{width:"100%"}}>

            <View style={styles.homeProfile}>
                <ProfileComponent image={require("../assets/chair.jpg")}
                title="Rohit Shrestha"
                subTitle="Newroad-8, Pokhara"
                // icon={require("../assets/chair.jpg")}
                />
            </View>
            
            <View style={{justifyContent: "center", alignItems: "center"}}>
            <TouchableOpacity style={styles.homeButton} onPress={()=> props.navigation.navigate('FindDonor')}>
                <View style={styles.home}>
                    <Image style={styles.image} source={require("../assets/chair.jpg")}/>
                    <View style={{ flexShrink: 1}}>
                        <Text style={{fontSize: 18, fontWeight: '500'}}>Find Donors</Text>
                        <Text style={{color: "#6e6969", fontSize: 14, fontWeight: '300'}}>You can find donors around your location
                            and request them for the blood 
                            donation for
                            the blood you need.
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.homeButton} onPress={()=> props.navigation.navigate("BecomeDonor")}>
                <View style={styles.home}>
                    <Image style={styles.image} source={require("../assets/chair.jpg")}/>
                    <View style={{ flexShrink: 1}}>
                        <Text style={{fontSize: 18, fontWeight: '500'}}>Become a Donor</Text>
                        <Text style={{color: "#6e6969", fontSize: 14, fontWeight: '300'}}>You can be a donor right now. Just fill the
                         required details and you are all ready to
                          help and donate blood around you.
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.homeButton} onPress={()=> props.navigation.navigate("BloodBank")}>
                 <View style={styles.home}>
                    <Image style={styles.image} source={require("../assets/chair.jpg")}/>
                    <View style={{ flexShrink: 1, marginVertical: 10}}>
                        <Text style={{fontSize: 18, fontWeight: '500'}}>Blood Banks Near Me</Text>
                        <Text style={{color: "#6e6969", fontSize: 14, fontWeight: '300'}}>Blood banks are always short of bloods. 
                        Lookfor the blood banks near
                         you and help them by donating blood.
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
            </View>
           
            </ScrollView>
        </View>
            );

}

const styles = StyleSheet.create({
    homeContainer:{
        backgroundColor: "#D3D3D3",
        flex: 1,
        alignItems: 'center',
        paddingTop: Constants.statusBarHeight,
        marginTop: -50
    },
    
    homeButton:{
        marginVertical: 10,
        width: "90%",

    },
    home:{
        backgroundColor: "white",
        flexDirection: "row",
        borderRadius: 15,
        padding: 10
    },
    image:{
       width: 30,
       height: 30,
       borderRadius: 15,
       marginHorizontal: 10,
       marginTop: 20 
    },
    homeProfile:{
        marginTop: 5,
        width: "100%",
    }

})

export default HomeScreen;