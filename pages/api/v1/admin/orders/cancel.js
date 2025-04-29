import connectDB from "@/database/mongoDB";
import bellaUser from '@/models/User';
import jwt from 'jsonwebtoken'
import products from "@/models/products";
export default async function handler(req, res) {
    const stockUpdate = async (productIds) =>{
        for(let k = 0;k<productIds.length;k++){
            await products.updateOne({product_id:productIds[k].productIDs},{$inc:{stock:1}});
        }
    }
    if (req.method === 'POST') {
        const { email, orderID, token } = req.body;
        try {
            await connectDB();
            if (!token) return res.json({ message: "Something want wrong!", status: false });
            if (!orderID) return res.json({ message: "Enter order id please", status: false });
            if (!email) return res.json({ message: "Enter email id please", status: false });

            const verify = jwt.verify(token, process.env.SECRET);
            if (!verify) return res.json({ message: "unAuthorised", status: false });

            const find = await bellaUser.findOne({ email: verify.email }, { isAdmin: true });
            if (!find) return res.json({ message: "You are not admin!", status: false });
            if (!find.isAdmin) return res.json({ message: "You are not admin!", status: false });

            const findUser = await bellaUser.findOne({ email });
            if (findUser && !findUser.isBanned) {
                if (findUser.bellaPoints < 0) {
                    findUser.isBanned = true
                    await bellaUser.updateOne({email},findUser);
                    return res.status(200).json({ message: "Account has negative balance!", status: false });
                }
                let el = findUser.orders
                for (let i = 0; i < el.length; i++) {
                    if (el[i].orderID === orderID) {
                        if (el[i].isCancelled) {
                            return res.status(200).json({ message: "Order already Cancelled", status: false });
                        }
                        if (el[i].isComplete) {
                            return res.status(200).json({ message: "Can't cancel order! Order already delivered", status: false });
                        }
                        await stockUpdate(findUser.orders[i].orderCart); 
                        findUser.orders[i].isCancelled = true;
                        findUser.orders[i].isComplete = true;
                        findUser.bellaPoints = findUser.bellaPoints + findUser.orders[i].usedBellaPoints;
                        findUser.Ordercanceled = findUser.Ordercanceled + 1;
                        await bellaUser.updateOne({ email }, findUser);
                        await bellaUser.updateOne(
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