const jwt = require('jsonwebtoken');

// ### TESTABLE ###
// This will stand between express framework and application logic
exports.verify = (req, res, next) => {
    const token = req.body.token;
    
    if (!token) return res.status(403).send("A token is required for authentication.");

    // verify if token is valid
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
        req.user = decoded;
        // remove the token from the body
        // so that the object could match the schema we set
        delete req.body.token;
    } catch (err) {
        return res.status(401).send("Invalid token.");
    }
    return next();
}