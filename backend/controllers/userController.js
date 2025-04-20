import bcrypt from "bcrypt";
import User from "../models/user.js";
import axios from "axios";
import qs from "querystring";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

//Function to give the Token in jwt
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JSON_SECRET_KEY);
};

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

    const token = createToken(user._id);

    // Set the token as a cookie
    res.cookie("authToken", token, {
      httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
      secure: process.env.NODE_ENV === "production", // Ensures the cookie is sent over HTTPS in production
      sameSite: "strict", // Prevents CSRF attacks
      maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expiration time (7 days)
    });

    return res
      .status(200)
      .json({ success: "true", user: userWithoutPassword, token });
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

    const token = createToken(newUser._id);

    // Set the token as a cookie
    res.cookie("authToken", token, {
      httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
      secure: process.env.NODE_ENV === "production", // Ensures the cookie is sent over HTTPS in production
      sameSite: "strict", // Prevents CSRF attacks
      maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expiration time (7 days)
    });

    return res.status(201).json({
      success: "true",
      message: "User registered successfully",
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    console.error("Error during user signup:", error);
    return res.status(500).json({
      success: "false",
      message: "An internal server error occurred",
    });
  }
};

const handleUserRedirect = async (req, res) => {
  try {
    const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
    const options = {
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
      client_id: process.env.GOOGLE_CLIENT_ID,
      access_type: "offline",
      response_type: "code",
      prompt: "consent",
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
      ].join(" "),
    };

    const queryString = qs.stringify(options);
    const finalUrl = `${rootUrl}?${queryString}`;

    return res.redirect(finalUrl);
  } catch (error) {
    console.log("Error in initial redirect from google" + error);
    return res.status(401).json({ success: false, message: error.message });
  }
};

const handleUserCallback = async (req, res) => {
  const code = req.query.code;
  if (!code)
    return res.status(400).json({ success: false, message: "Code not found" });

  try {
    // Step-1: Exchange the code for Tokens
    const tokenResponse = await axios.post(
      "https://oauth2.googleapis.com/token",
      {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        grant_type: "authorization_code",
      }
    );

    const { access_token, id_token } = tokenResponse.data;

    // Step-2: Use access tokens to get user data
    const userResponse = await axios.get(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const { id, name, email, picture } = userResponse.data;
    const userLogin = await User.findOne({ googleId: id });
    let token;

    if (userLogin) {
      // Generate JWT token for existing user
      token = createToken(userLogin._id);
    } else {
      // Create a new user and generate JWT token
      const newUser = await User.create({
        googleId: id,
        name,
        email,
        profileImage: picture,
      });
      token = createToken(newUser._id);
    }

    // Set the token as a cookie
    res.cookie("authToken", token, {
      httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
      secure: process.env.NODE_ENV === "production", // Ensures the cookie is sent over HTTPS in production
      sameSite: "strict", // Prevents CSRF attacks
      maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expiration time (7 days)
    });

    // Send a success response
    return res.json({ success: true, message: "Login successful", token });
  } catch (error) {
    console.log("Error occurred in Google OAuth: " + error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export {
  handleUserLogin,
  handleUserSignup,
  handleUserRedirect,
  handleUserCallback,
};
