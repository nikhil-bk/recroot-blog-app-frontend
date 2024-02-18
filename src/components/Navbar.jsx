import React, { useState, useContext, useEffect } from 'react'
import './Navbar.css';
import { Link } from 'react-router-dom';
import Logo from '../static/images/logo-recroot.png';
import { DataContext } from '../context/GlobalContext';




const Navbar = () => {

  const state = useContext(DataContext);
  const [isLogin, setIsLogin] = state.isLogin;
  const [toggle, setToggle] = useState(false)






  // for toggle
  const actToggle = () => {
    setToggle(!toggle)
  }

  // for close navbar if is open
  const closeNavbar = () => {
    if (toggle === true) {
      setToggle(false)
    }
  }

  // clear localstorage- enable login
  const logOutSubmit = () => {
    localStorage.clear();
    setIsLogin(false);
  }

useEffect(()=>{
  console.log(isLogin)
},[isLogin])
  return (
    <div className="nav-container">
    {console.log(isLogin)}
      <nav>
        <div className="logoBtn">
          <Link to="/" >
          <img src={Logo} alt=""/>
          </Link>
          <h3 style={{color:'white'}}>Blogs Site</h3>

          <div className="menu_icon" onClick={actToggle}>
            <div className={toggle ? "bar1 animateBar" : "bar bar1"}></div>
            <div className={toggle ? "bar2 animateBar" : "bar bar2"}></div>
            <div className={toggle ? "bar3 animateBar" : " bar3"}></div>

          </div>

        </div>

        <div className="links-container">
          <ul className={toggle ? "new-links links" : "links"} onClick={closeNavbar}>
            <li ><Link to="/">Home</Link></li>
            <li className={isLogin?"":"displayNone"}><Link to="/my-blogs">My Posts</Link></li>
            <li className={isLogin?"":"displayNone"}><Link to="/create">Create</Link></li>
            <li className={isLogin?"":"displayNone"}><Link to="/profile">Profile</Link></li>
            <li onClick={logOutSubmit} className={isLogin?"":"dispalyNone"}><Link to={isLogin ? '/' : "/login"}>{isLogin ? "Logout" : "Login"}</Link></li>




          </ul>
        </div>

      </nav>
    </div>
  )
}

export default Navbar
