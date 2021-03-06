import React, { Component } from 'react';
import { StyleSheet, View} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Toast from 'react-native-easy-toast'

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
    constructor(props)
    {
        super(props);

        this.state = {
            itemList: [],
            itemType: [],
            itemListCopy: null,
            searchName: "",
            editTarget: null,
            addNew: true,
            filterId: "-1",
            orderId: 1,
            createSellString: false,
        }

        this.addOneItem = this.addOneItem.bind();
        this.removeOneItem = this.removeOneItem.bind();
    }

    componentDidMount()
    {
        this.getItemTypeList();
        this.getItemList();

        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            // do something
            // console.log(this.props.route.params)
            // if(this.props.route.params && this.props.route.params.action !== "cancle")
            // {
            //     console.log("get new lsit");
            //     this.getNewFilterList();
            // }

            this.getNewFilterList();
          });
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    notifyMessage(msg) 
    {
        this.refs.toast.show(msg);
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


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
    searchItem = (searchName) =>
    {
        if(searchName === "")
        {
            this.setState(
                {
                    itemList: this.state.itemListCopy,
                    itemListCopy: null,
                    searchName: ""
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
                        itemList: newItemList,
                        searchName: searchName
                    }
                );
            }
            else
            {
                this.setState(
                    {
                        itemList: newItemList,
                        itemListCopy:newItemListCopy,
                        searchName: searchName
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

        if(this.state.orderId.toString() === "1")
        {
            if(typeId.toString() === "-1")
            {
                serverCommunication.itemCommunication().getAllItemName().then(newItemList =>
                    {
                        this.setState(
                            {
                                itemList: newItemList,
                                filterId: typeId,
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
            if(typeId.toString() === "-1")
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

        if(orderId.toString() === "1")
        {
            if(this.state.filterId.toString() === "-1")
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
            if(this.state.filterId.toString() === "-1")
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

        if(this.state.orderId.toString() === "1")
        {
            if(this.state.filterId.toString() === "-1")
            {
                serverCommunication.itemCommunication().getAllItemName().then(newItemList =>
                    {
                        this.updateFilteredOrderedSearchedItemListState(newItemList)
                    }
                )
            }
            else
            {
                serverCommunication.itemCommunication().getFilterNameItemList(this.state.filterId).then(newItemList =>
                    {
                        this.updateFilteredOrderedSearchedItemListState(newItemList)
                    }
                )
            }
            
        }
        else
        {
            if(this.state.filterId.toString() === "-1")
            {
                serverCommunication.itemCommunication().getAllItemQuantity().then(newItemList =>
                    {
                        this.updateFilteredOrderedSearchedItemListState(newItemList)
                    }
                )
            }
            else
            {
                serverCommunication.itemCommunication().getFilterQuantityItemList(this.state.filterId).then(newItemList => 
                    {
                        this.updateFilteredOrderedSearchedItemListState(newItemList)
                    }
                )
            }
        }
    }
    updateFilteredOrderedSearchedItemListState = (newItemList) =>
    {
        if(this.state.searchName === "")
        {
            this.setState(
                {
                    itemList: newItemList
                }
            )
        }
        else
        {
            this.setState(
                {
                    itemListCopy: newItemList
                }
            )
            this.searchItem(this.state.searchName)
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
        // Toast.show('Adding Quantity.', Toast.SHORT);
        this.notifyMessage('Adding Quantity')
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

                // Toast.showWithGravity('Done', Toast.SHORT);

                this.setState(tempItemList);
            })
    }
    removeOneItem = (itemId) =>
    {
        // Toast.show('Reducing Quantity.', Toast.SHORT);
        this.notifyMessage('Reducing Quantity')
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

            // Toast.showWithGravity('Done', Toast.SHORT);
            this.setState(tempItemList);
        })
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    render()
    {
        return(
            <View style={styles.itemListPageArea}>     
                <View style={styles.selectionArea}>
                    <ListSelection filterList={this.state.itemType} orderList={orderList} filterValue={this.state.filterId} orderValue={this.state.orderId} searchFunction={this.searchItem} addFunction={this.addNewItem} filterFunction={this.filterItemList} orderFunction={this.orderItemList} openSellString={this.openCLoseSellString}/>
                </View>

                <View style={styles.itemManagementContent}>
                    <View style={styles.listHeaderArea}>
                        <ListHeader itemList={this.state.itemList}/>
                    </View>

                    <View style={styles.listContentArea}>
                        <ScrollView>
                            {this.state.itemList.map(item => <ListContent key={item.itemId} item={item} typeName={this.getItemTypeNameById(item.type)} addFunction={this.addOneItem} removeFunction={this.removeOneItem} openEdit={this.openEdit} navigationOption={() => this.props.navigation.navigate('EditPage', { target: item, typeList: this.state.itemType })}/>)}
                        </ScrollView>
                    </View>
                </View>
                <Toast ref="toast"/>
            </View>
        )
    };
}

const styles = StyleSheet.create(
    {
        itemListPageArea:
        {
            marginLeft: 15,
            marginRight: 15,
            flex: 1
        },

        selectionArea:
        {
            flex: 0
        },
        itemManagementContent:
        {
            flex: 1
        },

        listHeaderArea:
        {
            marginBottom: 10,
        },

        listContentArea:
        {
            backgroundColor: "#edfaff",
            marginBottom: 25
        },
    }
);
