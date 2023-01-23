const config = require("../config/config");
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
    const token = req.header("Authorization");
    // check if token is received
    if (!token) return res.status(401).json({ msg: "Unauthorized User" })

    try {
        // if it's valid
        const tokenDecoded = jwt.verify(token, config.jwtSecret)
        // add user from payload
        req.user = tokenDecoded;
        next();

    } catch (e) {
        res.status(400).json({ msg: "Invalid token" })
    }
}

module.exports = auth;