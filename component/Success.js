import React from 'react';
import { View,Text, StyleSheet } from 'react-native';
import {WebView} from 'react-native-webview'; 

  export const Success= () => {
     console.log('check success');
  return (
    <View style={styles.container}>
     <Text>Success</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height:1000,

  }
});


