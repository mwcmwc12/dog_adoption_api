const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ExpressError = require("../errors/expressError");

// protect route with authentication
function requireAuth(req, res, next) {
    const token = req.cookies.jwt;

    // check if a token exits
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                console.error(err);
                throw new ExpressError("Error verifying your credentials", 401);
            } else {
                next();
            }
        });
    } else {
        throw new ExpressError("You are not authenticated, please login or signup", 401);
    };
}

// gets the current user id
function getId(req, res, next) {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                console.error(err);
                throw new ExpressError("Error verifying your credentials", 401);
            } else {
                const user = await User.findById(decodedToken.userId);
                res.locals.user = user;
                next();
            }
        });
    } else {
        throw new ExpressError("You are not authenticated, please login or signup", 401);
    };
}

module.exports = {
    requireAuth,
    getId,
}