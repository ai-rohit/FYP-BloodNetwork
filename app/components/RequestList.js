import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import RequestComponent from './RequestComponent';

function RequestList({items, navigation}) {
    const [itemList, setItemList] = useState();

    useEffect(()=>{  
        setItemList(items);
    }, []);
    
    return (
        
            <FlatList
                data={itemList}
                keyExtractor={item => item.requestId.toString()}
                renderItem={({item})=>
                        <RequestComponent name={item.receiverName} requestId={item.requestId} navigation={navigation}/>
                }
            />
        
    );
}
const styles = StyleSheet.create({
    
})
export default RequestList;