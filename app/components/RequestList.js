import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import RequestComponent from './RequestComponent';

function RequestList({items}) {
    return (
        <View>
            <FlatList
                data={items}
                keyExtractor={item => item.reqId.toString()}
                renderItem={({item})=>
                        <RequestComponent name={item.name} bloodGroup={item.bloodType} address={item.address} donationDetails={item.details}
                                        contact={item.contact} donationType={item.donationType} requiredDay={item.reqDay}/>
                }
            />
        </View>
    );
}
const styles = StyleSheet.create({
    
})
export default RequestList;