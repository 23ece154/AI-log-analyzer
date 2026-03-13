// import { useState } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";

// function ResetPassword(){

// const {token} = useParams();
// const navigate = useNavigate();

// const [password,setPassword] = useState("");

// const handleSubmit = async(e)=>{
// e.preventDefault();

// await axios.post(
// `http://localhost:5000/api/auth/reset-password/${token}`,
// {password}
// );

// alert("Password updated");

// navigate("/");
// };

// return(

// <div className="auth-wrapper">
// <div className="card">

// <h2>Reset Password</h2>

// <form onSubmit={handleSubmit}>

// <input
// type="password"
// placeholder="Enter new password"
// value={password}
// onChange={(e)=>setPassword(e.target.value)}
// />

// <button className="primary-btn">
// Update Password
// </button>

// </form>

// </div>
// </div>

// );

// }

// export default ResetPassword;


import "../styles/Auth.css";
import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FaLock, FaRedo } from "react-icons/fa";

function ResetPassword(){

const {token} = useParams();
const navigate = useNavigate();

const [password,setPassword] = useState("");

const handleSubmit = async(e)=>{
e.preventDefault();

try{

await axios.post(
`http://localhost:5000/api/auth/reset-password/${token}`,
{password}
);

alert("Password updated successfully");

navigate("/login");

}catch(err){
alert(err.response?.data?.message || "Error updating password");
}

};

return(

<div className="auth-wrapper">

<div className="card">

<div className="icon-top">
<FaRedo/>
</div>

<h2>Reset Password</h2>
<p className="sub">Enter your new password</p>

<form onSubmit={handleSubmit}>

<div className="input-group">

<input
type="password"
placeholder="New Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

<FaLock className="input-icon"/>

</div>

<button className="primary-btn">
Update Password →
</button>

</form>

</div>

</div>

);

}

export default ResetPassword;