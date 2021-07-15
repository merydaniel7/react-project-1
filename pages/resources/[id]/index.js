import Layout from "components/Layout";
import ResourceLabel from "components/ResourceLabel";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import moment from "moment";


const ResourceDetail = ({resource}) => {
    const router = useRouter();

    // if (router.isFallback) {
    //     return <div>Loading...</div>;
    // }

    const deleteResource = () => {

        if (confirm("Are you sure?")) {
            axios.delete("/api/resources", { data: { id: resource.id } })
            .then(_ => {alert("Date has been deleted!")})
            .then(_ => {router.push("/")})
            .catch(err => alert(err?.response?.data));
        }
    }

    const activateResource = () => {
        axios.patch("/api/resources", {...resource, status: "active"})
            .then(_ => {router.push("/")})
            .catch(_ => {alert("Cannot activate resource!")});
    }

    return(
        <Layout>
        <section className="hero ">
            <div className="hero-body">
                <div className="container">
                    <section className="section">
                        <div className="columns">
                            <div className="column is-8 is-offset-2">
                                <div className="content is-medium">
                                    <h2 className="subtitle is-4">{moment(resource.createdAt).format("LLL")}
                                        <ResourceLabel status={resource.status} />
                                    </h2>
                                    <h1 className="title">{resource.title}</h1>
                                    <p>
                                    {resource.description}
                                    </p>
                                    <p>
                                    {resource.link}
                                    </p>
                                    <p>
                                    Time to finish: {resource.timeToFinish} min
                                    </p>
                                </div>
                                {
                                    resource.status !== "active" ?
                                    <Link href={"/resources/" + resource.id + "/edit"}>
                                        <a className="button is-warning">
                                            Update
                                        </a>
                                    </Link> :
                                    <></>
                                }
                                {
                                    resource.status === "inactive" ?
                                    <button onClick={activateResource} className="button is-success ml-2">
                                        Activate
                                    </button> :
                                    <></>
                                }
                                
                                <button onClick={deleteResource} className="button is-danger ml-2">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </section>
        </Layout>        
    )

}

// export async function getStaticPaths() {
//     const dateResponse = await fetch("http://localhost:3001/api/resources/")
//     const data = await dateResponse.json();
//     const path = data.map(resource => {
//         return {
//             params: {id: resource.id}
//         }
//     })
//     return {
//         paths: path,
//         fallback: false
//     }
// }

// //revalidate the page on page refresh
// export async function getStaticProps({ params, query }) {

//     const dateResponse = await fetch("http://localhost:3001/api/resources/" + params.id )
//     const data = await dateResponse.json();

//     return {
//         props: {
//             resource: data
//         },
//         revalidate: 1
//     }
// }

// params.id, the .id is come from the [id] map's id
export async function getServerSideProps({ params }) {

    const dateResponse = await fetch(`${process.env.API_URL}/resources/${params.id}` )
    const data = await dateResponse.json();

    return {
        props: {
            resource: data
        }
    }
}

export default ResourceDetail;