import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import {WebView} from 'react-native-webview'; 

  export const Failure= () => {
     
  return (
    <View style={styles.container}>
      <Text>Failure</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});


