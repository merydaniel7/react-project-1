import Layout from "components/Layout";
import ResourceForm from "components/ResourceForm";
import axios from "axios";
import { useRouter } from "next/router";


const ResourceEdit = ({resource}) => {
    const router = useRouter();

    const updateResource = (formData) => {
        axios.patch("/api/resources", formData)
        .then(_ => {alert("Date has been updated!")})
        .then(_ => {router.push("/resources/" + resource.id)})
        .catch(err => alert(err?.response?.data));
    }

    return (
        <Layout>
            <div className="container">
                <div className="columns">
                    <div className="column is-8 is-offset-2">
                        <ResourceForm
                            initialData={resource}
                            onFormSubmit={updateResource}
                        />
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps({ params }) {

    const dateResponse = await fetch(`${process.env.API_URL}/resources/${params.id}` )
    const data = await dateResponse.json();

    return {
        props: {
            resource: data
        }
    }
}

export default ResourceEdit;