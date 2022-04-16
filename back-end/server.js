import express from 'express';
import mongoose from "mongoose";
import cors from 'cors';
import session from 'express-session';

import usersController from "./controllers/users-controller.js";
const CONNECTION_STRING = "mongodb+srv://marlsrobo:shit4brains@cluster0.dvavu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority" || "mongodb://localhost:27017/webdev"


const app = express();
// const DB_USERNAME = process.env.DB_USERNAME
// const DB_PASSWORD = process.env.DB_PASSWORD
// mongoose.connect(`mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.m8jeh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`);
mongoose.connect(CONNECTION_STRING);


app.use(cors(
    {
        credentials: true,
        origin: 'http://localhost:3000'
    }
));
app.use(express.json());

const sess = {
    secret: 'keyboard cat', // todo move to environment var
    cookie: {}
}

if (app.get('env') === 'production') {
    app.set('trust proxy', 1)
    sess.cookie.secure = true
}

app.use(session(sess));

usersController(app);
app.get('/', (req, res) => {res.send('Welcome to Full Stack Development!')});
app.listen(4000);