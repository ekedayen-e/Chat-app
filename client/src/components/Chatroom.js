import React from 'react'
import { useChat } from '../context/ChatProvider'
import {useState, useEffect, useRef, useCallback} from 'react'
import axios from '../api/axios'
import { useAuth } from '../context/AuthProvider'

const Chatroom = () => {
    const {auth} = useAuth();
    const {chat} = useChat();
    const[message, setMessage] = useState('')
    const[messages, setMessages] = useState([{}])
    const autoScroll = useRef()

    const send = async(e) => {
        e.preventDefault();
        if(message === '') {
            autoScroll.current.scrollIntoView({behavior: "smooth"})
            return;
        }
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
            autoScroll.current.scrollIntoView({behavior: "smooth"})
    } catch {
        console.log("Something Went Wrong")
    }
    autoScroll.current.scrollIntoView({behavior: "smooth"})
    }

    const getPrevChats = useCallback( async() => {
        let source = chat.id
        let response = await axios.get(`/get-messages/${source}`, {withCredentials: true})
        setMessages(response.data)
    }, [messages])

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

    useEffect(() => {
        const interval = setInterval(() => {
        getPrevChats();
        }, 1000);
        return () => clearInterval(interval)
    }, [])

  return (
    <div>
    <main>
        <h1>Welcome to ChatRoom!</h1>
        <ul>
            {messages.map(make)}
        </ul>
        <span ref={autoScroll}></span>
    </main>
        <form onSubmit={send}>
              <input type="text" value={message} onChange={e => setMessage(e.target.value)}></input>
              <button type="submit">Send</button>
        </form>
    </div>
  )
}

export default Chatroom