import express from 'express';
import mongoose from "mongoose";
import cors from 'cors';
import usersController from "./controllers/users-controller.js";
const CONNECTION_STRING = "mongodb+srv://marlsrobo:shit4brains@cluster0.dvavu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority" || "mongodb://localhost:27017/webdev"


const app = express();
// const DB_USERNAME = process.env.DB_USERNAME
// const DB_PASSWORD = process.env.DB_PASSWORD
// mongoose.connect(`mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.m8jeh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`);
mongoose.connect(CONNECTION_STRING);


app.use(cors());
app.use(express.json());

usersController(app);
app.get('/', (req, res) => {res.send('Welcome to Full Stack Development!')});
app.listen(4000);