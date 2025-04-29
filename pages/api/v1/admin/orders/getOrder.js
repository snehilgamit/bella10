import bellaUser from "@/models/User";
import connectDB from "@/database/mongoDB";
import jwt from 'jsonwebtoken'
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { orderID, email, token } = req.body;
        try {
            if(!token) return res.json({message:"Something want wrong!",status:false});
            if(!orderID) return res.json({message:"Enter order id please",status:false});
            if(!email) return res.json({message:"Enter email id please",status:false});
            await connectDB();

            const verify = jwt.verify(token, process.env.SECRET);
            if (!verify) return res.json({ message: "unAuthorised", status: false });

            const find = await bellaUser.findOne({ email: verify.email }, { isAdmin: true });
            if (!find) return res.json({ message: "You are not admin!", status: false });
            if (!find.isAdmin) return res.json({ message: "You are not admin!", status: false });

            const findUser  = await bellaUser.findOne({ email });
            if (findUser) {
                for (let i = 0; i < findUser.orders.length; i++) {
                    if (findUser.orders[i].orderID === orderID) {
                        return res.status(200).json({
                            status: true, orders: findUser.orders[i],
                            totalOrders: findUser.totalOrders,
                            Ordercanceled: findUser.Ordercanceled,
                            email: findUser.email, bellaPoints: findUser.bellaPoints,
                        })
                    }
                }
                return res.status(200).json({ message: "Can't find order", status: false });
            }
            return res.status(200).json({ message: "Can't find user", status: false });
        }
        catch (e) {
            console.log(e);
            return res.status(500).json({ message: "Internal Error", status: false });
        }
    }
    return res.status(200).json({ message: "Invalid method", status: false });
}