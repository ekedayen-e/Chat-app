import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import {Navigate} from 'react-router-dom'

function Login() {
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('')
    const [navigate, setNavigate] = useState(false)

    const submit = async (e) => {
        e.preventDefault()
        console.log(email, password)
        const {data} = await axios.post('http://localhost:3001/login', {
            email: email,
            password: password
        }, {withCredentials: true})
        axios.defaults.headers.common['Authorization'] = `Bearer ${data['accessToken']}`

        setNavigate(true)
    }
    if(navigate) {
        return <Navigate to='/' />
    }
  return (
    <main className="form-signin">
        <form onSubmit={submit}>
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

            <div className="form-floating">
                <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"
                    onChange={e => setEmail(e.target.value)}
                />
                <label htmlFor="floatingInput">Email address</label>
            </div>

            <div className="form-floating">
                <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
                onChange={e => setPassword(e.target.value)}
                />
                <label htmlFor="floatingPassword">Password</label>
            </div>

            <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
        </form>
    </main>
  )
}

export default Login