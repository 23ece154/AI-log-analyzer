import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import "./styles/App.css";

function App(){

  return(

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Landing/>} />

        <Route path="/login" element={<Login/>} />

        <Route path="/signup" element={<Signup/>} />

        <Route path="/dashboard" element={<Dashboard/>} />

        <Route path="/forgot-password" element={<ForgotPassword/>} />

        <Route path="/reset-password/:token" element={<ResetPassword/>} />

      </Routes>

    </BrowserRouter>

  );

}

export default App;