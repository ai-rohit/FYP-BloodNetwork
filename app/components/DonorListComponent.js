import React from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Constants from "expo-constants";
import RenderDonorList from './RenderDonorList';

function DonorListComponent({items}) {
       
        return(
            

                <FlatList
                    data={items}
                    keyExtractor = {item=> item.id.toString()}
                    renderItem={({item}) => ( <RenderDonorList name={item.name} bloodGroup={item.bloodType} address={item.address} age={item.age}
                            contact={item.contact} displayContact={item.displayContact}/>
                    )}
                   />
           
            
);
      
    }
export default DonorListComponent;