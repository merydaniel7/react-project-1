import Layout from "components/Layout";


const ResourceDetail = () => {
    return(
        <Layout>
        <section className="hero ">
            <div className="hero-body">
                <div className="container">
                    <section className="section">
                        <div className="columns">
                            <div className="column is-8 is-offset-2">
                                <div className="content is-medium">
                                    <h2 className="subtitle is-4">DATE</h2>
                                    <h1 className="title">TITLE</h1>
                                    <p>
                                    DESC
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </section>
        </Layout>        
    )

}

export default ResourceDetail;