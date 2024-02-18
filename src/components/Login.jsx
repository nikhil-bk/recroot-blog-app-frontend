import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { DataContext } from '../context/GlobalContext'
import { Button, Card, Form } from 'react-bootstrap'

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  })

  const state = useContext(DataContext);
  const [isLogin, setIsLogin] = state.isLogin;
  const location = useLocation()
  const preMsg = location?.state?.msg
  const [message, setMessage] = useState(preMsg ? preMsg : "")
  const navigate = useNavigate()
  const [validated, setValidated] = useState(false);
  const handleChangeCredentials = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value })
  }
  const handleLogin = async (event) => {

    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      try {
        await axios.post("/api/user/login", credentials).then(
          res => {
            localStorage.setItem('tokenStore', res.data.token);
            axios.defaults.headers.common["Authorization"] = res.data.token
            console.log(res)
            setIsLogin(true);
            navigate("/my-blogs")
          }
        )
      } catch (err) {
        console.log(err.response)
        setMessage(err?.response?.data?.msg)
      }
    }

    setValidated(true);

  }
  const handleResetForm = (event) => {
    event.stopPropagation();
    setCredentials({
      email: '',
      password: ''
    })

  }
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignContent: "center", marginTop: "10rem" }}>
      <Card style={{ width: '18rem' }}>

        <Card.Body>
          <Card.Title>Please login to post blogs</Card.Title>
          {message && <span style={{ color: "red" }}>{message}</span>}
          <Form noValidate validated={validated} onSubmit={handleLogin}>


            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control required type="email" name="email" value={credentials.email} onChange={handleChangeCredentials} placeholder="name@example.com" />
              <Form.Control.Feedback type="invalid">
                Please choose proper email format.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control required type="password" name="password" value={credentials.password} onChange={handleChangeCredentials} placeholder="password" />
              <Form.Control.Feedback type="invalid">
                Password cannot be blank.
              </Form.Control.Feedback>
            </Form.Group>
            <div className='m-2'>
              <span>Are you new user?</span>
              <span onClick={() => navigate("/register")} style={{ color: "blue", cursor: "pointer" }}> Register</span>

            </div>
            <div className="mt-2" style={{ display: "flex", justifyContent: "space-between" }}>
              <Button variant="success" type="submit" style={{ width: "fit-content" }}>Login</Button>

              <Button onClick={handleResetForm} variant="danger" style={{ width: "fit-content" }}>Reset</Button>


            </div>
          </Form>



        </Card.Body>
      </Card>


    </div>
    // <div>
    //   <form>
    //     <br />
    //     <label>Email</label>
    //     <input type="email" name="email" value={credentials.email} onChange={handleChangeCredentials} placeholder='Enter your email-id' />
    //     <br />
    //     <label>Password</label>
    //     <input type="password" name="password" value={credentials.password} onChange={handleChangeCredentials} placeholder="Enter your password" />
    //     <br />
    //     <button onClick={handleLogin}>Submit</button>
    //     <p>Are you new user?</p>
    //     <Link to="/register">Register</Link>
    //   </form>
    // </div>
  )
}

export default Login