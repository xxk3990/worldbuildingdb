const express = require('express');
const cookieParser = require("cookie-parser")
const {sequelize} = require('./models');
const cors = require('cors');
const { expressjwt: jwt } = require("express-jwt");
const process = require('process')
const router = require("./router");
const port = process.env.PORT || process.env.NODE_PORT || 3000;

const app = express();
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3001", credentials:true}))
app.use(express.json());


const connectToDB = async () => {
    console.log("connectToDB called")
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
        process.exit(1);
    }
}

(async () => {
    await connectToDB();
    router(app);
    app.listen(port, (err) => {
        if(err) {
            throw err;
        }
        console.log(`Listening on port ${port}`);
    });
})();
