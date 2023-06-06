import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'

const Home = () => {
    const {setAuth} = useAuth();
    const navigate = useNavigate();

    const logout = async () => {
        // if used in more components, this should be in context 
        // axios to /logout endpoint 
        //await axios.get('/logout', {withCredentials: true})
        setAuth({});
        navigate('/login');
    }
  return (
    <section>
            <h1>Home</h1>
            <br />
            <p>You are logged in!</p>
            <button onClick={logout}>Sign Out</button>
    </section>
  )
}

export default Home