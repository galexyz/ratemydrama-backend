import pkg from "body-parser";
const { json, urlencoded } = pkg;
import sequelize from "./util/database.js";

import express from "express";
import dramaRouter from "./routes/drama.js";
import reviewRouter from "./routes/review.js";
import cors from "cors";
const app = express();

app.use(json());
app.use(urlencoded({ extended: false }));

app.use(cors());

//test route
app.get("/", (req, res, next) => {
    res.send("Hello World");
});

//CRUD routes
app.use("/dramas", dramaRouter);
app.use("/reviews", reviewRouter);

//error handling
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({ message: message });
});

//sync database
sequelize
    .sync({ alter: true })
    .then((result) => {
        app.listen(3000);
    })
    .catch((err) => console.log(err));
