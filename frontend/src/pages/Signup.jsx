import "../styles/Auth.css";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";

function Signup(){

const navigate = useNavigate();

const [name,setName] = useState("");
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const handleSignup = async (e)=>{
e.preventDefault();

try{

await axios.post("http://localhost:5000/api/auth/signup",{
name,
email,
password
});

alert("Signup successful");

navigate("/login");

}catch(err){
alert(err.response?.data?.message || "Signup failed");
}

}

return(

<div className="auth-wrapper">

<div className="card">

<div className="icon-top">
<FaUser/>
</div>

<h2>Create account!</h2>

<form onSubmit={handleSignup}>

<div className="input-group">
<input
type="text"
placeholder="Name"
value={name}
onChange={(e)=>setName(e.target.value)}
/>
<FaUser className="input-icon"/>
</div>

<div className="input-group">
<input
type="email"
placeholder="E-mail"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>
<FaEnvelope className="input-icon"/>
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

<button className="primary-btn">
Create →
</button>

</form>

<p className="bottom-text">
Already have an account? <Link to="/login">Login</Link>
</p>

</div>

</div>

)

}

export default Signup;