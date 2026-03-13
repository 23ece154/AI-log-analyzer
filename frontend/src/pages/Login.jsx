import "../styles/Auth.css";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaSignInAlt } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";

function Login(){

const navigate = useNavigate();

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const handleLogin = async (e)=>{
e.preventDefault();

try{

const res = await axios.post("http://localhost:5000/api/auth/login",{
email,
password
});

localStorage.setItem("token",res.data.token);

navigate("/dashboard");

}catch(err){
alert(err.response?.data?.message || "Login failed");
}

}

return(

<div className="auth-wrapper">

<div className="card">

<div className="icon-top">
<FaSignInAlt/>
</div>

<h2>Welcome!</h2>
<p className="sub">Sign in to your account</p>

<form onSubmit={handleLogin}>

<div className="input-group">
<input
type="email"
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>
<FaUser className="input-icon"/>
</div>

<div className="input-group">
<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>
<FaLock className="input-icon"/>
</div>

<div className="row">
<label>
<input type="checkbox"/> remember me
</label>

<Link to="/forgot-password" className="link">
Forgot password?
</Link>
</div>

<button className="primary-btn">
Login →
</button>

</form>

<p className="bottom-text">
New user? <Link to="/signup">Signup</Link>
</p>

</div>

</div>

)

}

export default Login;