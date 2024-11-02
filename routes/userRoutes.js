
import express from "express";
import UserController from "../controllers/userController.js";

const router = express.Router();              //creating instance

//public route
router.post('/register', UserController.userRegistration);                    
router.post('/login', UserController.userLogin);                    

//protected route


export default router;
