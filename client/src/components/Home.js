import axios from 'axios';
import React from 'react'
import {useEffect, useState } from 'react'
import {Navigate} from 'react-router-dom'

function Home() {
  const [name, setName] = useState('')
  const [navigate, setNavigate] = useState(false)

  useEffect(() => {
    (
      async () => { 
        const {data} = await axios.get('http://localhost:3001/user')
        //setName(data.name)
        setName(data.first_name)
      } 
    )();
  }, [])

  const logout = async() => {
    await axios.post('http://localhost:3001/logout', {}, {withCredentials: true})

    setNavigate(true)
  }

  if(navigate) {
    return <Navigate to="/login" />
  }
  return (
    <div className='form-signin mt-5 text-center'>
      <h3>Welcome, {name}</h3>

      <button onClick={logout} className='btn btn-lg btn-primary'>Logout</button>
    </div>
  )
}

export default Home