import connectDB from "@/database/mongoDB";
import User from '@/models/User';
import jwt from 'jsonwebtoken'
import products from "@/models/products";

export default async function handler(req, res) {
    const stockUpdate = async (productIds) =>{
        for(let k = 0;k<productIds.length;k++){
            await products.updateOne({product_id:productIds[k].productIDs},{$inc:{stock:1}});
        }
    }
    if (req.method === 'POST') {
        const { token, orderID } = req.body;
        try {
            await connectDB();
            const verify = jwt.verify(token, process.env.SECRET);
            if (verify) {
                const findUser = await User.findOne({ email: verify.email });
                if (findUser) {
                    let el = findUser.orders
                    for(let i = 0; i<el.length;i++){
                        if(el[i].orderID===orderID){
                            if(el[i].isCancelled){
                                return res.status(200).json({ message: "Order already Cancelled", status: false });
                            }
                            if(el[i].isComplete){
                                return res.status(200).json({ message: "Can't cancel order! Order already delivered", status: false });
                            }
                            await stockUpdate(findUser.orders[i].orderCart); 
                            findUser.orders[i].isCancelled = true;
                            findUser.orders[i].isComplete = true;
                            findUser.bellaPoints = findUser.bellaPoints + findUser.orders[i].usedBellaPoints;
                            findUser.Ordercanceled = findUser.Ordercanceled+1;
                            await User.updateOne({email:verify.email},findUser);
                            await User.updateOne(
                                { email: findUser.email },
                                {
                                    $push: {
                                        bellaTransaction: {
                                            status: true, orderID, time: new Date(), type:"Refund", totalbill:el[i].totalbill, usedBellaPoints:findUser.bellaPoints
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
                return res.status(200).json({ message: "unAuthorised", status: false });
        }
        catch (e) {
            console.log(e);
            return res.status(500).json({ message: "Internal Error", status: false });
        }
    }
    return res.status(200).json({ message: "unAuthorised", status: false });
}