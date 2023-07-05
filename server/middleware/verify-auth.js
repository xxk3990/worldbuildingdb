const jwt = require("jsonwebtoken");
const process = require("process")

const verifyAuth = (req, res, next) => {
    const token = req.cookies.token;
    const secret = process.env.SECRET;
    console.log('cookie token:',req.cookies.token);
    if(!token) {
        return res.status(401).json("Not Authenticated!")
    }
    jwt.verify(token, secret, (err, decoded) => {
        if(err) {
            return res.status(403).json("Invalid Token!")
        }
        req.query.id = decoded.id
        return next()
    });
}

module.exports = {verifyAuth}