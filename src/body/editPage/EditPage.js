import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown-v2';
import Toast from 'react-native-easy-toast'

import itemImage from "../../assets/220px-Warframe_Cover_Art.png";
import ServerCommunication from "../../communication/serverCommunication";

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
            type: props.route.params.typeList[0].typeId,
        };

        if(props.route.params.target)
        {
            propsTarget = props.route.params.target
        }

        this.state = {
            target: propsTarget,
            itemType: props.route.params.typeList,
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
                    itemType: this.props.route.params.typeList,
                    itemTypeListTemplate: this.createItemTypeDropdownTemplate()
                }
            )
          });
    }

    changeName = (value) =>
    {
        let tempTarget = {...this.state.target}

        tempTarget.name = value;

        let message = "";
        let itemCheck = true;

        if (value === "")
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

    changeQuantity = (value) =>
    {
        let tempTarget = {...this.state.target}

        if(value !== "")
        {
            tempTarget.quantity = parseInt(value, 10);
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

    changeEPrice = (value) =>
    {
        let tempTarget = {...this.state.target}

        if(value !== "")
        {
            tempTarget.eprice = parseInt(value, 10);
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

    changeBPrice = (value) =>
    {
        let tempTarget = {...this.state.target}

        if(value !== "")
        {
            tempTarget.bprice = parseInt(value, 10);
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

    changeType = (value) =>
    {
        let tempTarget = {...this.state.target}

        tempTarget.type = value;

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
        for(let index = 0; index < this.props.route.params.typeList.length; index ++)
        {
            itemTypeListTemplate.push(
                {
                    label: this.props.route.params.typeList[index].typeName,
                    value: this.props.route.params.typeList[index].typeId,
                }
            );
        }
        
        return itemTypeListTemplate;
    }
    notifyMessage(msg) 
    {
        this.refs.toast.show(msg);
    }


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    cancleEdit = () =>
    {
        // console.log(this.props.navigation);
        this.props.navigation.goBack();
        // this.props.navigation.navigate("ItemList", {action: "cancle"});
    }
    saveEdit = () =>
    {
        this.notifyMessage("Saving");

        const serverCommunication = new ServerCommunication();

        if(this.state.target.itemId !== -1)
        {
            serverCommunication.itemCommunication().saveEdit(this.state.target).then(() =>
                {
                    this.props.navigation.goBack();
                })
                .catch(exception => {
                    console.log(exception)
                })
        }
        else
        {
            serverCommunication.itemCommunication().addNewItem(target).then(() =>
            {
                this.props.navigation.goBack();
            })
            .catch(exception => {
                console.log(exception)
            })
    }
    }
    deleteEdit = () =>
    {
        this.notifyMessage("Deleting");
        const serverCommunication = new ServerCommunication();

        serverCommunication.itemCommunication().removeItem(this.state.target.itemId).then(() =>
            {
                this.props.navigation.goBack();
            })
            .catch(exception =>
            {
                console.log(exception)
            })
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    render()
    {
        return(
            <View style="editArea">
                <View style={styles.titleArea}>
                    <Text style={styles.titleStyle}>{this.state.target !== -1 ? "Edit Item" : "Add Item"}</Text>
                </View>

                <View style={styles.topArea}>
                    {/* <input type="file" ref={imageInput => this.imageInput = imageInput} accept=".jpg, .png" multiple={false} onChange={(event) => {this.fileChange(event)}} style={{display: "none"}}/> */}
                    
                    <View style={styles.itemImageArea}>
                        <Image style={styles.imageSize} source={this.state.target.imageString !== "" ? "data:image/png;base64," + this.state.target.imageString : itemImage} alt="item" />
                        {/* <img src={this.state.target.imageString !== "" ? "data:image/png;base64," + this.state.target.imageString : itemImage} ref={imageView => this.imageView = imageView} onClick={() => {this.changeImage()}} alt="Item"/> */}
                    </View>

                    <View style="nameQuantityArea">
                        <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>

                        <View style={styles.editFieldArea}>
                            <Text style={styles.tagStyle}>Item name: </Text>
                            <TextInput
                                style={styles.textBoxContentStyle}
                                value={this.state.target.name}
                                placeholder = "Item Name"
                                placeholderTextColor = "#0394fc"
                                autoCapitalize = "none"
                                onChangeText ={(text) => {this.changeName(text)}}/>
                            {/* <input type="text" placeholder="Item Name" value={this.state.target.name} onChange={(event) => {this.changeName(event)}}/> */}
                        </View>

                        <View style={styles.editFieldArea}>
                            <Text style={styles.tagStyle}>Item quantity: </Text>
                            <TextInput
                                style={styles.textBoxContentStyle}
                                value={this.state.target.quantity.toString()}
                                keyboardType="number-pad"
                                placeholderTextColor = "#0394fc"
                                autoCapitalize = "none"
                                onChangeText ={(text) => {this.changeQuantity(text)}}/>
                            {/* <input type="number" value={Number(this.state.target.quantity).toString()} onChange={(event) => {this.changeQuantity(event)}} min="0"/> */}
                        </View>
                    </View>
                </View>
    
                <View style="midArea">
                    <View style={styles.editFieldArea}>
                        <Dropdown
                            label="Item Type:"
                            data={this.state.itemTypeListTemplate}
                            value={this.state.target.type}

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
                    
                    <View style={styles.editFieldArea}>
                        <Text style={styles.tagStyle}>Exceptected price: </Text>
                        <TextInput
                            style={styles.textBoxContentStyle}
                            value={this.state.target.eprice.toString()}
                            keyboardType="number-pad"
                            placeholderTextColor = "#0394fc"
                            autoCapitalize = "none"
                            onChangeText ={(text) => {this.changeEPrice(text)}}/>
                        {/* <input type="number" value={Number(this.state.target.eprice).toString()} onChange={(event) => {this.changeEPrice(event)}} min="0"/> */}
                    </View>

                    <View style={styles.editFieldArea}>
                        <Text style={styles.tagStyle}>Base price: </Text>
                        <TextInput
                            style={styles.textBoxContentStyle}
                            value={this.state.target.bprice.toString()}
                            keyboardType="number-pad"
                            placeholderTextColor = "#0394fc"
                            autoCapitalize = "none"
                            onChangeText ={(text) => {this.changeBPrice(text)}}/>
                        {/* <input type="number" value={Number(this.state.target.bprice).toString()} onChange={(event) => {this.changeBPrice(event)}} min="0"/> */}
                    </View>
                </View>
    
                <View style={styles.bottomArea}>
                    {this.state.target !== -1 ?
                        <TouchableOpacity style={[styles.buttonSize, styles.deleteButton]} activeOpacity={0.5} onPress={() => {this.setState({errorMessage: ""}); this.deleteEdit()}}>
                            <Text style={styles.buttonTextStyle}>Delete</Text>
                        </TouchableOpacity>
                    :
                    null}
                    {/* {this.state.target !== -1 ? <Button title="Delete" color="#ff0000" onClick={() => {this.props.deleteFunction(this.state.target.itemId)}}/> : null} */}
                    <View style={styles.saveCancleArea}>
                        <TouchableOpacity style={[styles.buttonSize, styles.cancleButton]} activeOpacity={0.5} onPress={() => {this.setState({errorMessage: ""}); this.cancleEdit()}}>
                            <Text style={styles.buttonTextStyle}>Cancle</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.buttonSize, styles.saveButton]} activeOpacity={0.5} onPress={() => {this.setState({errorMessage: ""}); this.saveEdit()}}>
                            <Text style={styles.buttonTextStyle}>Save</Text>
                        </TouchableOpacity>
                        
                        {/* {this.state.goodItem === false ? <Button title="Save" onClick={() => {this.setState({errorMessage: "Item name cannot be empty!"});}}></Button> : <Button title="Save" onClick={() => {this.props.saveFunction(this.state.target, this.props.isAddNew)}}></Button>} */}
                    </View>
                </View>
                <Toast ref="toast"/>
            </View>
        )
    };
}

const styles = StyleSheet.create(
    {
        titleArea:
        {
            alignItems: "center",
            marginBottom: 10,
        },
        titleStyle:
        {
            fontSize: 25,
            fontWeight: "bold",
        },


        itemImageArea:
        {
            alignItems: "center",
        },
        imageSize:
        {
            width: 150,
            height: 150
        },


        tagStyle:
        {
            width : "40%",
            fontWeight: "bold",
            fontSize: 18
        },
        errorMessage:
        {
            color: "#ff0019",
            fontWeight: "bold",
            fontSize: 15,
            width: "100%",
            textAlign: "center"
        },

        editFieldArea:
        {
            marginTop: 5,
            marginBottom: 5,
            flexDirection: "row",
            justifyContent: "space-around",
        },

        textBoxContentStyle:
        {
            backgroundColor: "#ffffff",
            color: "#000000",
            borderRadius: 12,
            borderColor: "#0084ff",

            borderStyle: "solid",
            borderWidth: 1,

            paddingLeft: 5,
            paddingRight: 5,

            width: "50%",
            fontSize: 18
        },

        dropdownBoxStyle:
        {
            width: "80%"
        },
        dropDownListStyle:
        {
        },



        bottomArea:
        {
            marginTop: 20,
            flexDirection: "column",
            alignItems: "center"
        },


        saveCancleArea:
        {
            marginTop: 20,

            flexDirection: "row",
            justifyContent: "space-around",
            width: "100%"
        },

        buttonTextStyle:
        {
            fontSize: 20,
            textAlign: "center"
        },
        buttonSize:
        {
            width: "40%",
            padding: 5,
        },
        saveButton:
        {
            backgroundColor: "#ffffff",

            color: "#000000",

            borderRadius: 12,
            borderColor: "#00ffbf",

            borderStyle: "solid",
            borderWidth: 3,
        },
        cancleButton:
        {
            backgroundColor: "#ffffff",

            color: "#000000",

            borderRadius: 12,
            borderColor: "#0084ff",

            borderStyle: "solid",
            borderWidth: 3,
        },
        deleteButton:
        {
            backgroundColor: "#ffffff",

            color: "#000000",

            borderRadius: 12,
            borderColor: "#ff0000",

            borderStyle: "solid",
            borderWidth: 3,
        }
    }
);
