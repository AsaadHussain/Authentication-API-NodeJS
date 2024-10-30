
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/connectdb.js";


dotenv.config();

const Database_URL = process.env.DATABASE_URL;
const port = process.env.PORT;
const app = express();                    //create instance

app.use(cors());                         //CORS policy
app.use(express.json());

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);   //connect to server
});

connectDb(Database_URL);                                     //connect to database