import axios from 'axios';
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

const Edit = () => {
    const [blogData, setBlogData] = useState({
        title: "",
        content: ""
    })
    const [message, setMessage] = useState("")
    const location = useLocation()
    const blogId = location?.state?._id
    const navigate = useNavigate()
    const handleChangeBlogData = (e) => {
        const { name, value } = e.target;
        setBlogData({ ...blogData, [name]: value })
    }
    const handleBlogEditSubmit = async (event) => {
        event.preventDefault()
        await axios.put(`/api/blog/updateById/${blogId}`, blogData).then(res => {
            console.log(res)
            navigate("/my-blogs")
        }).catch(err => {
            console.log(err)
            setMessage(err.response.data.msg)
        })

    }
    useState(async () => {
        await axios.get(`/api/blog/getBlogById/${blogId}`).then(res => {
            setBlogData({
                title: res.data.title,
                content: res.data.content
            })
        }).catch(err => {
            console.log(err)
        })
    }, [])
    return (
        <div className='container mt-5'>
            <Form>
                <h1>Update your blog</h1>
                {message && <span style={{ color: "red" }}>{message}</span>}
                <Form.Group className="mb-3 mt-4 " controlId="exampleForm.ControlInput1">
                    <Form.Label>Blog Title</Form.Label>
                    <Form.Control style={{ borderWidth: '3px' }} type="text" name="title" value={blogData.title} placeholder='enter the blog title' onChange={handleChangeBlogData} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Blog Content</Form.Label>
                    <Form.Control style={{ borderWidth: '3px' }} as="textarea" rows={10} name="content" value={blogData.content} placeholder="enter the blog content" onChange={handleChangeBlogData} />
                </Form.Group>
                <Button variant="success" onClick={handleBlogEditSubmit}>Edit</Button>
            </Form>

        </div>
    )
}

export default Edit