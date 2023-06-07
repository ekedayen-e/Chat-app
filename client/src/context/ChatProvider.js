import {createContext, useState, useContext} from 'react'

const ChatContext = createContext({});

export const useChat = () => {
    const {chat} = useContext(ChatContext)
    return useContext(ChatContext)
    }

export const ChatProvider = ({ children }) => {
    const [chat, setChat] = useState({})

    return (
        <ChatContext.Provider value={{chat, setChat}}>
        {children}
        </ChatContext.Provider>
    )
}
