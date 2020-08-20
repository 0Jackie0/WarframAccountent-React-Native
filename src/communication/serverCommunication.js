import ItemService from "./itemService"
import TypeService from "./itemTypeService"

class ServerCommunication
{
    itemCommunication()
    {
        return new ItemService();
    }

    typeCommunication()
    {
        return new TypeService();
    }
}

export default ServerCommunication;