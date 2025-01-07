import React from "react";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home'
import NotFound from "./pages/NotFound";
import LoginRegisterContainer from "./pages/LoginRegisterContainer";
import { AuthProvider } from "./components/Auth";
import MiMenu from "./pages/MiMenu";
import Menu from "./pages/Menu";
import MisPedidos from "./pages/MisPedidos";
import './assets/css/index.css'

function App() {


  
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<LoginRegisterContainer/>}/>
          <Route path="/register" element={<LoginRegisterContainer/>}/>
          <Route path="/mi-menu" element={<MiMenu/>}/>
          <Route path="/mis-pedidos" element={<MisPedidos/>}/>
          <Route path="*" element={<NotFound/>} />
          <Route path="/menu/:id" element={<Menu/>}/>
        </Routes>
      </Router>
    </AuthProvider>
    
  
  );
}

export default App;
