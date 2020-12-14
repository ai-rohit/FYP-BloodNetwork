import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, FlatList, Modal, TouchableWithoutFeedback, View, Button } from 'react-native';
import {MaterialCommunityIcons} from "@expo/vector-icons";
import Constants from "expo-constants";


function PickerComponent({title, items, onSelectedItem, selectedItem, style, textStyle}) {

    
   
    const [modalVisible, setModalVisible]= useState(false);   
    

    return (
       <>

            <TouchableWithoutFeedback onPress={()=> setModalVisible(true)}>  
                <View style={[styles.container, style]}>
                    <Text style={[{fontSize:18}, textStyle]}>{selectedItem ? selectedItem.label: title}</Text>
                    <View>
                    <MaterialCommunityIcons name={"chevron-down"} size={25}/>
                    </View>
                    
                </View>
            </TouchableWithoutFeedback>

            <Modal visible={modalVisible} animationType="slide">
                <View style={{paddingTop: Constants.statusBarHeight, marginBottom: 20}}>
                     <Button title="Close" onPress={()=> setModalVisible(false)} color="dodgerblue" style={{}}/>
                </View>

                <FlatList
                    data={items}
                    keyExtractor = {item=> item.value.toString()}
                    renderItem={({item}) => ( <TouchableOpacity onPress={()=> {
                        setModalVisible(false);
                        // setDistrict(item.label);
                        // setProvince(item.label);
                        onSelectedItem(item);
                        

                        }} style={{justifyContent:"center", alignItems:"center"}}>
                                     <Text style={{padding: 10, fontWeight: "500", fontSize: 20}}>{item.label}</Text>
                        </TouchableOpacity>
                    )}
                    ItemSeparatorComponent={()=> <View style={{width:"100%", height:1, backgroundColor: "#f2f2f2"}}/>}/>
            </Modal>
       </>
    );
    
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#C8C8C8",
        borderRadius: 15,
        flexDirection: "row",
        width: "85%",
        padding: 15,
        justifyContent: "center"
        
    }, 
})

export default PickerComponent;