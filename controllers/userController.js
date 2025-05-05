const ExpressError = require("../errors/expressError");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// 24hr max age for token
const MAXAGE = 60 * 60 * 24 

function createToken(userId) {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: MAXAGE,
    });
} 

// Callback function to register a new user and sign them in
async function userRegister(req, res) {
    try {
        const { username, password } = req.body;
        const user = await User.create({username, password});
        const token = createToken(user._id);
        res.cookie("jwt", token, { httpOnly: true, secure: false, maxAge: MAXAGE * 1000 });
        res.status(201).json({ newUser: user });
    } catch (err) {
        throw new ExpressError(err.message, 422);
    }
}

// Callback function to login user
async function userLogin(req, res) {
    try {
        const { username, password } = req.body;
        const user = await User.login(username, password);
        const token = createToken(user._id);
        res.cookie("jwt", token, { httpOnly: true, secure: false, maxAge: MAXAGE * 1000 });
        res.status(200).json({ user });
    } catch (err) {
        if (err.status === 401) {
            throw err;
        } else {
            console.error(err);
            throw new ExpressError("Cannot process login", 500);
        }
    }
}

module.exports = {
    userRegister,
    userLogin,
}