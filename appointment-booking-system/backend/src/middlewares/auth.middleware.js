const jwt = require('jsonwebtoken');



exports.authenticate=(req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({message:"access denied ,No token provided"});
    }
    try {
        const decoded = jwt.verify(token.replace('Bearer',''),process.env.JWT_SECRET);
        req.user =decoded;
        next();
    } catch(error) {
        res.status(401).json({ message: 'invalid token' });
    }
};

// module.exports=authenticate;