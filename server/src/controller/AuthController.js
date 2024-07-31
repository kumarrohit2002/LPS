const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/User'); // Adjust the path to your User model

require('dotenv').config();

exports.signup = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        // Check if the user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create and save the new user
        user = new User({
            name,
            email,
            password: hashedPassword,
            role: role || ['user'] // Default role is 'user' if not provided
        });
        await user.save();

        // Create a JWT token
        const jwtSecret = process.env.JWT_SECRET;
        const token = jwt.sign({ id: user._id, role: user.role }, jwtSecret, { expiresIn: '4h' });

        res.status(200).json({ 
            success: true,
            message: 'SignUp Successful',
            token, 
            user: { id: user._id, name: user.name, email: user.email, role: user.role } 
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error'});
    }
};


exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create a JWT token
        const jwtSecret = process.env.JWT_SECRET ;
        const token = jwt.sign({ id: user._id, role: user.role }, jwtSecret, { expiresIn: '4h' });

        res.status(200).json({ 
            success: true,
            message: 'Login Successful',
            token, 
            user: { id: user._id, name: user.name, email: user.email, role: user.role } 
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};