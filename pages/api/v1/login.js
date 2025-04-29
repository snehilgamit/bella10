import connectDB from "@/database/mongoDB"
import User from '@/models/User'
import jwt from 'jsonwebtoken'
export default async function handler(req, res) {
    if (req.method === 'POST') {
        await connectDB();
        let { email, password } = req.body;
        email = email.toLowerCase();
        if (email != '' || password != '') {
            const findUser = await User.findOne({ email });
            if (findUser) {
                if (findUser.email === email && findUser.password === password) {
                    if (findUser.isBanned) {
                        return res.status(200).json({ status: false, message: "Account is banned" });
                    }
                    const token = jwt.sign({ email: findUser.email }, process.env.SECRET);
                    return res.status(200).json({ status: true, message: "Authorised", email, token, isAdmin: findUser.isAdmin });
                }
                return res.status(200).json({ status: false, message: "Invalid email or password" });
            }
            return res.status(200).json({ status: false, message: "Invalid email or password" });
        }
        return res.status(200).json({ status: false, message: "Something missing" });
    }
    return res.status(400).json({ status: false, message: "Invalid method" });
}