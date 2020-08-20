import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';



export default function ListHeader(props) 
{
    let totalQuantity = 0;
    let totalPrice = 0;

    for(let itemIndex in props.itemList)
    {
        totalPrice += props.itemList[itemIndex].eprice * props.itemList[itemIndex].quantity;
        totalQuantity += props.itemList[itemIndex].quantity;
    }

    return (
        <View style={styles.contentArea}>
            <View style={styles.horizontallyPlacemant}>
                <Text style={styles.tagStyle}>Total Quantity: </Text><Text>{totalQuantity}</Text>
            </View>
            <View style={styles.horizontallyPlacemant}>
                <Text style={styles.tagStyle}>Total Price: </Text><Text>{totalPrice}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create(
    {
        horizontallyPlacemant:
      {
        flexDirection: "row",
      },
      tagStyle:
      {
        fontWeight: "bold",
      },
      contentArea:
      {
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
      }
    }
);
