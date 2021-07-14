import axios from "axios";


export default async function activeResource(req, res) {
    const dateResponse = await axios.get("http://localhost:3001/api/active-resource");
    const resource = dateResponse.data;

    return res.send(resource);
}