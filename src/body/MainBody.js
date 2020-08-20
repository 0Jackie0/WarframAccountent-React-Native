import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

import ItemList from "./itemList/ItemList";

export default function MainBody() 
{
  return (
    <SafeAreaView>
        <ItemList/>
        {/* <Text>Happy text show on page</Text> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create(
    {
        
    }
);
