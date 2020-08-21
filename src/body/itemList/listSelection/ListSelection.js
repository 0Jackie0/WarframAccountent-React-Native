import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown-v2';

export default function ListSelection(props) 
{
    let filterListTemplate = [];
    let orderListTemplate = []

    filterListTemplate.push(
        {
            label: "- - -",
            value: "-1"
        }
    );

    for(let index = 0; index < props.filterList.length; index ++)
    {
        filterListTemplate.push(
            {
                label: props.filterList[index].typeName,
                value: props.filterList[index].typeId,
            }
        );
    }

    for(let index = 0; index < props.orderList.length; index ++)
    {
        orderListTemplate.push(
            {
                label: props.orderList[index].orderName,
                value: props.orderList[index].orderId
            }
        );
    }

    return (
        <View style="listSelectionArea">
            {/* <View style="sellFunctionArea">
                <Button onClick={props.openSellString}>Sell Call</Button>
            </View> */}
            <View style="filterSearchArea">
                <View style={styles.searchArea}>
                    <TextInput
                        style={styles.textBoxContentStyle}
                        placeholder = "Search Item Name"
                        placeholderTextColor = "#0394fc"
                        autoCapitalize = "none"
                        onChangeText ={(text) => {props.searchFunction(text)}}/>
                </View>

                <View style={styles.dropdownArea}>
                    {/* <View style={styles.filterSelectionArea}> */}
                        {/* <Text style={styles.tagStyle}>Filter By: </Text> */}

                    <Dropdown
                        label="Filter By:"
                        data={filterListTemplate}
                        value={props.filterValue}

                        textColor="#000000"
                        itemColor="#005875"

                        containerStyle={styles.dropdownBoxStyle}
                        pickerStyle={styles.dropDownListStyle}
                        onChangeText={(text) => props.filterFunction(text)}
                    />

                    <Dropdown
                    label="Order By:"
                        data={orderListTemplate}
                        value={props.orderValue}

                        textColor="#000000"
                        itemColor="#005875"

                        containerStyle={styles.dropdownBoxStyle}
                        pickerStyle={styles.dropDownListStyle}
                        onChangeText={(text) => props.orderFunction(text)}
                    />
                    
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
            fontSize: 15
        },

        searchArea:
        {
            borderStyle: "solid",
            borderWidth: 3,
            borderColor: "#96d2ff",
            borderRadius: 10
        },
        dropdownArea:
        {
            flexDirection: "row",
            justifyContent: "space-between"
        },


        dropdownBoxStyle:
        {
            width: "45%",
        },
        dropDownListStyle:
        {
            backgroundColor: '#e6f9ff',
        },


        textBoxContentStyle:
        {
            fontSize: 24
        }
    }
);


{/* <DropDownPicker
                            items={filterListTemplate}
                            defaultValue={props.filterValue}
                            onChangeItem={(item) => {props.filterFunction(item.value)}}

                            itemStyle={styles.dropDownItemStyle}
                            dropDownStyle={styles.dropDownListStyle}

                            containerStyle={styles.dropdownBoxStyle}
                        /> */}
                        

                        {/* <Picker style={styles.dropdownStyle} selectedValue={props.filterValue} onValueChange={(itemValue,itemIndex) => {props.filterFunction(itemValue)}}>
                            <Picker.Item label="- - -" value="-1"/>
                            {props.filterList.map(filterOption => <Picker.Item key={filterOption.typeId} value={filterOption.typeId} label={filterOption.typeName}/>)}
                        </Picker> */}



{/* <View style={styles.orderSelectionArea}> */}
                        {/* <Text style={styles.tagStyle}>Order By: </Text> */}
                            

                        {/* <DropDownPicker
                            items={orderListTemplate}
                            defaultValue={props.orderValue}
                            onChangeItem={(item) => {props.orderFunction(item.value)}}

                            dropDownStyle={styles.dropDownListStyle}

                            containerStyle={styles.dropdownBoxStyle}
                        /> */}

                        {/* <Picker style={styles.dropdownStyle} selectedValue={props.orderValue} onValueChange={(itemValue,itemIndex) => {props.orderFunction(itemValue)}}>
                            {props.orderList.map(orderOption => <Picker.Item key={orderOption.orderId} value={orderOption.orderId} label={orderOption.orderName}/>)}
                        </Picker> */}
                    {/* </View> */}