import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import RequestComponent from './RequestComponent';

function RequestList({items}) {
    return (
        <View style={{flex: 1}}>
            <FlatList
                data={items}
                keyExtractor={item => item.requestId.toString()}
                renderItem={({item})=>
                        <RequestComponent name={item.receiverName} requestId={item.requestId}/>
                }
            />
        </View>
    );
}
const styles = StyleSheet.create({
    
})
export default RequestList;