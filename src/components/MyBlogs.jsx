import axios from 'axios'
import React, { useEffect, useState } from 'react'

import BlogCard from './BlogCard'
import { useNavigate } from 'react-router-dom'

const MyBlogs = () => {

  const [myBlogs, setMyBlogs] = useState([])
  const [availablePost, setAvailablePost] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    axios.get("/api/blog/getBlogsByUser").then(res => {
      console.log(res)
      setMyBlogs(res.data)
      if (res.data.length === 0) {
        setAvailablePost(false)
      }
    }).catch(err => {
      console.log(err)
    })
  }, [])
  return (
    <div style={{ display: 'flex', flexDirection: "column", marginLeft: "3rem", marginRight: "3rem", marginTop: "5rem" }}>
      <h1>All your blogs</h1>
      {myBlogs.length > 0 ?
        myBlogs.map((blogItem) => <BlogCard blogItem={blogItem} page="my-blog" />)
        :

        availablePost === false ? <div>There is no available blogs to show,<span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => navigate("/create")}>Create blog</span></div> : <div>Loading...</div>}

    </div>
  )
}

export default MyBlogs
