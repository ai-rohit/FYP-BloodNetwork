import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import colors from '../config/colors';

function HomeComponent({image, title, subTitle, icon}) {
    return (
        <View style={styles.profile}>
            <Image style={styles.image} source={image}/>
            <View style={{
                marginTop: 60,
                marginLeft: 20
            }}>
                <Text style={{color: 'white',
                            fontWeight: "600"}}>{title}</Text>
                <Text style={{color: 'white',
                            fontWeight: "500",
                            marginTop: 5}}>{subTitle}</Text>
                
                <Image source={icon}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    profile:{
        backgroundColor: "#dc143c",
        flexDirection: "row",
        height: 300,
        padding: 10,
    },
    image:{
       width: 70,
       height: 70,
       borderRadius: 35,
       marginLeft: 25,
       marginTop: 45
    }
})

export default HomeComponent;