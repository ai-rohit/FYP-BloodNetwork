import React, {useContext} from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import colors from '../config/colors';
import {MaterialCommunityIcons} from "@expo/vector-icons";
import LoginScreen from "../screens/LoginScreen";
import { useLinkProps } from '@react-navigation/native';
import AuthContext from '../auth/context';

function HomeComponent({image, title, subTitle, icon, navigation}) {

    const {setUser} = useContext(AuthContext);
    
    const handleLogOut = ()=>{
        console.log("Logging out");
        fetch(`http://ea3bfb99c16d.ngrok.io/api/login_auth/out`,{method: 'GET'})
        .then((response)=> 
            response.json())
        .then((responseJson)=>{
            if(responseJson.status===true){
                setUser(null);   
            }else{
                alert("Something went wrong!");
            }
        })
        .catch((error)=> console.error(error))
        }
       
    return (
        <View style={styles.profile}>
            <Image style={styles.image} source={image}/>
            <View style={
                styles.profileContainer   
            }>
                <Text style={{color: 'white',
                            fontWeight: "600",
                            fontSize: 20}}>{title}</Text>
                <Text style={{color: 'white',
                            fontSize: 20,
                            fontWeight: "500",
                            marginTop: 5}}>{subTitle}</Text>
                
            </View>
            <Text style={styles.logout} onPress={handleLogOut}><MaterialCommunityIcons name={"logout"} size={30} color={colors.white}/>Logout</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    profile:{
        backgroundColor: "#dc143c",
        flexDirection: "row",
        alignItems: 'flex-start',
        justifyContent: "center",
        height: 300,
        padding: 20,
    },
    image:{
       width: 100,
       height: 100,
       borderRadius: 50,
       marginTop: 20,
       marginRight: 20,
       marginLeft: 20
      
    },
    profileContainer:{
        
        flexDirection: "column",
        paddingTop: 20,
        marginTop: 20
        //alignSelf: 'center'
    },
    logout:{
        flexDirection: "column",
        alignSelf: "flex-end",
        color: colors.white,
        fontSize: 20,
        fontWeight: "800",
        marginRight: 30,
        marginLeft: -20
    }
})

export default HomeComponent;