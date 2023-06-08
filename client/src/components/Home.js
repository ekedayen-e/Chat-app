import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'
import useLogout from '../hooks/useLogout'
import {useState, useEffect} from 'react'
import axios from '../api/axios'
import { useChat } from '../context/ChatProvider'
import '../Home.css'


const Home = () => {
    const navigate = useNavigate();
    const logout = useLogout();
    const {auth} = useAuth();
    const {setChat} = useChat();
    const[email, setEmail] = useState('')
    const[conversations, setConversations] = useState([{}])

    const signOut = async () => {
        // if used in more components, this should be in context 
        // axios to /logout endpoint 
        await logout();
        navigate('/login');
    }

    const createChat = async (e) => {
      if(conversations.includes(email)) {
        console.log("Chat already exists")
        return;
      }
      e.preventDefault();
      let sender = auth.email 
      try {
      const {data} = await axios.post('/create-chat',
      {
        origin: sender,
        recipient: email
      },
      {withCredentials: true}
      )
      setConversations((prev) => {
        return [
          ...prev,
          {
            origin: sender,
            recipient: email,
            id: data.id
          }
        ]
      })
      setEmail('')
    } catch {
      console.log("Invalid mailing address")
    }
    }

    const getChats = async () => {
      let source = auth.email;
      let response = await axios.get(`/get-chats/${source}`, {withCredentials: true})
      setConversations(response.data)
    }

    const storeInfo = async(id) => {
      setChat(id);
      await axios.get(`/chat-cookies/${id.id}`, {withCredentials: true})
      //console.log(response)
    }

    useEffect(() => {
      getChats();
    }, [])

  return (
    <section>
            <h1>Home</h1>
            <br />
            <p>Welcome, {auth.name}!</p>
            <form onSubmit={createChat}>
            <label>Create A Chat: </label>
              <input style={{backgroundColor:'gray', border: '1px solid white', color:'white'}} size='40' type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder='exampe@ex.com'></input>
              <button style={{cursor: 'pointer', backgroundColor: 'black', color: 'white'}} type="submit">Add</button>
            </form>
            <div>
              <ul style={{listStyle: 'none'}}>
              {conversations.map((conversation) => {
                  return (
                    <Link className="chatlink" onClick={async() => storeInfo({id: conversation.id})} to="/chat"><li className="chatlink" key={conversation.id}>{conversation.recipient == auth.email ? conversation.origin : conversation.recipient}</li></Link> 
                  )
                })}
              </ul>
            </div>
            <button style={{cursor:'pointer', backgroundColor: 'black', color: 'white'}} onClick={signOut}>Sign Out</button>

    </section>
  )
}

export default Home