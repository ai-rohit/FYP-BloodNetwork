import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import RequestComponent from './RequestComponent';

function RequestList({items}) {
    return (
        <View>
            <FlatList
                data={items}
                keyExtractor={item => item.id.toString()}
                renderItem={({item})=>
                        <RequestComponent name={item.name} bloodGroup={item.bloodType} address={item.address}/>
                }
            />
        </View>
    );
}
const styles = StyleSheet.create({
    
})
export default RequestList;