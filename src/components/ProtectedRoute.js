import { Navigate } from 'react-router-dom'
import { DataContext } from '../context/GlobalContext';
import { useContext } from 'react';





function ProtectedRoute({ path, children }) {
    const storedToken =  localStorage.getItem('tokenStore')

    return storedToken ? (
        children
    ) : (
        <Navigate to={'/login'} />
    )
}

export default ProtectedRoute