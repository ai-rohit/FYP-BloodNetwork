import React from 'react';
import { View, TouchableHighlight, Text, Image, StyleSheet } from 'react-native';

function RequestComponent({name, bloodGroup, address, age, contact}) {
    return (
        <View style={styles.requestContainer}>
        <View style= {styles.request}>
            <View style={{flexDirection: 'row'}}>
             <TouchableHighlight>
                 <Image style={styles.requesterImage} source={require("../assets/chair.jpg")}/>
             </TouchableHighlight>
             <View style={styles.detailContainer}>
                 <Text style={styles.txt}>Name: {name}</Text>
                 <Text style={styles.txt}>Blood Group: {bloodGroup}</Text>
                 <Text style={styles.txt}>Address: {address}</Text>
                 <Text style={styles.txt}>Age: {age}</Text>
                 
                 <Text style={styles.txt}>Contact: {contact}</Text>
             </View>
             </View>
             </View>
             </View>


    );
}
const styles = StyleSheet.create({
    requestContainer: {
        paddingTop: 20,
        backgroundColor: "#f2f2f2",
        
        alignItems: 'center',
    },
    request:{
        backgroundColor: "#fff",
        width: "90%",
        borderRadius: 20,
        
        
    },

    requesterImage:{
        height: 80,
        width: 80,
        borderRadius: 40,
        marginTop: 20,
        marginLeft: 10
    },
    detailContainer:{
        padding: 20,
        flexShrink: 1,
    },
    txt:{
        fontSize: 15,
        fontWeight: "600",
        padding: 3,
        
    },
})

export default RequestComponent;