
import './App.css';

import Home from './components/Home';
import Login from './components/Login';
import { Route, Routes, Navigate } from 'react-router-dom';

import Register from './components/Register';
import Navbar from './components/Navbar';
import Create from './components/Create';
import Profile from './components/Profile';
import MyPosts from './components/MyBlogs';
import Edit from "./components/Edit"

import Blog from './components/Blog';
import ProtectedRoute from './components/ProtectedRoute';
import MyBlogs from './components/MyBlogs';



function App() {




  return (
    <div >
   
      <Navbar />

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/create" element={
        <ProtectedRoute>
          <Create/>
        </ProtectedRoute>} />
        <Route exact path="/blog" element={ <ProtectedRoute>
          <Blog />
        </ProtectedRoute>} />
        <Route exact path="/my-blogs" element={ <ProtectedRoute>
          <MyBlogs/>
        </ProtectedRoute>} />
        <Route exact path="/profile" element={ <ProtectedRoute>
          <Profile />
        </ProtectedRoute>} />
        <Route exact path="/my-blogs/edit" element={ <ProtectedRoute>
          <Edit/>
        </ProtectedRoute>} />
      </Routes>


      {/* <Footer /> */}
    </div>
  );
}

export default App;
