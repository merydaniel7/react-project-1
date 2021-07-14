import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";


const ActiveResource = () => {
    const [resource, setResource] = useState({});
    const [timeToLeft, setTimeToLeft] = useState();

    useEffect(() => {
        async function fetchResource() {
            const dataResponse = await axios.get("/api/active-resource");
            const resource = dataResponse.data;
            const timeToFinish = parseInt(resource.timeToFinish, 10);
            const elapsedTime = moment().diff(moment(resource.activationTime), "seconds");
            const updatedTimeToFinish = parseInt(((timeToFinish * 60) - elapsedTime)/60);

            if (updatedTimeToFinish >= 0) {
                resource.timeToFinish = updatedTimeToFinish;
                setTimeToLeft(updatedTimeToFinish);
            }


            setResource(resource);
        }

        fetchResource();
    }, [])

    useEffect(() => {
        let firstLoad = true;
        const interval = setInterval(() => {
            if (!firstLoad) {
                setTimeToLeft(timeToLeft - 1);
            }
            firstLoad = false;
        }, 60000)

        if (timeToLeft < 0) {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [timeToLeft])

    const hasResource = resource && resource.id;

    const completeResource = () => {
        axios.patch("/api/resources", {...resource, status: "complete"})
            .then(location.reload())
            .catch(_ => {alert("Cannot complete the resource!")});
    }

    return (
        <div className="active-resource">
            <h1 className="resource-name">
                {hasResource ? resource.title : "No Active Resource"}
            </h1>
            <div className="time-wrapper">
                    { hasResource ?
                        ( timeToLeft > 0 ?
                            <h2 className="elapsed-time">
                            Time to finish: {timeToLeft} min
                            </h2> :
                            <h2 className="elapsed-time">
                            <button onClick={completeResource} className="button is-success">
                                Done!
                            </button>
                            </h2>
                        ) :
                        <h2 className="elapsed-time">
                            Time to finish: 0 min
                        </h2>
                    }
            </div>
            { hasResource ?
                <Link href={"/resources/"+ resource.id}>
                    <a className="button">
                    Details
                    </a>
                </Link> :
                <Link href="/">
                    <a className="button">
                    Home
                    </a>
                </Link>
            }
        </div>

    )
}

export default ActiveResource;