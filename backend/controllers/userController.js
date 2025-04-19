import bcrypt from "bcrypt";
import User from "../models/user.js";

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

export { handleUserLogin, handleUserSignup };
