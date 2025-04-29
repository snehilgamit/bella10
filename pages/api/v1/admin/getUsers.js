import bellaUser from "@/models/User";
import connectDB from "@/database/mongoDB";
import jwt from 'jsonwebtoken'
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { token } = req.body;
        try {
            if (!token) return res.json({ message: "Token not found", status: false });
            await connectDB();

            const verify = jwt.verify(token, process.env.SECRET);
            if (!verify) return res.json({ message: "unAuthorised", status: false });

            const find = await bellaUser.findOne({ email: verify.email }, { isAdmin: true });
            if (!find) return res.json({ message: "You are not admin!", status: false });
            if (!find.isAdmin) return res.json({ message: "You are not admin!", status: false });

            const findUser = await bellaUser.find({}, "email");
            const sendUser = [];
            findUser.forEach(el => !el.email.includes('admin@bella10.shop') && sendUser.push(el.email))
            return res.status(200).json({ status: true ,users:sendUser});
        }
        catch (e) {
            console.log(e);
            return res.status(500).json({ message: "Internal Error", status: false });
        }
    }
    return res.status(200).json({ message: "Invalid method", status: false });
}