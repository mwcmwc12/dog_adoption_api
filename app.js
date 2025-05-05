const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./db");
const userRoutes = require("./routes/userRoutes");
const dogRoutes = require("./routes/dogRoutes");
const { requireAuth, getId } = require("./middlewares/authMiddleware");
const ExpressError = require("./errors/expressError");


const app = express();

// Connect to Mongo Atlas and fireup the local server
connectDB(() => app.listen(process.env.PORT, () => {
    console.log(`Server started, listening on port ${process.env.PORT}`)
}))

const corsOptions = {
    origin: ["http://127.0.0.1:3000","http://127.0.0.1:3001"],
    optionsSuccessStatus: 200,
};

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

// routes
app.use("/user", userRoutes);
app.use("/dog", requireAuth, getId, dogRoutes);

// errors
app.use((req, res, next) => {
    const err = new ExpressError("Page Not Found!", 404);
    next(err);
});

app.use((err, req, res, next) => {
    let status = err.status || 500;
    let message = err.message;

    res.status(status).json({
        error: {
            status,
            message
        }
    });
});

module.exports = app;