// roleMiddleware.js

exports.adminMiddleware = async (req, res, next) => {
    try {
        // Ensure the request contains user information
        if (!req.user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        // Check if the user's role includes 'admin'
        if (!req.user.role.includes('admin')) {
            return res.status(403).json({ message: 'Access denied' });
        }

        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.userMiddleware = async (req, res, next) => {
    try {
        // Ensure the request contains user information
        if (!req.user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        // Check if the user's role includes 'user'
        if (!req.user.role.includes('user')) {
            return res.status(403).json({ message: 'Access denied' });
        }

        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};
