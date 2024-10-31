
import userModel from "../models/user.js";
import bcrypt from "bcrypt";

class UserController {

    //function to register user
    static userRegistration = async (req, res) => {

        const { name, email, password, password_confirm, tc } = req.body;
        const user = await userModel.findOne({ email: email });
        console.log(tc);

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
                            res.send({ "status": "Success", "message": "User Registered" });
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
};

export default UserController;