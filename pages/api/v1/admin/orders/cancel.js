import connectDB from "@/util/mongoDB";
import User from '@/models/User';
import jwt from 'jsonwebtoken'
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, orderID } = req.body;
        try {
            await connectDB();
            const findUser = await User.findOne({ email });
            if (findUser) {
                let el = findUser.orders
                for (let i = 0; i < el.length; i++) {
                    if (el[i].orderID === orderID) {
                        if (el[i].isCancelled) {
                            return res.status(200).json({ message: "Order already Cancelled", status: false });
                        }
                        if (el[i].isComplete) {
                            return res.status(200).json({ message: "Can't cancel order! Order already delivered", status: false });
                        }
                        findUser.orders[i].isCancelled = true;
                        findUser.orders[i].isComplete = true;
                        findUser.bellaPoints = findUser.bellaPoints + findUser.orders[i].usedBellaPoints;
                        findUser.Ordercanceled = findUser.Ordercanceled + 1;
                        await User.updateOne({ email }, findUser);
                        await User.updateOne(
                            { email: findUser.email },
                            {
                                $push: {
                                    bellaTransaction: {
                                        status: true, orderID, time: new Date(), type: "Refund", totalbill: el[i].totalbill, usedBellaPoints: findUser.bellaPoints
                                    }
                                }
                            }
                        )
                        return res.status(200).json({ message: "Order Cancelled. token refund successfull", status: true });
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