import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-paper';



const orderList = [
    {
        orderId: 1,
        orderName: "Name"
    },
    {
        orderId: 2,
        orderName:"Quantity"
    }
]
export default class EditPage extends Component
{
    constructor(props)
    {
        super(props);

        let propsTarget = {
            imageString: "",
            bprice: 0,
            eprice: 0,
            itemId: -1,
            name: "",
            quantity: 0,
            type: this.props.route.params.itemType[0].typeId,
        };

        if(this.props.route.params.target)
        {
            propsTarget = this.props.route.params.target
        }

        this.state = {
            target: propsTarget,
            itemType: this.props.route.params.itemType,
            itemTypeListTemplate: this.createItemTypeDropdownTemplate()
        }
    }

    componentDidMount()
    {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            let propsTarget = {
                imageString: "",
                bprice: 0,
                eprice: 0,
                itemId: -1,
                name: "",
                quantity: 0,
                type: this.state.itemType[0].typeId,
            };

            if(this.props.route.params.target)
            {
                propsTarget = this.props.route.params.target
            }

            this.setState(
                {
                    target: propsTarget,
                    itemType: this.props.route.params.itemType,
                    itemTypeListTemplate: this.createItemTypeDropdownTemplate()
                }
            )
          });
    }

    changeName = (event) =>
    {
        let tempTarget = {...this.state.target}

        tempTarget.name = event.target.value;

        let message = "";
        let itemCheck = true;

        if (event.target.value === "")
        {
            message = "Item name cannot be empty!";
            itemCheck = false;
        }

        this.setState(
            {
                target: tempTarget,
                errorMessage: message,
                goodItem: itemCheck
            }
        );
    }

    changeQuantity = (event) =>
    {
        let tempTarget = {...this.state.target}

        if(event.target.value !== "")
        {
            tempTarget.quantity = parseInt(event.target.value, 10);
        }
        else
        {
            tempTarget.quantity = 0;
        }
        
        this.setState(
            {
                target: tempTarget
            }
        );
    }

    changeEPrice = (event) =>
    {
        let tempTarget = {...this.state.target}

        if(event.target.value !== "")
        {
            tempTarget.eprice = parseInt(event.target.value, 10);
        }
        else
        {
            tempTarget.eprice = 0;
        }

        this.setState(
            {
                target: tempTarget
            }
        );
    }

    changeBPrice = (event) =>
    {
        let tempTarget = {...this.state.target}

        if(event.target.value !== "")
        {
            tempTarget.bprice = parseInt(event.target.value, 10);
        }
        else
        {
            tempTarget.bprice = 0;
        }

        this.setState(
            {
                target: tempTarget
            }
        );
    }

    changeType = (event) =>
    {
        let tempTarget = {...this.state.target}

        tempTarget.type = event.target.value;

        this.setState(
            {
                target: tempTarget
            }
        );
    }

    changeImage = () =>
    {
        this.imageInput.click();
    }

    fileChange = (event) =>
    {
        event.stopPropagation();
        event.preventDefault();

        if (event.target.files[0])
        {
            if (event.target.files[0].size > MAX_FILE_SIZE)
            {
                alert("The image has to be smaller than 2M");
            }
            else
            {
                const promise = new Promise((resolve, reject) => {
                    const reader = new FileReader()
                
                    reader.readAsDataURL(event.target.files[0])
                
                    reader.onload = () => {
                    if (!!reader.result) {
                        resolve(reader.result)
                    }
                    else {
                        reject(Error("Failed converting to base64"))
                    }
                    }
                
                });

                promise.then(result => {
                    const targetCopy = {...this.state.target};

                    targetCopy.imageString = result.split(",")[1];
    
                    this.setState(
                        {
                            target: targetCopy
                        }
                    );
                }, 
                err => {
                    console.log(err)
                })
            }
        }
    }

    createItemTypeDropdownTemplate()
    {
        let itemTypeListTemplate = [];
        for(let index = 0; index < this.props.route.params.itemType.length; index ++)
        {
            itemTypeListTemplate.push(
                {
                    label: this.props.route.params.itemType[index].typeName,
                    value: this.props.route.params.itemType[index].typeId,
                }
            );
        }
        
        return itemTypeListTemplate;
    }


    render()
    {
        return(
            <View style="editArea">
                <View style="titleArea">
                    <Text style="titleStyle">{this.state.target !== -1 ? "Edit Item" : "Add Item"}</Text>
                </View>

                <View style="topArea">
                    {/* <input type="file" ref={imageInput => this.imageInput = imageInput} accept=".jpg, .png" multiple={false} onChange={(event) => {this.fileChange(event)}} style={{display: "none"}}/> */}
                    
                    {/* <View style="itemImageArea">
                        <img src={this.state.target.imageString !== "" ? "data:image/png;base64," + this.state.target.imageString : itemImage} ref={imageView => this.imageView = imageView} onClick={() => {this.changeImage()}} alt="Item"/>
                    </View> */}

                    <View style="nameQuantityArea">
                        <Text style="tagStyle, errorMessage">{this.state.errorMessage}</Text>

                        <View style="editFieldArea">
                            <Text style="tagStyle">Item name: </Text>
                            <TextInput
                                style={styles.textBoxContentStyle}
                                value={this.state.target.name}
                                placeholder = "Item Name"
                                placeholderTextColor = "#0394fc"
                                autoCapitalize = "none"
                                onChangeText ={(text) => {this.changeName(text)}}/>
                            {/* <input type="text" placeholder="Item Name" value={this.state.target.name} onChange={(event) => {this.changeName(event)}}/> */}
                        </View>

                        <View style="editFieldArea">
                            <Text style="tagStyle">Item quantity: </Text>
                            <TextInput
                                style={styles.textBoxContentStyle}
                                value={this.state.target.name}
                                keyboardType="number-pad"
                                placeholderTextColor = "#0394fc"
                                autoCapitalize = "none"
                                onChangeText ={(text) => {this.changeQuantity(text)}}/>
                            {/* <input type="number" value={Number(this.state.target.quantity).toString()} onChange={(event) => {this.changeQuantity(event)}} min="0"/> */}
                        </View>
                    </View>
                </View>
    
                <View style="midArea">
                    <View style="editFieldArea">
                        <Text style="tagStyle">Item type: </Text>
                        <Dropdown
                            label="Item Type:"
                            data={this.state.itemTypeListTemplate}
                            value={props.filterValue}

                            textColor="#000000"
                            itemColor="#005875"

                            containerStyle={styles.dropdownBoxStyle}
                            pickerStyle={styles.dropDownListStyle}
                            onChangeText={(text) => this.changeType(text)}
                        />
                        {/* <select style="dropdownStyle" value={this.state.target.type} onChange={(event) => {this.changeType(event)}}>
                            {this.props.typeList.map(type => <option id={type.typeId} key={type.typeId} value={type.typeId}>{type.typeName}</option>)}
                        </select> */}
                    </View>
                    
                    <View style="editFieldArea">
                        <Text style="tagStyle">Exceptected price: </Text>
                        <input type="number" value={Number(this.state.target.eprice).toString()} onChange={(event) => {this.changeEPrice(event)}} min="0"/>
                    </View>

                    <View style="editFieldArea">
                        <Text style="tagStyle">Base price: </Text>
                        <input type="number" value={Number(this.state.target.bprice).toString()} onChange={(event) => {this.changeBPrice(event)}} min="0"/>
                    </View>
                </View>
    
                <View style="bottomArea">
                    {this.state.target !== -1 ? <button style="warningButton" onClick={() => {this.props.deleteFunction(this.state.target.itemId)}}>Delete</button> : null}
                    <View style="saveCancleArea">
                        <button style="normalButton" onClick={() => {this.setState({errorMessage: ""}); this.props.cancleFunction()}}>Cancle</button>
                        
                        {this.state.goodItem === false ? <button style="normalButton" onClick={() => {this.setState({errorMessage: "Item name cannot be empty!"});}}>Save</button> : <button style="normalButton" onClick={() => {this.props.saveFunction(this.state.target, this.props.isAddNew)}}>Save</button>}
                    </View>
                </View>
            </View>
        )
    };
}
// contentContainerStyle={styles.listContentArea}

const styles = StyleSheet.create(
    {

    }
);
