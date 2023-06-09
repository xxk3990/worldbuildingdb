const express = require('express');
const router = require("./router");
const {sequelize} = require('./models');
const cors = require('cors');
const { expressjwt: jwt } = require("express-jwt");
const process = require('process')

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors({
    origin: `*`
}))

app.use(jwt({secret: process.env.SECRET, algorithms: ["HS256"]}).unless({ path: ["/login", "/addUser"]}))

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

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
