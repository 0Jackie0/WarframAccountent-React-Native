import React, { Component } from 'react';
import { StyleSheet, View} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import ServerCommunication from "../../communication/serverCommunication";
import ListContent from "./listContent/ListContent";
import ListHeader from "./listHeader/ListHeader";
import ListSelection from "./listSelection/ListSelection";


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
export default class ItemList extends Component
{
    constructor()
    {
        super();

        this.state = {
            itemList: [],
            itemType: [],
            itemListCopy: null,
            editTarget: null,
            addNew: true,
            filterId: "-1",
            orderId: "1",
            createSellString: false
        }

        this.addOneItem = this.addOneItem.bind();
        this.removeOneItem = this.removeOneItem.bind();
        this.openEdit = this.openEdit.bind();
        this.cancleEdit = this.cancleEdit.bind();
        this.saveEdit = this.saveEdit.bind();
        this.deleteEdit = this.deleteEdit.bind();
        this.openCLoseSellString = this.openCLoseSellString.bind();
    }

    componentDidMount()
    {
        this.getItemTypeList();
        this.getItemList();
    }

    
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    getItemList = () =>
    {
        const serverCommunication = new ServerCommunication();

        serverCommunication.itemCommunication().getAllItemName().then(newItemList =>
        {
            this.setState(
                {
                    itemList: newItemList
                }
            )
        })
    }
    getItemTypeList = () =>
    {
        const serverCommunication = new ServerCommunication();

        serverCommunication.typeCommunication().getAllType().then(newTypeList =>
        {
            this.setState(
                {
                    itemType: newTypeList,
                    editTarget: {
                        imageString: "",
                        bprice: 0,
                        eprice: 0,
                        itemId: -1,
                        name: "",
                        quantity: 0,
                        type: newTypeList[0].typeId,
                    },
                }
            )
        })
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    openCLoseSellString = () =>
    {
        this.setState(
            {
                createSellString: !this.state.createSellString
            }
        )
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    searchItem = (searchName) =>
    {
         if(searchName === "")
         {
            this.setState(
                {
                    itemList: this.state.itemListCopy,
                    itemListCopy: null,
                }
            );
         }
         else
         {
            let newItemList = [];
            let newItemListCopy;

            if(this.state.itemListCopy !== null)
            {
                newItemListCopy = this.state.itemListCopy;
            }
            else
            {
                newItemListCopy = this.state.itemList;
            }
            

            for(let index in newItemListCopy)
            {
                if(newItemListCopy[index].name.toLowerCase().includes(searchName.toLowerCase()) === true)
                {
                    newItemList.push(newItemListCopy[index])
                }
            }

            if(this.state.itemListCopy !== null)
            {
                this.setState(
                    {
                        itemList: newItemList
                    }
                );
            }
            else
            {
                this.setState(
                    {
                        itemList: newItemList,
                        itemListCopy:newItemListCopy
                    }
                );
            }
            
         }
    }
    addNewItem = () =>
    {
        let tempNewItem = {
            imageString: "",
            bprice: 0,
            eprice: 0,
            itemId: -1,
            name: "",
            quantity: 0,
            type: this.state.itemType[0].typeId,
        }

        this.setState(
            {
                editTarget: tempNewItem,
                addNew: true
            }
        );
    }
    filterItemList = (typeId) =>
    {
        const serverCommunication = new ServerCommunication();

        if(this.state.orderId === "1")
        {
            if(typeId === "-1")
            {
                serverCommunication.itemCommunication().getAllItemName().then(newItemList =>
                    {
                        this.setState(
                            {
                                itemList: newItemList,
                                filterId: typeId
                            }
                        )
                })
            }
            else
            {
                serverCommunication.itemCommunication().getFilterNameItemList(typeId).then(newItemList =>{
                    this.setState(
                        {
                            itemList: newItemList,
                            filterId: typeId
                        }
                    )
                })
            }
            
        }
        else
        {
            if(typeId === "-1")
            {
                serverCommunication.itemCommunication().getAllItemQuantity().then(newItemList =>
                    {
                        this.setState(
                            {
                                itemList: newItemList,
                                filterId: typeId
                            }
                        )
                })
            }
            else
            {
                serverCommunication.itemCommunication().getFilterQuantityItemList(typeId).then(newItemList =>{
                    this.setState(
                        {
                            itemList: newItemList,
                            filterId: typeId
                        }
                    )
                })
            }
        }
    }
    orderItemList = (orderId) =>
    {
        const serverCommunication = new ServerCommunication();

        if(orderId === "1")
        {
            if(this.state.filterId === "-1")
            {
                serverCommunication.itemCommunication().getAllItemName().then(newItemList =>
                    {
                        this.setState(
                            {
                                itemList: newItemList,
                                orderId: orderId
                            }
                        )
                })
            }
            else
            {
                serverCommunication.itemCommunication().getFilterNameItemList(this.state.filterId).then(newItemList =>{
                    this.setState(
                        {
                            itemList: newItemList,
                            orderId: orderId
                        }
                    )
                })
            }
            
        }
        else
        {
            if(this.state.filterId === "-1")
            {
                serverCommunication.itemCommunication().getAllItemQuantity().then(newItemList =>
                    {
                        this.setState(
                            {
                                itemList: newItemList,
                                orderId: orderId
                            }
                        )
                })
            }
            else
            {
                serverCommunication.itemCommunication().getFilterQuantityItemList(this.state.filterId).then(newItemList =>{
                    this.setState(
                        {
                            itemList: newItemList,
                            orderId: orderId
                        }
                    )
                })
            }
        }
    }
    getNewFilterList = () =>
    {
        const serverCommunication = new ServerCommunication();

        if(this.state.orderId === "1")
        {
            if(this.state.filterId === "-1")
            {
                serverCommunication.itemCommunication().getAllItemName().then(newItemList =>
                    {
                        this.setState(
                            {
                                itemList: newItemList
                            }
                        )
                })
            }
            else
            {
                serverCommunication.itemCommunication().getFilterNameItemList(this.state.filterId).then(newItemList =>{
                    this.setState(
                        {
                            itemList: newItemList
                        }
                    )
                })
            }
            
        }
        else
        {
            if(this.state.filterId === "-1")
            {
                serverCommunication.itemCommunication().getAllItemQuantity().then(newItemList =>
                    {
                        this.setState(
                            {
                                itemList: newItemList
                            }
                        )
                })
            }
            else
            {
                serverCommunication.itemCommunication().getFilterQuantityItemList(this.state.filterId).then(newItemList =>{
                    this.setState(
                        {
                            itemList: newItemList
                        }
                    )
                })
            }
        }
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    getItemTypeNameById = (target) =>
    {
        for(let index = 0; index < this.state.itemType.length; index ++)
        {
            if(target === this.state.itemType[index].typeId)
            {
                return this.state.itemType[index].typeName;
            }
        }
        return "";
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    addOneItem = (itemId) =>
    {
        const serverCommunication = new ServerCommunication();

        serverCommunication.itemCommunication().changeOneItemQuantity(itemId, 1).then(updatedItem =>
            {
                const tempItemList = {...this.state}

                for(let itemIndex in tempItemList.itemList)
                {
                    if(tempItemList.itemList[itemIndex].itemId === itemId)
                    {
                        tempItemList.itemList[itemIndex].quantity += 1;
                        break;
                    }
                }

                this.setState(tempItemList);
            })
    }
    removeOneItem = (itemId) =>
    {
        const serverCommunication = new ServerCommunication();

        serverCommunication.itemCommunication().changeOneItemQuantity(itemId, -1).then(updatedItem =>
        {
            const tempItemList = {...this.state}
            
            for(let itemIndex in tempItemList.itemList)
            {
                if(tempItemList.itemList[itemIndex].itemId === itemId)
                {
                    tempItemList.itemList[itemIndex].quantity += -1;
                    break;
                }
            }

            this.setState(tempItemList);
        })
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    openEdit = (targetItem) =>
    {
        this.setState(
            {
                editTarget: targetItem,
                addNew: false
            }
        )
    }
    cancleEdit = () =>
    {
        this.setState(
            {
                editTarget: {
                    imageString: "",
                    bprice: 0,
                    eprice: 0,
                    itemId: -1,
                    name: "",
                    quantity: 0,
                    type: this.state.itemType[0].typeId,
                },
                addNew: true
            }
        )
    }
    saveEdit = (target,isAddNew) =>
    {
        const serverCommunication = new ServerCommunication();

        if(isAddNew === false)
        {
            serverCommunication.itemCommunication().saveEdit(target).then(respond =>
                {
                    this.setState(
                        {
                            editTarget: {
                                imageString: "",
                                bprice: 0,
                                eprice: 0,
                                itemId: -1,
                                name: "",
                                quantity: 0,
                                type: this.state.itemType[0].typeId,
                            },
                            addNew: true
                        }
                    );
    
                    this.getNewFilterList();
                })
                .catch(exception => {
                    console.log(exception)
                })
        }
        else
        {
            serverCommunication.itemCommunication().addNewItem(target).then(respond =>
            {
                this.setState(
                    {
                        editTarget: {
                            imageString: "",
                            bprice: 0,
                            eprice: 0,
                            itemId: -1,
                            name: "",
                            quantity: 0,
                            type: this.state.itemType[0].typeId,
                        },
                        addNew: true
                    }
                );

                this.getNewFilterList();
            })
            .catch(exception => {
                console.log(exception)
            })
    }
    }
    deleteEdit = (targetId) =>
    {
        const serverCommunication = new ServerCommunication();

        serverCommunication.itemCommunication().removeItem(targetId).then(respond =>
            {
                this.setState(
                    {
                        editTarget: {
                            imageString: "",
                            bprice: 0,
                            eprice: 0,
                            itemId: -1,
                            name: "",
                            quantity: 0,
                            type: this.state.itemType[0].typeId,
                        },
                        addNew: true
                    }
                );

                this.getItemList();
            })
            .catch(exception =>
            {
                console.log(exception)
            })
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    render()
    {
        return(
            <View style="itemListPageArea">

                {/* {this.state.createSellString === true ? 
                    <View style="sellStringCreationArea">
                        <SellString typeList={this.state.itemType} itemList={this.state.itemListCopy === null ? this.state.itemList : this.state.itemListCopy} closeFunction={this.openCLoseSellString}/>
                    </View> 
                    :
                    null
                } */}
                
                <View style="selectionArea">
                    {/* <ListSelection filterList={this.state.itemType} orderList={orderList} searchFunction={this.searchItem} addFunction={this.addNewItem} filterFunction={this.filterItemList} orderFunction={this.orderItemList} openSellString={this.openCLoseSellString}/> */}
                </View>


                <View style="itemManagementArea">
                    {/* <View style="itemManagementContent">
                        {this.state.editTarget !== null ?  
                            <View style="editAreaWapper">
                                <EditItem isAddNew={this.state.addNew} target={this.state.editTarget} typeList={this.state.itemType} saveFunction={this.saveEdit} deleteFunction={this.deleteEdit} cancleFunction={this.cancleEdit} />
                            </View>
                            :
                            null
                        }
                    </View> */}

                    <View style="itemManagementContent">
                        <View style="listInfoArea">
                            <View style="listHeaderArea">
                                <ListHeader itemList={this.state.itemList}/>
                            </View>

                            <View style={styles.listContentArea}>
                                <ScrollView>
                                    {this.state.itemList.map(item => <ListContent key={item.itemId} item={item} typeName={this.getItemTypeNameById(item.type)} addFunction={this.addOneItem} removeFunction={this.removeOneItem} openEdit={this.openEdit} />)}
                                </ScrollView>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    };
}

const styles = StyleSheet.create(
    {
        itemListPageArea:
        {
            
        },

        listContentArea:
        {
            marginLeft: 15,
            marginRight: 15
        }
    }
);
