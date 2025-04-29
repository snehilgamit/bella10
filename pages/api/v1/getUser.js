import connectDB from "@/database/mongoDB";
import User from '@/models/User';
import jwt from 'jsonwebtoken'
import products from "@/models/products";
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { token } = req.body;
        try {
            await connectDB();
            const verify = jwt.verify(token, process.env.SECRET);
            if (verify) {
                const findUser = await User.findOne({ email: verify.email });
                if (findUser) {
                    findUser.orders = findUser.orders.reverse()
                    return res.status(200).json({
                        status: true, orders: findUser.orders,
                        totalOrders: findUser.totalOrders,
                        Ordercanceled: findUser.Ordercanceled,
                        email: findUser.email, bellaPoints: findUser.bellaPoints,
                        referralsOrders: findUser.referralsOrders
                    })
                }
                return res.status(200).json({ message: "unAuthorised", status: false });
            }
        }
        catch {
            return res.status(500).json({ message: "Error occured", status: false });
        }
        return res.status(200).json({ message: "unAuthorised", status: false });
    }
}