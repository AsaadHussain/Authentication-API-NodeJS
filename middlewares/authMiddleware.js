
import userModel from "../models/user.js";
import jwt from "jsonwebtoken";

var checkAuth = async (req, res, next) => {

    let token;

    const { authorization } = req.headers;

    if (authorization && authorization.startsWith('Bearer')) {

        try {
            token = authorization.split(" ")[1];

            if (!token) {
                res.send({ "status": "Failed", "message": "Unauthorized user, No Token" });
            } else {

                const { userID } = jwt.verify(token, process.env.JWT_SECRET_KEY);

                req.user = await userModel.findById(userID).select("-password");

                next();
            }

        } catch (error) {
            res.status(401).send({ "status": "Failed", "message": error.message });
        }

    } else {
        res.status(403).send({ "status": "Failed", "message": "Unauthorized user" });
    }
};

export default checkAuth;