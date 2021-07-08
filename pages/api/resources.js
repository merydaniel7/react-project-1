

export default async function(req, resp) {
    if (req.method === "GET") {
        const dataResponse = await fetch("http://localhost:3001/api/resources");
        const data = await dataResponse.json();

        return resp.send(data)
    }
    if (req.method === "POST") {
        const { title, description, link, timeToFinish, priority } = req.body;
        if (! title || !description || !link || !timeToFinish || !priority) {
            return resp.status(422).send("Data are missing!")
        }
        return resp.send("Data has been received!")
    }
}