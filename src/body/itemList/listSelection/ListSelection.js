import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';



export default function ListSelection(props) 
{
    return (
        <View style="listSelectionArea">

            <View style="sellFunctionArea">
                <Button onClick={props.openSellString}>Sell Call</Button>
            </View>
            <View style="filterSearchArea">
                <View style="searchArea">
                    <Text style="tagStyle">Search </Text>
                    <TextInput
                        underlineColorAndroid = "transparent"
                        placeholder = "Item Name"
                        // placeholderTextColor = "#9a73ef"
                        autoCapitalize = "none"
                        onChangeText ={(event) => {props.searchFunction(event.target.value)}}/>
                    {/* <input type="text" placeholder="Item Name" onChange={(event) => {props.searchFunction(event.target.value)}}/>  */}
                </View>

                <View style="dropdownArea">
                    <View style="filterSelectionArea">
                        <Text style="tagStyle">Filter By: </Text>
                        <select style="dropdownStyle" onChange={(event) => {props.filterFunction(event.target.value)}}>
                            <option value="-1">- - -</option>
                            {props.filterList.map(filterOption => <option key={filterOption.typeId} value={filterOption.typeId}>{filterOption.typeName}</option>)}
                        </select>
                    </View>

                    <View style="orderSelectionArea">
                        <Text style="tagStyle">Order By: </Text>
                        <select style="dropdownStyle" onChange={(event) => {props.orderFunction(event.target.value)}}>
                            {props.orderList.map(orderOption => <option key={orderOption.orderId} value={orderOption.orderId}>{orderOption.orderName}</option>)}
                        </select>
                    </View>
                </View>
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
    }
);
