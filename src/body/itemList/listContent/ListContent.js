import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native'

import itemImage from "../../../assets/220px-Warframe_Cover_Art.png"
import upImage from "../../../assets/up-arrow.png"
import downImage from "../../../assets/down-arrow.png"

export default function ListContent(props) 
{
  return (
    <View style={styles.itemAreaUp}>
      <View style={styles.itemArea} onClick={() => {props.openEdit(props.item)}}>
          <View style="imageArea">
              <Image style={styles.imageSize} source={ props.item.imageString !== "" ? "data:image/png;base64," + props.item.imageString : itemImage} alt="item" />
          </View>

          <View style="itemInfoArea">
                <View style={styles.horizontallyPlacemant}>
                  <Text numberOfLines={1} style={[{flex: 1}, styles.tagStyle]}>{props.item.name}</Text>
                </View>

              <View style={styles.horizontallyPlacemant}>
                  <View style={styles.horizontallyPlacemant}><Text style={styles.tagStyle}>Quantity: </Text><Text>{props.item.quantity}</Text></View>
                  <Text numberOfLines={1} style={{width: 120}}>{"  " + props.typeName.substring(0,3) + props.typeName.substring(8,props.typeName.lentgh)}</Text>
              </View>
                
              <View style={styles.horizontallyPlacemant}>
                  <Text style={styles.tagStyle}>Base Price: </Text><Text>{props.item.bprice}</Text>
              </View>

              <View style={styles.horizontallyPlacemant}>
                  <Text style={styles.tagStyle} numberOfLines={1}>Expected Price: </Text><Text>{props.item.eprice}</Text>
              </View>
          </View>
      </View>
      <View style="itemFunctionArea">
        <TouchableOpacity style="" activeOpacity={0.5} onPress={() => {props.addFunction(props.item.itemId)}}>
          <Image source={upImage} style={styles.imageButtonSize}/>
        </TouchableOpacity>
        <TouchableOpacity style="" activeOpacity={0.5} onPress={() => {props.removeFunction(props.item.itemId)}}>
          <Image source={downImage} style={styles.imageButtonSize}/>
        </TouchableOpacity>
      </View>
  </View>
  );
}

const styles = StyleSheet.create(
    {
      tagStyle:
      {
        fontWeight: "bold"
      },

      itemAreaUp:
      {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
      },
      itemArea:
      {
        width: "80%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
      },
      itemFunctionArea:
      {
        width: "20%"
      },
      imageButtonSize:
      {
        width: 65,
        height: 65
      },
      imageSize:
      {
        width: 100,
        height: 100
      },
      horizontallyPlacemant:
      {
        flexDirection: "row",
      }
    }
);
