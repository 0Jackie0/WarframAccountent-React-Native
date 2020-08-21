import React from 'react';
import { StyleSheet, View } from 'react-native';

import ItemList from "./itemList/ItemList";

export default function MainBody() 
{
  return (
    <View>
        <ItemList/>
        {/* <Text>Happy text show on page</Text> */}
    </View>
  );
}

const styles = StyleSheet.create(
    {
        
    }
);
