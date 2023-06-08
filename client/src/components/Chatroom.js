import React from 'react'
import { useChat } from '../context/ChatProvider'
import {useState, useEffect, useRef} from 'react'
import axios from '../api/axios'
import { useAuth } from '../context/AuthProvider'
import { useNavigate } from 'react-router-dom'



const Chatroom = ({socket}) => {
    const {auth} = useAuth();
    const {chat, setChat} = useChat();
    const[message, setMessage] = useState('')
    const[messages, setMessages] = useState([{}])
    const autoScroll = useRef()
    const navigate = useNavigate()

    const scrollToBottom = () => {
        autoScroll.current.scrollIntoView({behavior: "instant"})
    }

    const send = async(e) => {
        e.preventDefault();
        if(message === '') {
           // scrollToBottom();
            return;
        }
        socket.emit('message', {id: chat.id, message, topic: message, sent_by: auth.email})
        try {
            await axios.post('/send',
            {
                id: chat.id,
                topic: message,
                sent_by: auth.email
            },
            {withCredentials: true})
            setMessages((prev) => {
                return [
                    ...prev,
                    {
                        id: chat.id,
                        topic: message,
                        sent_by: auth.email
                    }
                ]
            })
            setMessage('')
            //scrollToBottom();
    } catch {
        console.log("Something Went Wrong")
    }
    autoScroll.current.scrollIntoView({behavior: "smooth"})
    }

    const getPrevChats = async() => {
        let source = chat.id
        let response = await axios.get(`/get-messages/${source}`, {withCredentials: true})
        setMessages(response.data)
    }

    const make = (mes, i) => {
        let col = 'red';
        if(mes.sent_by === auth.email) {
            col = 'blue';
        }
        return (
            <li key={i} style={{color: col, textDecoration: 'none'}}>
            {mes.topic}
            </li>
        )
    }

    const deleteChat = async() => {
        let source = chat.id
        await axios.delete(`/delete-chat/${source}`, {withCredentials: true})
        navigate('/', { replace: true })
        setChat({})
    }

    useEffect(() => {
        socket.on('messageResponse', (data) => {
            console.log('refreshed!')
            getPrevChats();
            scrollToBottom();
            return;
        })
        return () => {
            socket.off('messageResponse');
        };
    }, [socket, messages])

    useEffect(() => {
        getPrevChats();
    }, [])

  return (
    <div>
    <main>
    <button onClick={() => navigate(-1)} style={{cursor: 'pointer', width: '5%',backgroundColor: 'black', color: 'white', position: 'fixed', top: '5%', left: '5%'}} >Back</button>
    <button onClick={() => deleteChat()} style={{cursor: 'pointer',width: '5%',backgroundColor: 'black', color: 'white', position: 'fixed', top: '5%', right: '5%'}} >Delete Chat</button>
        <h1>Welcome to ChatRoom!</h1>
        <ul style={{width: '50%', listStyle: 'none', margin: '0 auto'}}>
            {messages.map(make)}
        </ul>
        <span ref={autoScroll}></span>
    </main>
        <form  style={{position: 'fixed', bottom: '0', right: '0', zIndex: '1'}} onSubmit={send}>
              <input style={{backgroundColor:'gray', border: '1px solid white', color:'white'}} size='40' type="text" value={message} onChange={e => setMessage(e.target.value)}></input>
              <button style={{cursor:'pointer', backgroundColor: 'black', color: 'white'}} type="submit">Send</button>
        </form>
    </div>
  )
}

export default Chatroom