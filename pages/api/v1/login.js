import connectDB from "@/util/mongoDB"
import User from '@/models/User'
import jwt from 'jsonwebtoken'
export default async function handler(req, res) {
    if (req.method == 'POST') {
        await connectDB()
        const { email, password } = req.body
        if (email != '' || password != '') {
            const findUser = await User.findOne({ email });
            if (findUser) {
                if (findUser.email === email && password === password) {
                    const token = jwt.sign({ email: findUser.email }, process.env.SECRET);
                    return res.json({ status: true, message: "Authorised", email, token })
                }
            }
            return res.json({ status: false, message: "User not found" })
        }
        res.json({ status: false, message: "Something missing" })
    }
    return res.json({ status: false, message: "Invalid method" })
}