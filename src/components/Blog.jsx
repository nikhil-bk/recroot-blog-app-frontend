import axios from 'axios'
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { convertUtcToLocal } from '../utils/helper'
import { Button } from 'react-bootstrap'

const Blog = () => {
    const location = useLocation()
    const blogId = location?.state?._id
    const page = location?.state?.page
    const [blogData, setBlogData] = useState()
    useState(async () => {
        await axios.get(`/api/blog/getBlogById/${blogId}`).then(res => {
            console.log(res.data)
            setBlogData(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])
    return (
        <div className='container mt-4'>
            {blogData ?
                <div>
                    <h1>
                        {blogData?.title} </h1>
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: 'space-between' }}>
                        <div className="author-info">
                            {blogData.author?.profilePicture?.url && <img src={blogData.author?.profilePicture?.url} alt={`${blogData?.author?.username}'s profile`} className="author-img" />}

                            <div style={{ display: 'flex', flexDirection: "column" }}>
                                <span className="author-name">{blogData?.author?.username}</span>
                                <span className="posted-date">Posted at {convertUtcToLocal(blogData?.createdAt)} (UTC +5:30)</span>
                                <span className="posted-date">Last Update {convertUtcToLocal(blogData?.updatedAt)} (UTC +5:30)</span>

                            </div>



                        </div>
                        <div>
                            <p>{blogData?.content}</p>
                        </div>
                    </div></div> : <div>Loading...</div>}
        </div>
    )
}

export default Blog