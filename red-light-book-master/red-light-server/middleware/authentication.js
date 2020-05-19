const jwt = require("jsonwebtoken");

// access token stored in memory
exports.createAccessToken = (row) => {
    return jwt.sign({
        user: row.user
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1h"
      });
}

// refreshTokens stored in cookies for 7 days
exports.createRefreshToken = (row) => {
    return jwt.sign({
        user: row.user
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "7d"
      });
}

// check access token
// sender will send authorization: bearer token
exports.checkAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.userdata = decoded;
        next();
    } catch(err) {
        return res.status(401).json({
            message:"Authentication Failed"
        });
    }
}

// send back accessToken and refreshToken
// refreshToken stored in httpOnly cookie
// accessToken is just in memory
// refresh token and auth token sent with the request 
// if accesstoken expired, invalid, or user refreshes, the refresh token persists
// - access token is gone
// refresh token sent alone wont do anything
// refresh token can call refresh request which returns an access token back
// maliscious request cannot be completed with just a refresh token


// when access token expires - we can request 