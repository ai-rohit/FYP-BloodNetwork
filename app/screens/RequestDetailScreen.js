import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

function RequestDetailScreen({route, navigation}) {
    const {reqId, reqDetails} = route.params;
    return (
       <View style={styles.container}>
           <Text>Details: {JSON.stringify(reqDetails)}</Text>
       </View>
    );
}

const styles = StyleSheet.create({
    container:{
        alignItems: "center",
        justifyContent: 'center',
        flex: 1
    }
})

export default RequestDetailScreen;