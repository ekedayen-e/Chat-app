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

function App() {
  return (
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
        </Route>
        </Route> 

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
