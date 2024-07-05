import jwt from "jsonwebtoken";
import User from "../models/User.js";

class TokenController {
    async store(req, res) {
        const { email = "", password = "" } = req.body;

        if (!email || !password) {
            return res.status(401).json({ errors: ["Invalid credentials"] });
        }

        const database = new User();
        const users = await database.select();
        const user = users.filter((user) => user.email === email)[0];

        if (!user) {
            return res.status(401).json({ errors: ["User not exists."] });
        }

        if (!(await database.passwordIsValid(password, user.email))) {
            return res.status(401).json({ errors: ["Invalid password."] });
        }

        const id = user.email;
        const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
            expiresIn: process.env.TOKEN_EXPIRATION,
        });

        return res.status(200).json({ token, user: { name: user.name, id, email, type: user.type } });
    }
}

export default new TokenController();