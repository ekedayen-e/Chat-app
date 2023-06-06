import axios from "../api/axios";
import { useAuth } from "../context/AuthProvider";


const useRefreshToken = () => {
    const {setAuth} = useAuth();

    const refresh = async() => {
        const response = await axios.get('/refresh', {withCredentials: true})
        setAuth(prev => {
            return {
                ...prev,
                name: response.data.name,
                email: response.data.email,
                accessToken: response.data.accessToken}
        });
        return response.data.accessToken
    }
    return refresh;
}

export default useRefreshToken