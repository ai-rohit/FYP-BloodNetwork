import React, {useEffect} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useState } from 'react/cjs/react.development';
import RequestList from '../components/RequestList';
import colors from "../config/colors";
import baseUrl from "../config/baseUrl";


// const request = [
    
//         {name: "Rohit Shrestha", reqId: "bd1", bloodType: "A+", address: "Newroad, Pokhara", contact:"9866014624",
//         details: "Need donation as my friend has suffered from corona virus", donationType: "Plasma", reqDay: "emergency"},
//         {name: "Rohit Shrestha", reqId: "bd2", bloodType: "A+", address: "Newroad, Pokhara", contact:"9866014624",
//         details: "Need donation as my friend has suffered from corona virus", donationType: "Plasma", reqDay: "emergency"}

    
// ]

function Requests(props) {
    const[request, setRequest] = useState();
    const[loading, setLoading] = useState("");

    useEffect(()=>{
        fetch(`${baseUrl.url}/api/bloodRequest`,{method: 'GET'})
        .then((response)=> 
            response.json())
        .then((responseJson)=>{
            console.log(responseJson);
            if(responseJson.status===true){
                setRequest(responseJson.results);   
            }else{
                alert("Something went wrong!");
            }
        })
        .catch((error)=> console.error(error))
        }, []
    );

    return (
        <View style={styles.container}>
            <View style={styles.topView}>
                <Text style={{
                    color: "#fff",
                    fontSize: 30,
                    fontWeight: "bold",
                    alignSelf: 'center',
                    marginLeft: 20

                }}>Blood Requests</Text>
            </View>

            <RequestList items={request}/>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        width: "100%",
        flex: 1,
        backgroundColor: "#f2f2f2"
    },
    topView:{
        backgroundColor: colors.blood,
        height: 100,
        opacity: 0.7,
        flexDirection: 'row'
    }
    
})

export default Requests;