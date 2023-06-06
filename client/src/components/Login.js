import React from 'react'
import { useAuth } from '../context/AuthProvider'
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../api/axios';

const Login = () => {
    const { setAuth } = useAuth();

    const navigate = useNavigate();

   // const [first_name, setFname] = useState('');
    //const [last_name, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/login',
                {email, password},
                {withCredentials: true})
                setAuth({...response.data})
                //setFname('')
                //setLname('')
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
            {/*
                <label htmlFor="fname">First Name:</label>
                <input
                    type="text"
                    id="fname"
                    autoComplete="off"
                    onChange={(e) => setFname(e.target.value)}
                    value={first_name}
                    required
                />

<label htmlFor="lname">Last Name:</label>
                <input
                    type="text"
                    id="lname"
                    autoComplete="off"
                    onChange={(e) => setLname(e.target.value)}
                    value={last_name}
                    required
                />
*/}
<label htmlFor="email">Email:</label>
                <input
                    type="text"
                    id="emial"
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                />
                <button>Sign In</button>
            </form>
            <p>
                Need an Account?<br />
                <span className="line">
                    <Link to="/register">Sign Up</Link>
                </span>
            </p>
        </section>

  )
}

export default Login