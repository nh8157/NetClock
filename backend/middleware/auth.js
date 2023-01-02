const jwt = require('jsonwebtoken');

// This will stand between express framework and application logic
const verify = (req, res, next) => {
    const token = req.body.token;
    
    if (!token) return res.status(403).send("A token is required for authentication.");

    // verify if token is valid
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
        req.user = decoded;
    } catch (err) {
        console.log(err);
        return res.status(401).send("Invalid token.");
    }
    return next();
}

module.exports = verify;