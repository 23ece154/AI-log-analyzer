const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

exports.signup = async (req, res) => {

    try{
        const{name, email, password} = req.body;
        const existingUser = await User.findOne({ email });

        if(existingUser){
            return res.status(400).json({message: "user already exist"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name, 
            email,
            password: hashedPassword
        });

        await user.save();

        res.json({message: "user registered successfully"});
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
};

exports.login = async (req, res) => {
 try {

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if(!user){
   return res.status(400).json({ message: "User not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if(!isMatch){
   return res.status(400).json({ message: "Invalid password" });
  }

  const token = jwt.sign(
   { id: user._id },
   "secretkey",
   { expiresIn: "1d" }
  );

  res.json({ token, user });

 } catch (error) {
  res.status(500).json({ error: error.message });
 }
};

exports.forgotPassword = async (req,res)=>{

 try{

 const {email} = req.body;

 const user = await User.findOne({email});

 if(!user){
  return res.status(404).json({message:"User not found"});
 }

 const token = crypto.randomBytes(32).toString("hex");

 user.resetToken = token;
 user.resetTokenExpire = Date.now() + 10*60*1000;

 await user.save();

 const resetLink = `http://localhost:5173/reset-password/${token}`;

 const transporter = nodemailer.createTransport({
  service:"gmail",
  auth:{
   user:"sri459874@gmail.com",
   pass:"ympf tyvv ixzc hwuv"
  }
 });

 await transporter.sendMail({
  from:"BugTracker",
  to:user.email,
  subject:"Password Reset",
  html:`<p>Click below link to reset password</p>
        <a href="${resetLink}">${resetLink}</a>`
 });

 res.json({message:"Reset link sent to email"});

 }catch(error){
  res.status(500).json({message:error.message});
 }

};

exports.resetPassword = async (req,res)=>{

 try{

 const {token} = req.params;
 const {password} = req.body;

 const user = await User.findOne({
  resetToken:token,
  resetTokenExpire:{$gt:Date.now()}
 });

 if(!user){
  return res.status(400).json({message:"Invalid or expired token"});
 }

 const hashedPassword = await bcrypt.hash(password,10);

 user.password = hashedPassword;
 user.resetToken = undefined;
 user.resetTokenExpire = undefined;

 await user.save();

 res.json({message:"Password updated successfully"});

 }catch(error){
  res.status(500).json({message:error.message});
 }

};