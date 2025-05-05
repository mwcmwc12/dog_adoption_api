const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const ExpressError = require("../errors/expressError");

// declare any global constants
const MIN_PW_LENS = 8;

// declare the user schema
const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Please enter an username"],
        unique: [true, "The username is already in use, please pick another one"],
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minlength: [
            MIN_PW_LENS, 
            `Minimum password length required is ${MIN_PW_LENS} characters`
        ]
    }
}, { timestamps: true });

// Salt and hash the password before saving it into the db by calling Schema.pre
userSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

// static method to login an user
userSchema.statics.login = async function(username, password) {
    const user = await this.findOne({ username });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw new ExpressError("Incorrect password", 401);
    }
    throw new ExpressError("Incorrect username or user does not exist", 401);
}

const User = mongoose.model("user", userSchema);

module.exports = User;