import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'
import useLogout from '../hooks/useLogout'

const Home = () => {
    const navigate = useNavigate();
    const logout = useLogout();
    const {auth} = useAuth();

    const signOut = async () => {
        // if used in more components, this should be in context 
        // axios to /logout endpoint 
        await logout();
        navigate('/login');
    }
  return (
    <section>
            <h1>Home</h1>
            <br />
            <p>Welcome, {auth.name}!</p>
            <button onClick={signOut}>Sign Out</button>
    </section>
  )
}

export default Home