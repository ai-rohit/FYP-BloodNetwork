import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TextInput, Modal, Button, FlatList, Switch, TouchableHighlight, TouchableWithoutFeedback, TouchableOpacity, ScrollView,Platform, KeyboardAvoidingView } from 'react-native';
import {MaterialCommunityIcons} from "@expo/vector-icons";
import Constants from "expo-constants";
import {RadioButton} from "react-native-paper";
import {  } from 'react-native-gesture-handler';
import PickerComponent from '../components/PickerComponent';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import AppButton from '../components/AppButton';

const districts = [
    {label: "Kathmandu", value: "dist1"},
    {label: "Kaski", value: "dist2"},
    {label: "Chitwan", value: "dist3"},
    {label: "Dang", value: "dist4"},
    {label: "Bara", value: "dist5"},
    {label: "Bhaktapur", value: "dist6"},
    {label: "Lalitpur", value: "dist7"},
    {label: "Mustang", value: "dist8"},
    {label: "Manang", value: "dist9"},
    {label: "Palpa", value: "dist10"},
    {label: "Butwal", value: "dist11"},
    {label: "Mugu", value: "dist12"},
    {label: "Dolpa", value: "dist13"},
    {label: "Ilam", value: "dist14"},
    {label: "Parsa", value: "dist15"},
    {label: "Tanahu", value: "dist16"},
];

const provinces = [
    
        {label: "Bagmati", value:"prov1"},
        {label: "Gandaki", value:"prov2"},
    
];

const bloodGroups = [
    
    {label: "O+", value:"bld1"},
    {label: "A+", value:"bld2"},

];


