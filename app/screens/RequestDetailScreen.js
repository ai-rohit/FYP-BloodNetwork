import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Dimensions, Image, ScrollView } from 'react-native';
import AppButton from '../components/AppButton';
import {MaterialCommunityIcons, Entypo} from '@expo/vector-icons'
import colors from '../config/colors';
import baseUrl from '../config/baseUrl';

function RequestDetailScreen({route, navigation}) {
    const {reqId, reqDetails} = route.params;
    const[status, setStatus] = useState("");

    useEffect(()=>{  
        setStatus(reqDetails[0].requestStatus);
    }, []);
   
    const handleAccept = ()=>{
        alert("You're trying to accept huh but its still under development!")
    }

    const handleReject = ()=>{
        fetch(`${baseUrl.url}/api/bloodRequest/reject/${reqDetails[0].requestId}`,
        {
        method: 'PUT',
        headers: {Accept:'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify({"donorResponse":"abcdeffg"})})
        .then(response=>response.json())
        .then(responseJson=>{
            if(responseJson.status==true){
                alert("The response has been rejected");
                setStatus("rejected");
                // navigation.navigate("Requests");
            }
        })
    }
    
    const requestStatusView = ()=>{
        if(status==="pending"){
            return(
                <View style={{flexDirection: 'row', padding: 10, alignSelf: 'center'}}>
                    <AppButton title="Accept" style={{backgroundColor: colors.success, borderRadius: 10, width: "50%", marginRight: 5}} onPress={handleAccept}/>
                    <AppButton title="Reject" style={{backgroundColor: colors.primary, borderRadius: 10, width: "50%"}} onPress={handleReject}/>
                </View>
            );
        }else if(status==="rejected"){
            return(
                <View style={{alignSelf: 'center', flexDirection: 'row', width: "80%", marginTop: 10, justifyContent: 'center'}}>
                    <View style={{width: 40, height: 40, borderRadius:20, backgroundColor: "#fadce2", justifyContent: 'center', alignItems: 'center'}}>
                        <Entypo name="cross" size={30} color={colors.blood}/>
                    </View>
                    <Text style={{alignSelf: 'center', color: colors.blood, fontSize: 15, marginLeft: 8, fontWeight: "600"}}>You rejected the request of {reqDetails[0].receiverName}.</Text>
                </View>
            );
        }else if(status==="accepted"){
            return(
                <View style={{alignSelf: 'center', flexDirection: 'row', width: "80%", marginTop: 10, justifyContent: 'center'}}>
                    <View style={{width: 40, height: 40, borderRadius:20, backgroundColor: "#ADEFD1FF", justifyContent: 'center', alignItems: 'center'}}>
                        <Entypo name="check" size={30} color={colors.success} style={{opacity: 0.5}}/>
                    </View>
                    <Text style={{alignSelf: 'center', color: colors.success, fontSize: 15, marginLeft: 10, fontWeight: "600"}}>You accepted the request of Ram Bahadur Shrestha. Please wait for the response from requester.</Text>
                </View>
            );
        }else if(status==="donated"){
            return(
                <View>
                    <Text>The requester has already approved your blood donation</Text>
                </View>
            );
        }else{
            return(
                <View>
                    <Text>Evaluating request status.</Text>
                </View>
            );
        }
    }
    
    return (
       <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
           <View style={styles.firstView}>
                <View style={styles.textContent}>
                    <View style={{marginBottom: 20, width: "100%", marginLeft: 5}}>
                        <Text style={{fontSize: 16, fontWeight: "500", color: "grey"}}>Request From</Text>
                        <Text style={{fontSize: 25, fontWeight: "800", width: "100%", marginTop: 5}}>{reqDetails[0].receiverName}</Text>
                    </View>
                    <View style={{marginTop: 10, marginBottom: 10, width:"100%"}}>
                        <View style={{flexDirection: 'row', justifyContent:"space-between", marginLeft: 10}}>
                            <View style={{flexDirection:"column"}}>
                                <Text style={{fontSize: 16, fontWeight: "500", color: "grey", marginBottom: 5}}>
                                    Blood
                                </Text>
                                <Text style={{fontSize: 18, fontWeight: "800", alignSelf: 'center'}}>
                                {reqDetails[0].bloodType}
                                </Text>
                            </View>

                            <View style= {{flexDirection: 'column', marginRight: 20}}>
                                <Text style={{fontSize: 16, fontWeight: "500", color: "grey", marginBottom: 5}}>Requirement Time</Text>
                                <Text style={{fontSize: 18, fontWeight: "800", alignSelf: 'center'}}>{reqDetails[0].requirementDays}</Text>
                            </View>
                        </View> 
                    </View>
                </View>
                <Image source={require("../assets/chair.jpg")} style={styles.image}/>
                
           </View>
               
           <View style={styles.secondView}>
               <View style={{width:"90%", alignSelf: 'center', marginTop: 20}}>
                   <View style={styles.textsContainer}>
                        <View style={styles.iconContainer}>
                            <MaterialCommunityIcons name="information-outline" size={25}/>
                        </View>
                        <Text style={styles.headText}> 
                            Detail of Request
                        </Text>
                    </View>

                    <Text style={styles.descriptionText}>
                    {reqDetails[0].donationDetails}
                    </Text>

                    <View style={styles.textsContainer}>
                        <View style={styles.iconContainer}>
                            <Entypo name="address" size={25}/>
                        </View>
                        <Text style={styles.headText}>
                            Provided Address: {reqDetails[0].receiverAddress}
                        </Text>
                    </View>

                    <View style={styles.textsContainer}>
                        <View style={styles.iconContainer}>
                            <MaterialCommunityIcons name="phone" size={25}/>
                        </View>
                        <Text style={styles.headText}>
                            Phone number: {reqDetails[0].receiverNumber}
                        </Text>
                    </View>

                    <View style={styles.textsContainer}>
                        <View style={styles.iconContainer}>
                            <MaterialCommunityIcons name="hospital" size={25}/>
                        </View>
                        <Text style={styles.headText}>
                            Donation Type: {reqDetails[0].donationType}
                        </Text>
                    </View>
                </View>
                
                <View style={{marginBottom: 10}}>
                 {requestStatusView()}
                </View>
            </View>
       </ScrollView>
    );
}

const styles = StyleSheet.create({
    container:{
        alignItems: "center",
        flexGrow: 1,
        backgroundColor: colors.blood,
        opacity: 0.8
    },
    firstView:{
        backgroundColor: colors.white,
        //height: Dimensions.get("window").height*0.22,
        width: "90%",
        borderRadius: 30,
        justifyContent: 'center',
        marginTop: Dimensions.get("window").height/12,
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textContent:{
        width: "70%",
        marginTop: 20,
        marginLeft: 10
    },

    image:{
        height: "80%",
        width: "25%",
        alignSelf: 'center',
        borderRadius: 25,
        marginRight: 20,
        
    },
    secondView:{
        backgroundColor: "#f7f7f7",
       
        width: Dimensions.get("window").width,
        marginTop: 30,
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        flexGrow: 1
    },
    iconContainer:{
        width: 40,
        height: 40,
        backgroundColor: "#d6cfc7", 
        borderRadius: 8, 
        opacity: 0.5, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    textsContainer:{
        alignItems: 'center',
        flexDirection: 'row',
        margin: 10
    },
    headText:{
        marginLeft: 10,
        fontWeight: "600",
        opacity: 0.8,
        fontSize: 16
    },
    descriptionText:{
        marginLeft: 60,
        fontSize: 18,
        marginTop: -10,
        fontWeight: "600",
        
    }
})

export default RequestDetailScreen;