import React from 'react';
import { StyleSheet, View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ItemList from "./itemList/ItemList";
import EditPage from "./editPage/EditPage";

const Stack = createStackNavigator();

export default function MainBody() 
{
  return (
    <NavigationContainer style={styles.mainBodyContainer}>
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="ItemList" component={ItemList} />
      <Stack.Screen name="EditPage" component={EditPage} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create(
    {
      mainBodyContainer:
      {
        flex: 1
      },
      itemListStyle:
      {
        // flex: 1
      }
    }
);
