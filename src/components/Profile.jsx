import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Profile = () => {
  const [userData, setUserData] = useState(null)
  useEffect(() => {
    axios.get("/api/user/getuser").then(res => {
      console.log(res)
      setUserData(res.data)
    }).catch(err => {
      console.log(err)
    })
  }, [])
  return (
    <div className='container m-5' >
      {
        userData ?
          <div style={{ display: 'flex', flexDirection: 'row', gap: "20px", width: "150px", height: "175px", borderRadius: "50%" }}>
            <div style={{ display: 'flex', flexDirection: "column", justifyContent: "center", width: 'fit-content' }}>
              <img src={userData?.profilePicture?.url} alt="profile photo" />
              <label>Profile Picture</label>
            </div>

            <div style={{ width: '100%' }}>
              <label>Username</label>
              <h3>{userData?.username}</h3>
              <label>Email</label>
              <h3>{userData?.email}</h3>
              <label>Cretaed At</label>
              <h3>{userData?.createdAt}</h3>
            </div>
          </div> :
          <div>Loading...</div>
      }

    </div>
  )
}

export default Profile