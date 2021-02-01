import  React, {useEffect, useState} from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Alert, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import ProfileComponent from '../components/ProfileComponent'
import {MaterialCommunityIcons} from "@expo/vector-icons"
import colors from '../config/colors';
function HomeScreen(props) {

    const[userProfile, setUserProfile] = useState([]);
    
    useEffect(()=>{
        fetch(`http://ca946d24a8f1.ngrok.io/api/profile/me`)
        .then((response)=> response.json())
        .then((json)=> setUserProfile(json))
        .catch((error)=> console.error(error))
    });

    return (
        <View style={styles.homeContainer}>
            <ScrollView style={{width:"100%"}}>

            <View style={styles.homeProfile}>
                <ProfileComponent image={require("../assets/chair.jpg")}
                title={`${userProfile.firstName} ${userProfile.lastName}`}
                subTitle={userProfile.address} navigation={props.navigation}
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
                        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingTop: 10, marginLeft: 170}}>
                            <Text style={{fontSize: 16, fontWeight: "500", color: colors.blood}}>Find Now</Text>
                            <MaterialCommunityIcons name={"chevron-right"} size={20} color={colors.blood}/>
                        </View>
                        
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

                        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingTop: 10, marginLeft: 130}}>
                            <Text style={{fontSize: 16, fontWeight: "500", color: colors.blood}}>Become Donor</Text>
                            <MaterialCommunityIcons name={"chevron-right"} size={20} color={colors.blood}/>
                        </View>
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

                        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingTop: 10, marginLeft: 150}}>
                            <Text style={{fontSize: 16, fontWeight: "500", color: colors.blood}}>Find Banks</Text>
                            <MaterialCommunityIcons name={"chevron-right"} size={20} color={colors.blood}/>
                        </View>

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