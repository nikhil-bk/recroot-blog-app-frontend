import axios from 'axios';
import React, { useRef, useState } from 'react'
import { Button, Card, Form}from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


const Register = () => {
    const [profilePicture, setProfilePicture] = useState(false);
    const [message,setMessage]=useState("")
    const navigate = useNavigate()
    const [validated, setValidated] = useState(false);
    const fileInputRef = useRef(null);
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: ''
    })
    const handleImageUpload = async (e) => {

        e.preventDefault();

        try {
            const file = e.target.files[0];
            if (!file) return alert('no files exist')

            if (file.size > 1024 * 1024) {
                return alert('size is too big')
            }

            if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
                return alert('incorrect file format')
            }

            let formData = new FormData();
            formData.append('file', file);

            const res = await axios.post('/upload', formData, {
                headers: { 'content-type': 'multipart/form-data' }
            })
            console.log(res.data)
            setProfilePicture(res.data);


        } catch (err) {
            console.log(err.response.data.msg);
        }

    }
    const handleDestroy = async () => {

        try {

            await axios.post('/destroy', { public_id: profilePicture.public_id })
            setProfilePicture(false);
            fileInputRef.current.value = ''

        } catch (err) {
            console.log(err.response.data.msg);
        }


    }

    const handleChangeUserData = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value })
    }
    const handleResetForm = (event) => {
        event.stopPropagation();
        setUserData({
            username: '',
            email: '',
            password: ''
        })
        if (profilePicture) {
            handleDestroy()
            fileInputRef.current.value = ''

        }
    }
    const handleRegister = async (event) => {

        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === true) {
            try {
                await axios.post("/api/user/register", { ...userData, profilePicture }).then(
                    res => {
                        console.log(res)

                        setProfilePicture(false)
                        navigate("/login",{state:{msg:"Registered successfully.Please Login"}})
                    }
                )
            } catch (err) {
                console.log(err)
                setMessage(err.response.data.msg)
            }
        }

        setValidated(true);
    }
    return (
        <div style={{ display: 'flex', justifyContent: 'center', margin: "2rem" }}>
            <Card style={{ width: '18rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    {profilePicture ? <>
                        <Card.Img variant="top" src={profilePicture.url} width={100} height={150} style={{ borderRadius: "50%" }} />
                        <Button onClick={handleDestroy} variant="danger" style={{ width: "fit-content" }}>Remove</Button>
                    </> : <></>}
                </div>
                <Card.Body>
                {message &&<span style={{color:"red"}}>{message}</span>}
                    <Card.Title>Create an account</Card.Title>
                    <Form noValidate validated={validated} onSubmit={handleRegister}>
                        <Form.Group>
                            <Form.Label>Profile Picture</Form.Label>
                            <Form.Control type="file" ref={fileInputRef} onChange={handleImageUpload} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <Form.Control required type="test" name="username" value={userData.username} onChange={handleChangeUserData} placeholder="Enter the username" />
                            <Form.Control.Feedback type="invalid">
                                Please choose a username.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control required type="email" name="email" value={userData.email} onChange={handleChangeUserData} placeholder="name@example.com" />
                            <Form.Control.Feedback type="invalid">
                                Please choose proper email format.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control required type="password" name="password" value={userData.password} onChange={handleChangeUserData} placeholder="password" />
                            <Form.Control.Feedback type="invalid">
                                Password cannot be blank.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <br />
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <Button variant="success" type="submit" style={{ width: "fit-content" }}>Submit</Button>
                            {/* {loading ? <div>Loading</div> : <></>} */}
                            <Button onClick={handleResetForm} variant="danger" style={{ width: "fit-content" }}>Reset</Button>
                            {/* {loading?<></>:<></>} */}

                        </div>
                    </Form>



                </Card.Body>
            </Card>


        </div >
    )
}

export default Register