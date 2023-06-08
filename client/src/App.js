import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register';
import Home from './components/Home';
import Layout from './components/Layout';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import RequireAuth from './components/RequireAuth';
import PersistLogin from './components/PersistLogin';
import { ChatProvider } from './context/ChatProvider';
import Chatroom from './components/Chatroom';
import io from 'socket.io-client'

const connection = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging' ? 'https://rom-net.onrender.com/' : 'http://localhost:3001'
const socket = io.connect(connection)

function App() {
  return (
    <ChatProvider>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* we want to protect these routes */}
        <Route element={<PersistLogin />}>
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chatroom socket={socket}/>} />
        </Route>
        </Route> 

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
    </BrowserRouter>
    </ChatProvider>
  );
}

export default App;
