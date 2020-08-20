import serverURL from "./serverURL"
// const serverURL = "http://192.168.1.52:28590/api/";
class TypeService
{
    getAllType = async () =>
    {
        return fetch(serverURL + "type")
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
        // return await axios.get(serverURL + "type");
    }
}

export default TypeService;