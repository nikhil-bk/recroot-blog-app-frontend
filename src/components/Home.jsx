import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import BlogCard from './BlogCard'




const Home = () => {
    const [allBlogs, setAllBlogs] = useState([])
    const [availablePost, setAvailablePost] = useState(true)
    useEffect(() => {
        axios.get("/api/blog/getAllBlogs").then(res => {
            console.log(res)
            setAllBlogs(res.data)
            if (res.data.length === 0) {
                setAvailablePost(false)
            }
        }).catch(err => {
            console.log(err)
        })
    }, [])
    return (
        <div style={{ display: 'flex', flexDirection: "column", marginLeft: "3rem", marginRight: "3rem", marginTop: "5rem" }}>
        <h1>All Blogs</h1>
            {allBlogs.length > 0 ?
                allBlogs.map((blogItem) => <BlogCard blogItem={blogItem} page="home" />)

                :
                availablePost === false ? <div>There is no available blogs to show</div> : <div>Loading...</div>}

        </div>
    )
}

export default Home