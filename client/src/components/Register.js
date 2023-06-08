import React from 'react'
import { useState } from 'react';
import {useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import '../Register.css'

const Register = () => {
  const navigate = useNavigate();
  const [first_name, setFname] = useState('');
  const [last_name, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const handleSubmit = async(e) => {
    e.preventDefault();
    await axios.post('/register',
    {
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password,
    },
    {withCredentials: true}
    )
    setFname('');
    setLname('');
    setEmail('');
    setPassword('')
    navigate('/login', { replace: true })
  
  }

  return (
    <section>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <article className='item'>
                <label id='fnlbabel' className='rlabel' htmlFor="fname">First Name:</label>
                <input
                style={{backgroundColor:'gray', border: '1px solid white', color:'white'}} size='30'
                    type="text"
                    id="fname"
                    className='form-input'
                    autoComplete="off"
                    onChange={(e) => setFname(e.target.value)}
                    value={first_name}
                    required
                />
                </article>
                <article className='item'>
<label className='rlabel'htmlFor="lname">Last Name:</label>
                <input
                style={{backgroundColor:'gray', border: '1px solid white', color:'white'}} size='30'
                    type="text"
                    id="lname"
                    className='form-input'
                    autoComplete="off"
                    onChange={(e) => setLname(e.target.value)}
                    value={last_name}
                    required
                />
                </article>
                <article className='item'>
                <label id='elabel' className='rlabel' htmlFor="email">Email:</label>
                <input style={{backgroundColor:'gray', border: '1px solid white', color:'white'}} size='30'
                    type="text"
                    id="email"
                    className='form-input'
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                />
                </article>
                <article className='item'>
                <label id='pdlabel' className='rlabel' htmlFor="password">Password:</label>
                <input style={{backgroundColor:'gray', border: '1px solid white', color:'white'}} size='30'
                    type="password"
                    className='form-input'
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                />
                </article>
                <br />
                <button  style={{cursor: 'pointer', margin:'1%' ,backgroundColor: 'black', color: 'white'}}>Register</button>
            </form>
        </section>

  )
}

export default Register