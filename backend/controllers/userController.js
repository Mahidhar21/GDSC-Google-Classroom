import bcrypt from "bcrypt";
import User from "../models/user.js";
import axios from 'axios';
import qs from 'querystring';
import dotenv from 'dotenv';

dotenv.config();
//In user login please send the email and password to the backend.
const handleUserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: "false",
        message: "No user exists with the provided email",
      });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: "false", message: "Incorrect password" });
    }

    // Exclude sensitive fields before sending the response
    const { password: _password, ...userWithoutPassword } = user._doc;
    // Renamed destructured password
    return res.status(200).json({ success: "true", user: userWithoutPassword });
  } catch (error) {
    console.error("Error during user login:", error);
    return res
      .status(500)
      .json({ success: "false", message: "An internal server error occurred" });
  }
};

//In user signup please send name and email,password.
const handleUserSignup = async (req, res) => {
  try {
    
    const { name, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: "false",
        message: "User with this email already exists",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); 

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    // Exclude sensitive fields before sending the response
    const { password: _password, ...userWithoutPassword } = newUser._doc;

    return res.status(201).json({
      success: "true",
      message: "User registered successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Error during user signup:", error);
    return res.status(500).json({
      success: "false",
      message: "An internal server error occurred",
    });
  }
};


const handleUserRedirect=async (req,res)=>{
  const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
  const options = {
    redirect_uri: process.env.GOOGLE_REDIRECT_URI,
    client_id: process.env.GOOGLE_CLIENT_ID,
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ].join(' ')
  };

  const queryString = qs.stringify(options);
  const finalUrl = `${rootUrl}?${queryString}`;

  return res.redirect(finalUrl);
}


const handleUserCallback=async (req,res)=>{
  const code=req.query.code;
  if(!code) return res.status(400).json({success:false,message:"Code not found"})
    // console.log(code);
  try {
    //Step-1 Exchange the code for Tokens
    const tokenResponse=await axios.post('https://oauth2.googleapis.com/token',{
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
      grant_type: 'authorization_code',
    })

    const {access_token,id_token} = tokenResponse.data;

    //Using access tokens to get data

    const userResponse=await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
    const {id, name, email, picture}=userResponse.data;
    const userLogin=await User.findOne({googleId:id});
    if(userLogin){
      //performing the code for setting the JWT token here
    }else{
      const newuser=await User.create({
        googleId:id,
        name,
        email,
        profileImage:picture,
      })
    }
    return res.json({});//same goes here we need to insert the redirect url to go back to our home page of the website after completing the google authentication.

  } catch (error) {
    console.log("Error occured in google OAuth "+error);
    return res.json({success:false,message:error.message}).redirect();//we still need to enter the frontend url here;
  }
}

export { handleUserLogin, handleUserSignup, handleUserRedirect, handleUserCallback };
