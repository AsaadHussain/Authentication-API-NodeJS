
import express from "express";
import dotenv from "dotenv";


dotenv.config();
const port = process.env.PORT;
const app = express();                //create instance 

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);           //connect to server
});

