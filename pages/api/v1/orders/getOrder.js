import connectDB from "@/database/mongoDB";
import User from '@/models/User';
import jwt from 'jsonwebtoken'
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { token, orderID } = req.body;
        try {
            await connectDB();
            const verify = jwt.verify(token, process.env.SECRET);
            if (verify) {
                const findUser = await User.findOne({ email: verify.email });
                if (findUser) {
                    for(let i = 0; i<findUser.orders.length;i++){
                        if (findUser.orders[i].orderID === orderID) {
                            return res.status(200).json({
                                status: true, orders: findUser.orders[i],
                                totalOrders: findUser.totalOrders,
                                Ordercanceled: findUser.Ordercanceled,
                                email: findUser.email, bellaPoints: findUser.bellaPoints,
                            })
                        }
                    }
                }
                    return res.status(200).json({ message: "unAuthorised", status: false });
            }
                return res.status(200).json({ message: "unAuthorised", status: false });
        }
        catch (e) {
            console.log(e);
            return res.status(500).json({ message: "Internal Error", status: false });
        }
    }
    return res.status(200).json({ message: "unAuthorised", status: false });
}