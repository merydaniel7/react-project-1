import Layout from "components/Layout";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const DEFAULT_DATA = {
    title: "",
    description: "",
    link: "",
    priority: 2,
    timeToFinish: 60
}


const ResourceCreate = () => {
    const [form, setForm] = useState(DEFAULT_DATA)
    const router = useRouter();

    const submitForm = () => {
        axios.post("/api/resources", form)
            .then(res => alert(res?.data))
            .then(_ => {router.push("/")})
            .catch(err => alert(err?.response?.data));
        }

    const resetForm = () => setForm(DEFAULT_DATA);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm({
        ...form,
        [name]: value})
    }

    return (
        <Layout>
            <div className="container">
                <div className="columns">
                    <div className="column is-8 is-offset-2">
                        <div className="resource-form">
                            <h1 className="title">Add new resource</h1>
                            <form>
                                <div className="field">
                                    <label className="label">Name</label>
                                    <div className="control">
                                        <input 
                                        value={form.title}
                                        onChange={handleChange}
                                        name="title"
                                        className="input"
                                        type="text"
                                        placeholder="Learn Next JS and Sanity 10" />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Description</label>
                                    <div className="control">
                                        <textarea
                                        value={form.description}
                                        onChange={handleChange}
                                        name="description"
                                        className="textarea"
                                        placeholder="These technologies enable better SEO"></textarea>
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Link</label>
                                    <div className="control">
                                        <input value={form.link}
                                        onChange={handleChange}
                                        name="link"
                                        className="input"
                                        type="text"
                                        placeholder="https://mgconsult.blog.hu" />
                                    </div>
                                </div>
                                <div className="field">
                                <label className="label">Priority</label>
                                <div className="control">
                                    <div className="select">
                                    <select
                                    value={form.priority}
                                    onChange={handleChange}
                                    name="priority">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                    </select>
                                    </div>
                                </div>
                                </div>
                                <div className="field">
                                    <label className="label">Time to finish</label>
                                    <div className="control">
                                        <input
                                        value={form.timeToFinish}
                                        onChange={handleChange}
                                        name="timeToFinish"
                                        className="input"
                                        type="number" />
                                    </div>
                                    <p className="help">Time in minutes</p>
                                </div>
                                <div className="field is-grouped">
                                    <div className="control">
                                        <button
                                        type="button"
                                        onClick={submitForm}
                                        className="button is-link">Submit</button>
                                    </div>
                                    <div className="control">
                                        <button
                                        type="button"
                                        onClick={resetForm}
                                        className="button is-link is-light">Cancel</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default ResourceCreate;