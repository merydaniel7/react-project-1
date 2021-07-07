import data from "./data.json"

export default function(req, resp) {
    resp.send(data);
}