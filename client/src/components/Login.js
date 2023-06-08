import React from 'react'
import { useAuth } from '../context/AuthProvider'
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import '../Login.css'

const Login = () => {
    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/login', 
                {email, password},
                {withCredentials: true})
                console.log(response)
                setAuth({...response.data})
                setEmail('')
                setPassword('')
                navigate('/', { replace: true });
            } catch {
                console.log("Invalid Information")
            }
        }

  return (
    <section>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
<label htmlFor="email">Email:  </label>
                <input style={{backgroundColor:'gray', border: '1px solid white', color:'white'}} size='30'
                    type="text"
                    id="email"
                    className='form-input'
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                />
 
                <label id='plabel' htmlFor="password">Password:  </label>
                <input style={{backgroundColor:'gray', border: '1px solid white', color:'white'}} size='30'
                    type="password"
                    className='form-input'
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                />
                <button  style={{cursor: 'pointer', margin:'1%' ,backgroundColor: 'black', color: 'white'}}>Sign In</button>
            </form>
            <p style={{color: 'orange'}}>
                Need an Account?<br />
                <span className="line">
                    <Link cursor='pointer' className="chatlink2" to="/register">Sign Up</Link>
                </span>
            </p>
        </section>

  )
}

export default Login