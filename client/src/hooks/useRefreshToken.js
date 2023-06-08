import axios from "../api/axios";
import { useAuth } from "../context/AuthProvider";
import { useChat } from "../context/ChatProvider";


const useRefreshToken = () => {
    const {setAuth} = useAuth();
    const {setChat} = useChat();
    const refresh = async() => {
        const response = await axios.get('/refresh', {withCredentials: true})
        setAuth(prev => {
            return {
                ...prev,
                name: response.data.name,
                email: response.data.email,
                accessToken: response.data.accessToken}
        })
        setChat(prev => {
            return {
                ...prev,
                id: response.data.chatid
            }
        })
        ;
        return response.data.accessToken
    }
    return refresh;
}

export default useRefreshToken