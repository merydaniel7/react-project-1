import axios from "axios";


export default async function activeResource(req, res) {
    const dateResponse = await axios.get(`${process.env.API_URL}/active-resource`);
    const resource = dateResponse.data;

    return res.send(resource);
}