import axios from 'axios';
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Create = () => {
    const [blogData, setBlogData] = useState({
        title: "",
        content: ""
    })
    const [message, setMessage] = useState("")
    const navigate = useNavigate()
    const handleChangeBlogData = (e) => {
        const { name, value } = e.target;
        setBlogData({ ...blogData, [name]: value })
    }
    const handleBlogSubmit = async (event) => {
        event.preventDefault()
        await axios.post("/api/blog/create", blogData).then(res => {
            console.log(res)
            navigate("/my-blogs")
        }).catch(err => {
            console.log(err)
            setMessage(err.response.data.msg)
        })

    }

    return (
        <div className='container mt-5'>
            <Form>
                <h1>Create a blog for your interest</h1>
                {message && <span style={{ color: "red" }}>{message}</span>}
                <Form.Group className="mb-3 mt-4 " controlId="exampleForm.ControlInput1">
                    <Form.Label>Blog Title</Form.Label>
                    <Form.Control style={{ borderWidth: '3px' }} type="text" name="title" value={blogData.title} placeholder='enter the blog title' onChange={handleChangeBlogData} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Blog Content</Form.Label>
                    <Form.Control style={{ borderWidth: '3px' }} as="textarea" rows={10} name="content" value={blogData.content} placeholder="enter the blog content" onChange={handleChangeBlogData} />
                </Form.Group>
                <Button variant="success" onClick={handleBlogSubmit}>Submit</Button>
            </Form>
            {/* <form>
                <label>Title</label>
                <input type="text" name="title" value={blogData.title} placeholder='enter the blog title' onChange={handleChangeBlogData} />
                <br />
                <label>Content</label>
                <input type="text" name ="content" value={blogData.content} placeholder="enter the blog content" onChange={handleChangeBlogData} />
                <br />
                <button onClick={handleBlogSubmit}>Submit</button>
            </form> */}
        </div>
    )
}

export default Create