import serverURL from "./serverURL"
// const serverURL = "http://192.168.1.52:28590/api/";
class ItemService
{
    getAllItem = async () =>
    {
        return fetch(serverURL + "item")
        .then((response) => response.json())
        .then((json) => 
            {
                return json;
            }
        )
        .catch((error) => 
            {
                console.error(error);
            }
        );
        // return await axios.get(serverURL + "item");
    }
    getAllItemName = async () =>
    {
        return fetch(serverURL + "item/name")
        .then((response) => response.json())
        .then((json) => 
            {
                return json;
            }
        )
        .catch((error) => 
            {
                console.error(error);
            }
        );
        // return await axios.get(serverURL + "item/name");
    }
    getAllItemQuantity = async () =>
    {
        return fetch(serverURL + "item/quantity")
        .then((response) => response.json())
        .then((json) => 
            {
                return json;
            }
        )
        .catch((error) => 
            {
                console.error(error);
            }
        );
        // return await axios.get(serverURL + "item/quantity");
    }
    getFilterNameItemList = async (typeId) =>
    {
        return fetch(serverURL + "item/" + typeId + "/name")
        .then((response) => response.json())
        .then((json) => 
            {
                return json;
            }
        )
        .catch((error) => 
            {
                console.error(error);
            }
        );
        // return await axios.get(serverURL + "item/" + typeId + "/name");
    }
    getFilterQuantityItemList = async (typeId) =>
    {
        return fetch(serverURL + "item/" + typeId + "/quantity")
        .then((response) => response.json())
        .then((json) => 
            {
                return json;
            }
        )
        .catch((error) => 
            {
                console.error(error);
            }
        );
        // return await axios.get(serverURL + "item/" + typeId + "/quantity");
    }

    addNewItem = async (newItem) =>
    {
        return fetch(serverURL + "item/new", 
            {
                method: 'POST',
                headers: 
                    {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                body: JSON.stringify(newItem)
            }
        )
        .then((response) => response.json())
        .then((json) => 
            {
                return json;
            }
        )
        .catch((error) => 
            {
                console.error(error);
            }
        );
        // return await axios.post(serverURL + "item/new", newItem);
    }

    changeOneItemQuantity = async (itemId, amount) =>
    {
        return fetch(serverURL + "item/changeOne/" + itemId + "/" + amount, 
            {
                method: 'PUT'
            }
        )
        .then((response) => response.json())
        .then((json) => 
            {
                return json;
            }
        )
        .catch((error) => 
            {
                console.error(error);
            }
        );

        // return await axios.put(serverURL + "item/changeOne/" + itemId + "/" + amount);
    }

    saveEdit = async (target) =>
    {
        return fetch(serverURL + "item/one", 
            {
                method: 'PUT',
                headers: 
                    {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                body: JSON.stringify(target)
            }
        )
        .then((response) => response.json())
        .then((json) => 
            {
                return json;
            }
        )
        .catch((error) => 
            {
                console.error(error);
            }
        );
        // return await axios.put(serverURL + "item/one", target);
    }

    removeItem = async (targetId) =>
    {
        return fetch(serverURL + "item/remove/" + targetId, 
            {
                method: 'DELETE'
            }
        )
        .then((response) => response.json())
        .then((json) => 
            {
                return json;
            }
        )
        .catch((error) => 
            {
                console.error(error);
            }
        );
        // return await axios.delete(serverURL + "item/remove/" + targetId);
    }
}

export default ItemService;