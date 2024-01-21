import connectDB from "@/util/mongoDB";
import User from '@/models/User';
import jwt from 'jsonwebtoken'
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { token, orderID } = req.body;
        try {
            await connectDB();
            const verify = jwt.verify(token, process.env.SECRET)
            if (verify) {
                const findUser = await User.findOne({ email: verify.email })
                if (findUser) {
                    findUser.orders.forEach(el => {
                        if (el.orderID === orderID) {
                            return res.json({
                                status: true, orders: el,
                                totalOrders: findUser.totalOrders,
                                Ordercanceled: findUser.Ordercanceled,
                                email: findUser.email, bellaPoints: findUser.bellaPoints,
                            })
                        }
                    })
                }
                else {
                    return res.json({ message: "unAuthorised", status: false })
                }
            }
            else {
                return res.json({ message: "unAuthorised", status: false })
            }
        }
        catch (e) {
            console.log(e)
            return res.json({ message: "unAuthorised", status: false })
        }
    }
    return res.json({ message: "unAuthorised", status: false })
}