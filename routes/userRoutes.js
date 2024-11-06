
import express from "express";
import UserController from "../controllers/userController.js";
import checkAuth from "../middlewares/authMiddleware.js";

const router = express.Router();              //creating instance

router.use('/changePassword', checkAuth);

//public route
router.post('/register', UserController.userRegistration);
router.post('/login', UserController.userLogin);

//protected route
router.post('/changePassword', UserController.changePassword);


export default router;
