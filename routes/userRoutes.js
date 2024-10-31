
import express from "express";
import UserController from "../controllers/userController.js";

const router = express.Router();              //creating instance

//public route
router.post('/register', UserController.userRegistration);                    

//protected route


export default router;
