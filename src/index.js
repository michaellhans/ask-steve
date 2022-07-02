import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "./database/index.js";
import router from "./routes/index.js";

dotenv.config();

export const app = express();

// Config the MongoDB
connectDB();

// Use body parser to post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(router);

let port = process.env.PORT || 8080;

app.get('/', (_, res) => {
    res.send('Hello, World!');
});

app.listen(port, () => {
    console.log('App is running at the port ' + port);
});