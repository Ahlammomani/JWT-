const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser')

 
const app = express();
const PORT = 5000;
app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true  
  }));
  app.use(express.json()); 
app.use(cookieParser());

const users = {};
const SECRET_KEY = "your_secret_key";
// Register
app.post("/signup",async (req,res)=>{
const {username, useremail,password}= req.body;
const hashedPassword =await bcrypt.hash(password,10);
users[useremail] = { username, useremail, password: hashedPassword };
res.json({message:"User registered successfull"});
});

// Login
app.post("/login",async(req,res)=>{
    const {username, useremail,password}= req.body;
    const user = users[username,useremail];
    if (!user) return res.status(400).json({ message: "User not found" });
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(400).json({ message: "Invalid credentials" });
const token = jwt.sign({username, useremail},SECRET_KEY,{expiresIn: '1h'})
res.cookie('token',token,{httpOnly:true,secure:false});
res.json({ message: "Login successful" });

});

// Middleware for authentication
const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(403).json({ message: "Forbidden" });
        req.user = decoded;
        next();
    });
};

// Protected Profile Route
app.get("/profile", authMiddleware, (req, res) => {
    res.json({ message: "Welcome to your profile", user: req.user });
});

// Logout
app.post("/logout", (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logged out successfully" });
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
