import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, safe } from 'react-native';

import MainBody from './src/body/MainBody';

export default function App() 
{
  return (
    <View style={styles.bodyArea}>
      <MainBody/>
    </View>
  );
}

const styles = StyleSheet.create(
  {
    bodyArea:
    {
      marginTop: 30
    }
  }
);