function BecomeDonor({title}) {
    const [district, setDistrict] = useState();
    const [province, setProvince] = useState();
    const [bloodGroup, setBloodGroup] = useState();
    const [checkedGender, setCheckedGender] = useState();
    const [date, setDate] = useState();
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
    const [displayContact, setDisplayContact] = useState(false);
    
//    console.log(district);
//    console.log(province);
    const handleContactToggle= ()=> setDisplayContact(!displayContact);
    // console.log(province)
   const handleConfirm=(date)=>{
       setDate(date);
       hideDatePicker();
   }

   const hideDatePicker= ()=>{
       setIsDatePickerVisible(false)
   }

   const handleDateTimePicker = ()=>
   {
       setIsDatePickerVisible(true)
   }

    return (
        
      
            // {/* <Text>Hello</Text>
            // <Switch
            //     value={displayContact}
            //     onValueChange={handleToggleSwitch}
            // />

            // <Picker selectedValue={province} style={{height: 50, width: "100%"}}
            //         onValueChange={(value)=> setProvince(value)}
            // >
            //     <Picker.Item label="Java" value="java"/>
            //     <Picker.Item label="JavaScript" value="js"/>
            // </Picker> */}

             
            <ScrollView style={{width: "100%", backgroundColor: "#f2f2f2"}}>
                <View style={styles.try}>
                   <Text>Helloasdhasdasdlkansdlnasldaskjd</Text>
                </View>
                <View style={{width: "100%", justifyContent: "center", alignItems: "center", marginVertical: 20}}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>First Name</Text>
                        <TextInput style={styles.textInput} autoCapitalize="none" placeholder="First Name" keyboardType="default" clearButtonMode="always"/>
                    </View> 

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Last Name</Text>
                        <TextInput style={styles.textInput} autoCapitalize="none" placeholder="Last Name" secureTextEntry={false} clearButtonMode="always"/>
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Address</Text>
                        <TextInput style={styles.textInput} autoCapitalize="none" placeholder="Last Name" secureTextEntry={false} clearButtonMode="always"/>
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>District</Text>
                        <PickerComponent selectedItem={district} onSelectedItem={item=> setDistrict(item)} title= "Choose a District" items={districts}/>
                    </View>
                    
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Province</Text>
                        <PickerComponent selectedItem={province} onSelectedItem={item=> setProvince(item)} title= "Choose a Province" items={provinces}/>
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Mobile number</Text>
                        <TextInput style={styles.textInput} autoCapitalize="none" placeholder="Mobile num." keyboardType="numeric" secureTextEntry={false} clearButtonMode="always"/>
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Your Blood Group</Text>
                        <PickerComponent selectedItem={bloodGroup} onSelectedItem={item=> setBloodGroup(item)} title= "Choose a Blood Group" items={bloodGroups}/>
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Gender</Text>
                        <View style={{flexDirection: "row", width: "85%",  height: 50, backgroundColor: "#C8C8C8", paddingLeft: 20, borderRadius:15}}>
                                <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                                    <TouchableWithoutFeedback onPress={()=> setCheckedGender("male")}>
                                            <Text style={styles.radioStyle}>Male</Text>
                                    </TouchableWithoutFeedback>
                                <RadioButton
                                    value="male"
                                    status= {checkedGender === 'male' ? 'checked' : 'unchecked'}
                                    onPress={()=> setCheckedGender("male")}
                                    uncheckedColor="#dc143c"
                                    color="#dc143c"/>    
                                </View>

                                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", borderLeftWidth:1, borderLeftColor: "#f4f8f8"}}>
                                <TouchableWithoutFeedback onPress={()=> setCheckedGender("female")}>
                                         <Text style={styles.radioStyle}>Female</Text>
                                </TouchableWithoutFeedback>
                               
                                    <RadioButton
                                    value="female"
                                    status= {checkedGender === 'female' ? 'checked' : 'unchecked'}
                                    onPress={()=> setCheckedGender("female")}
                                    uncheckedColor="#dc143c"
                                    color="#dc143c"/>
                                </View>
                            
                            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", borderLeftWidth:1, borderLeftColor: "#f4f8f8"}}>
                                <TouchableWithoutFeedback onPress={()=> setCheckedGender("others")}>
                                         <Text style={styles.radioStyle}>Others</Text>
                                </TouchableWithoutFeedback>
                            <RadioButton
                                    value="second"
                                    status= {checkedGender === 'others' ? 'checked' : 'unchecked'}
                                    onPress={()=> setCheckedGender("others")}
                                    uncheckedColor="#dc143c"
                                    color="#dc143c"/>
                            </View>
                        </View>
                        
                       
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Date of Birth</Text>
                        <TouchableWithoutFeedback onPress={handleDateTimePicker} >
                            <View style={styles.dateTimePicker}>
                            <Text style={{fontSize: 18,}}>{date ? moment(date).format('MMMM Do YYYY'): "Select a Date" }</Text>
                            <MaterialCommunityIcons name="calendar" size={20} style={{marginLeft: 20}}/>
                            </View>
                            
                        </TouchableWithoutFeedback>
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <View style={{flexDirection: "row"}}> 
                        <Switch value={displayContact}
                        onValueChange={handleContactToggle}/>
                        <Text style={{fontSize: 18, marginLeft:10, marginTop: 5, color: "#000", fontWeight: "bold"}}>Display contact to requesters</Text>
                        
                        </View>
                        
                    </View>

                    <AppButton title="Register as Donor" color="blood"/>
                </View>
            </ScrollView>
               
          
            
        
    );
        }

const styles = StyleSheet.create({
    container:{
        backgroundColor: "#dc143c",
        width: "100%",
    }, 
    try:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#dc143c",
        borderBottomEndRadius: 20,
        borderBottomLeftRadius: 20,
        height:200
    },
    textInput:{
        borderRadius: 25,
        borderBottomWidth: 1,
        height: 40,
        width: "90%",
        fontSize: 18,
        paddingLeft: 20 ,
        color: "#a9a9a9"
        
    },
    inputContainer:{
        width: "100%",
        margin: 15,
        justifyContent: "center",
        alignItems: "center"
    },
    label:{
        fontSize: 18,
        fontFamily: Platform.OS === "android"?"Roboto": "Avenir",
        fontWeight: "600",
        alignSelf: "flex-start",
        marginLeft: 30,
        
    },
    radioStyle:{
        fontSize: 18,
        marginLeft: 10
    },
    dateTimePicker:{
        backgroundColor: "#C8C8C8",
        borderRadius: 15,
        flexDirection: "row",
        width: "85%",
        padding: 15,
        justifyContent: "center"
    }
})


export default BecomeDonor;
