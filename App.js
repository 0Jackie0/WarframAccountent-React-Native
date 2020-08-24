import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, safe } from 'react-native';

import MainBody from './src/body/MainBody';

export default function App() 
{
  return (
    <SafeAreaView style={styles.bodyArea}>
      <MainBody/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create(
  {
    bodyArea:
    {
      marginTop: 30,
      flex: 1
    },
    mainbodyStyle:
    {
      flex: 1
    }
  }
);
