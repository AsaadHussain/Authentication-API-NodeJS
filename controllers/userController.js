
import userModel from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserController {

    //function to register user
    static userRegistration = async (req, res) => {

        const { name, email, password, password_confirm, tc } = req.body;
        const user = await userModel.findOne({ email: email });

        if (user) {
            res.send({ "status": "Failed", "message": "Email Already exists" });
        } else {

            if (tc && name && email && password && password_confirm) {

                if (password === password_confirm) {

                    if (tc === true) {

                        try {
                            const hashedPassword = await bcrypt.hash(password, 10);
                            const newUser = new userModel({
                                name: name,
                                email: email,                          //creates a new user
                                password: hashedPassword,
                                tc: tc
                            });

                            await newUser.save();

                            const savedUser = await userModel.findOne({ email });

                            const token = jwt.sign({ userID: savedUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: '3d' });

                            res.status(201).send({ "status": "Success", "message": "User Registered", "token": token });
                        } catch (error) {
                            res.send({ "status": "Failed", "message": error.message });
                        }

                    }
                    else {
                        res.send({ "status": "Failed", "message": "Agree to TC" });
                    }

                } else {
                    res.send({ "status": "Failed", "message": "Password and Confirm Password does not match" });
                }

            } else {
                res.send({ "status": "Failed", "message": "All fields are required" });
            }
        }
    };

    static userLogin = async (req, res) => {
        try {

            const { email, password } = req.body;

            if (email && password) {

                const user = await userModel.findOne({ email });

                if (user) {

                    const isMatch = await bcrypt.compare(password, user.password);

                    if ((email === user.email) && isMatch) {
                        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '3d' })
                        res.send({ "status": "Success", "message": "You are Logged In", "token": token });

                    } else {
                        res.send({ "status": "Failed", "message": "Invalid email or password" });
                    }

                } else {
                    res.send({ "status": "Failed", "message": "You are not registered" });
                }

            } else {
                res.send({ "status": "Failed", "message": "All fields are required" });
            }


        } catch (error) {
            res.send({ "status": "Failed", "message": error.message });
        }
    };
};

export default UserController;