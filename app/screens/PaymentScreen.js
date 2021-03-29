import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';
const PaymentWeb =  require("../components/index.html");

function PaymentScreen(props) {
    return (
        <SafeAreaView style={{flex:1, heigh:"100%"}}>
        <WebView
       
         originWhitelist={['*']}
        source={PaymentWeb}
        style={{ marginTop: 50}}
      />
      </SafeAreaView>
    );
}

export default PaymentScreen;