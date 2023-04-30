const express = require('express');
const router = require("./router")
const {sequelize} = require('./models')

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const app = express();

app.use(express.json());

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
    connectToDB()
    router(app)
    app.listen(port, (err) => {
        if(err) {
            throw err;
        }
        console.log(`Listening on port ${port}`);
    })
})()
