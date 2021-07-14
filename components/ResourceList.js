import Link from "next/link";
import ResourceLabel from "components/ResourceLabel";
import moment from "moment";


const ResourceList = ({resources}) => {

    const renderResource = () => {
        return (
            resources.map(resource => {
                return (
                <div key={resource.id} className="column is-5 is-offset-1 ">
                    <div className="content is-medium">
                        <h2 className="subtitle is-4">{moment(resource.createdAt).format("LLL")}
                            <ResourceLabel status={resource.status} />
                        </h2>
                        <h1 className="title has-text-black is-3">{resource.title}</h1>
                        <p className="has-text-dark">
                        {resource.description}
                        </p>
                        <Link href={"/resources/"+ resource.id}>
                            <a className="button">
                                Details
                            </a>
                        </Link>
                    </div>
                </div>
                )
            })
        )
    }

    return (
        <section className="hero ">
            <div className="hero-body">
            <div className="container">
                <section className="section">
                    <div className="columns is-multiline is-variable is-8">
                        { renderResource() }
                    </div>
                </section>
            </div>
            </div>
        </section>
    )
}

export default ResourceList;