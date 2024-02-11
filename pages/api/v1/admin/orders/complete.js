import connectDB from "@/util/mongoDB";
import bellaUser from '@/models/User';
import jwt from 'jsonwebtoken'
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, orderID, token } = req.body;
        try {
            await connectDB();
            if(!token) return res.json({message:"Something want wrong!",status:false});
            if(!orderID) return res.json({message:"Enter order id please",status:false});
            if(!email) return res.json({message:"Enter email id please",status:false});

            const verify = jwt.verify(token, process.env.SECRET);
            if (!verify) return res.json({ message: "unAuthorised", status: false });

            const find = await bellaUser.findOne({ email: verify.email }, { isAdmin: true });
            if (!find) return res.json({ message: "You are not admin!", status: false });
            if (!find.isAdmin) return res.json({ message: "You are not admin!", status: false });

            const findUser = await bellaUser.findOne({ email });
            if (findUser) {
                let el = findUser.orders
                for (let i = 0; i < el.length; i++) {
                    if (el[i].orderID === orderID) {
                        if (el[i].isCancelled) {
                            return res.status(200).json({ message: "Order was cancelled by user!", status: false });
                        }
                        if (el[i].isConfirmed) {
                            return res.status(200).json({ message: "Order already delivered", status: false });
                        }
                        findUser.orders[i].isComplete = true;
                        findUser.orders[i].isConfirmed = true;
                        await bellaUser.updateOne({ email }, findUser);
                        return res.status(200).json({ message: "Order completed. thank you!", status: true });
                    }
                }
                return res.status(200).json({ message: "Can't find orderID", status: false });
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