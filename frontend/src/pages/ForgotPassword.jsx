// import { useState } from "react";
// import axios from "axios";

// function ForgotPassword(){

// const [email,setEmail] = useState("");

// const handleSubmit = async(e)=>{
// e.preventDefault();

// await axios.post(
// "http://localhost:5000/api/auth/forgot-password",
// {email}
// );

// alert("Reset link sent to your email");
// };

// return(

// <div className="auth-wrapper">
// <div className="card">

// <h2>Forgot Password</h2>

// <form onSubmit={handleSubmit}>

// <input
// type="email"
// placeholder="Enter your email"
// value={email}
// onChange={(e)=>setEmail(e.target.value)}
// />

// <button className="primary-btn">
// Send Reset Link
// </button>

// </form>

// </div>
// </div>

// );

// }

// export default ForgotPassword;


import "../styles/Auth.css";
import { useState } from "react";
import axios from "axios";
import { FaEnvelope, FaKey } from "react-icons/fa";

function ForgotPassword(){

const [email,setEmail] = useState("");

const handleSubmit = async(e)=>{
e.preventDefault();

try{

await axios.post(
"https://ai-log-analyzer-mc45.onrender.com/api/auth/forgot-password",
{email}
);

alert("Reset link sent to your email");

}catch(err){
alert(err.response?.data?.message || "Something went wrong");
}

};

return(

<div className="auth-wrapper">

<div className="card">

<div className="icon-top">
<FaKey/>
</div>

<h2>Forgot Password</h2>
<p className="sub">Enter your email to receive reset link</p>

<form onSubmit={handleSubmit}>

<div className="input-group">

<input
type="email"
placeholder="Enter your email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

<FaEnvelope className="input-icon"/>

</div>

<button className="primary-btn">
Send Reset Link →
</button>

</form>

</div>

</div>

);

}

export default ForgotPassword;