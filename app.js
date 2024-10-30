
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/connectdb.js";
import cors from "cors";

dotenv.config();

const app = express();                              //create instance
const port = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

app.use(express.json());                           //middleware to parse JSON
app.use(cors());

app.listen(port, () => {
    console.log(`Server listening to http://localhost:${port}`);      //connect to server
});

connectDB(DATABASE_URL);                                              //connect to database