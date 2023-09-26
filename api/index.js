require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./src/model");
const {authRouter} = require("./src/route/auth");
const {userRouter} = require("./src/route/user");

db.sequelize.sync();

const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));

app.use(authRouter);
app.use(userRouter);

// simple route
app.get("/", (req, res) => {
    res.json({message: "Welcome to auth API."});
});

// set port, listen for requests
const PORT = process.env.APP_PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});