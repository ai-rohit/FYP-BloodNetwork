import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RequestList from '../components/RequestList';
import colors from "../config/colors"

const request = [
    
        {name: "Rohit Shrestha", id: "bd1", bloodType: "A+", location: "Kaski", address: "Newroad, Pokhara", age: 20, contact:"9866014624", displayContact: "true"}
    
]

function Requests(props) {
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