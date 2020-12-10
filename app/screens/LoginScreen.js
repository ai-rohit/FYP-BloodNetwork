import React from 'react';
import { SafeAreaView, StyleSheet, TextInput, Text, View, Platform, TouchableOpacity } from 'react-native';
import AppButton from '../components/AppButton';

function LoginScreen({navigation}) {
    return (
       <SafeAreaView style={styles.container}>
           <Text style={{color: "#770001",
                        fontSize: 30,
                        fontWeight: "bold",
                        marginLeft: Platform.OS==="android"? 35:35,
                        marginTop: 20,
                        marginBottom: -20
                        }}>Welcome to Blood Network!</Text>

            <View style={{width: "100%", marginTop: -30}}>
                
            <View style={{width: "100%", justifyContent: "center", alignItems: "center", marginVertical: 80}}>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Username, Email</Text>
                    <TextInput style={styles.textInput} autoCapitalize="none" placeholder="Email, Username or number" keyboardType="email-address" clearButtonMode="always"/>
                </View> 

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Password</Text>
                    <TextInput style={styles.textInput} autoCapitalize="none" placeholder="Password" maxLength={16} secureTextEntry={true}/>
                </View>
            </View>

            <TouchableOpacity>
                <Text style={{color: "red", marginTop: -80,
                 marginLeft: Platform.OS ==="ios"? 230: 250}}>Forgot Password?</Text>
            </TouchableOpacity>

            <View style={{width: "100%", justifyContent:"center", alignItems:"center", marginTop: -35}}>
                <AppButton title="Login" onPress={()=> navigation.navigate('Home')}/>
            </View>

            <View style={styles.signup}>
                        <Text>Don't have a account? </Text><TouchableOpacity><Text style={{color: "#000", fontWeight: "bold"}}>Sign Up</Text></TouchableOpacity> 
            </View>
            </View>            
            
            
            
              
         </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#FFFFFF",
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
        // alignContent: "center"
    },
    textInput:{
        borderRadius: 25,
        borderBottomWidth: 1,
        height: 40,
        width: "90%",
        fontSize: 18,
        paddingLeft: 20 ,
        color: "#a9a9a9"
        
    },
    text:{
        fontSize: 35,
        fontWeight: "bold",
        color: "#dc143c"
    },
    inputContainer:{
        width: "100%",
        margin: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    label:{
        fontSize: 18,
        fontFamily: Platform.OS === "android"?"Roboto": "Avenir",
        fontWeight: "600",
        alignSelf: "flex-start",
        marginLeft: 30,
        marginTop: 20
    },
    signup:{
        justifyContent: "center",
        flexDirection: "row",
    }
    
})
export default LoginScreen;