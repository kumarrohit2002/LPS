const jwt = require('jsonwebtoken');
const User = require('../model/User');

require('dotenv').config();



const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'No token provided, authorization denied' });
    }

    try {
        
        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        const user = await User.findOne({ _id: decoded.id });

        if (!user) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        req.user = user;
        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = authMiddleware;
