import jwt from "jsonwebtoken";
import User from "../models/User";

export default async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({
            errors: ["Login required"],
        });
    }

    const [, token] = authorization.split(" ");

    try {
        const data = jwt.verify(token, process.env.TOKEN_SECRET);
        const { id, email } = data;

        const database = new User();
        const users = await database.select();
        const user = users.filter((user) => user.email === email)[0];

        if (!user) {
            return res.status(401).json({
                errors: ["Invalid user"],
            });
        }

        req.userId = id;
        req.userEmail = email;
        req.userType = user.type;
        return next();
    } catch (e) {
        return res.status(401).json({
            errors: ["Invalid or expired Token"],
        });
    }
};
