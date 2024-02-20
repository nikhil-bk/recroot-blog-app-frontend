import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { convertUtcToLocal } from '../utils/helper'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const BlogCard = (props) => {
    const navigate = useNavigate()
    const handleBlogDelete = () => {
        const userConfirmed = window.confirm('Are you sure you want to delete?');

        if (userConfirmed) {

            axios.delete(`/api/blog/deleteBlogById/${props.blogItem._id}`).then(res => {
                console.log(res)
                navigate("/my-blogs")
            }).catch(err => {
                console.log(err)
            })
        } else {
            // User clicked "Cancel"
            console.log('Delete canceled');
        }
    }
    const handleEdit=(e)=>{
        e.preventDefault()
        navigate("/my-blogs/edit", { state: { _id: props.blogItem._id } })
    }
    return (
        <div>
            <Card className='card' onClick={() => navigate("/blog", { state: { _id: props.blogItem._id } })}>
                <Card.Body>
                    <Card.Title className='card-title'>{props.blogItem.title}</Card.Title>
                    <Card.Text className='card-description'>
                        {props.blogItem.content}
                    </Card.Text>
                    <div style={{ display: "flex", justifyContent: 'space-between' }}>
                        <div className="author-info">
                            {props?.blogItem?.author?.profilePicture?.url && <img src={props?.blogItem?.author?.profilePicture?.url} alt={`${props?.blogItem?.author?.username}'s profile`} className="author-img" />}
                            <div style={{ display: 'flex', flexDirection: "column" }}>
                                <span className="author-name">{props?.blogItem?.author?.username}</span>
                                <span className="posted-date">{convertUtcToLocal(props?.blogItem?.createdAt)} (UTC +5:30)</span>
                            </div>
                        </div>
                        {props.page === "my-blog" ?
                            <div>
                                <Button onClick={handleEdit} className='m-2' variant='warning'>Edit</Button>
                                <Button onClick={handleBlogDelete} className='m-2' variant='danger'>Delete</Button>
                            </div> :
                            <></>
                        }
                    </div>
                </Card.Body>

            </Card>

        </div>
    )
}

export default BlogCard