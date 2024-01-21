import coupons from "@/models/coupons";
import products from "@/models/products";
import User from '@/models/User';
import connectDB from "@/util/mongoDB";
import jwt from 'jsonwebtoken'

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { couponCode, productIDs, bellacoinsUse, token } = req.body;
        connectDB();
        const getOrder = () => {
            const str = "1234567890abcdefghijklmnopqrstuvwxyz"
            let i = 0;
            let orderId = "";
            while (i < 12) {
                orderId += str[Math.floor(Math.random() * (str.length - 1))];
                i++;
            }
            return orderId
        }
        try {
            const verify = jwt.verify(token, process.env.SECRET)
            if (verify) {
                const findUser = await User.findOne({ email: verify.email })
                if (findUser) {
                    let totalbill = 0;
                    const orderCart = [];
                    for (let i = 0; i < productIDs.length; i++) {
                        const findPRprice = await products.findOne({ product_id: productIDs[i] });
                        if (findPRprice === null) {
                            return res.json({ message: "Something went wrong", status: false });
                        }
                        orderCart.push({ productIDs: findPRprice.product_id, name: findPRprice.name })
                        totalbill += findPRprice.price_after_discount;
                    }
                    const totalProductSum = totalbill;
                    const orderID = getOrder();
                    if (couponCode && couponCode != "" && bellacoinsUse) {

                        const checkticket = await coupons.findOne({ couponId: couponCode })

                        if (checkticket.minimumCart <= totalbill) {
                            totalbill -= checkticket.off;
                            if (bellacoinsUse) {
                                if (findUser.bellaPoints >= totalbill) {

                                    await User.updateOne({ 'email': findUser.email }, { $inc: { bellaPoints: -totalbill } })
                                    await User.updateOne({ email: findUser.email }, { $push: { bellaTransaction: { status: true, orderID, time: new Date(), totalbill, usedBellaPoints: totalbill } } })
                                    totalbill = 0;
                                    await User.updateOne({ email: findUser.email }, { $push: { orders: { couponCode, orderCart, bellacoinsUse, totalbill, orderID, usedBellaPoints: totalbill, isConfirmed: false, time: new Date(),totalProductSum } } })

                                    await User.updateOne({ email: findUser.email }, { $inc: { totalOrders: +1 } })

                                    return res.json({ status: true, amount: totalbill, orderID });
                                }
                                await User.updateOne({ 'email': findUser.email }, { $inc: { bellaPoints: -findUser.bellaPoints } })

                                totalbill = totalbill - findUser.bellaPoints;
                                await User.updateOne({ email: findUser.email }, { $push: { bellaTransaction: { status: true, orderID, time: new Date(), totalbill: findUser.bellaPoints, usedBellaPoints: findUser.bellaPoints,totalProductSum } } })
                                await User.updateOne({ email: findUser.email }, {
                                    $push: {
                                        orders: {
                                            couponCode, orderCart, bellacoinsUse, totalbill, orderID, usedBellaPoints: findUser.bellaPoints, isConfirmed: false, time: new Date(),totalProductSum
                                        }
                                    }
                                })
                                await User.updateOne({ email: findUser.email }, { $inc: { totalOrders: +1 } })

                                return res.json({ status: true, amount: totalbill, orderID });
                            }
                            await User.updateOne({ email: findUser.email }, { $push: { orders: { couponCode, orderCart, bellacoinsUse, totalbill, orderID, isConfirmed: false, time: new Date() ,totalProductSum} } })
                            await User.updateOne({ email: findUser.email }, { $inc: { totalOrders: +1 } })

                            return res.json({ status: true, amount: totalbill, orderID });
                        }
                        return res.json({ status: false, message: "Coupon problem!" });
                    }
                    if (bellacoinsUse) {
                        if (findUser.bellaPoints >= totalbill) {

                            await User.updateOne({ 'email': findUser.email }, { $inc: { bellaPoints: -totalbill } })
                            await User.updateOne({ email: findUser.email }, { $push: { bellaTransaction: { status: true, orderID, time: new Date(), totalbill, usedBellaPoints: totalbill } } })
                            totalbill = 0;
                            await User.updateOne({ email: findUser.email }, { $push: { orders: { couponCode, orderCart, bellacoinsUse, totalbill, orderID, usedBellaPoints: totalbill, isConfirmed: false, time: new Date(),totalProductSum } } })
                            await User.updateOne({ email: findUser.email }, { $inc: { totalOrders: +1 } })


                            return res.json({ status: true, amount: totalbill, orderID });
                        }

                        await User.updateOne({ 'email': findUser.email }, { $inc: { bellaPoints: -findUser.bellaPoints } })
                        await User.updateOne({ email: findUser.email }, { $push: { bellaTransaction: { status: true, orderID, time: new Date(), totalbill, usedBellaPoints: findUser.bellaPoints } } })
                        totalbill = totalbill - findUser.bellaPoints;
                        await User.updateOne({ email: findUser.email }, { $push: { orders: { couponCode, orderCart, bellacoinsUse, totalbill, orderID, usedBellaPoints: findUser.bellaPoints, isConfirmed: false, time: new Date(),totalProductSum } } })
                        await User.updateOne({ email: findUser.email }, { $inc: { totalOrders: +1 } })


                        return res.json({ status: true, amount: totalbill, orderID });
                    }
                    if (couponCode && couponCode != "") {

                        const checkticket = await coupons.findOne({ couponId: couponCode })

                        if (checkticket.minimumCart <= totalbill) {
                            totalbill -= checkticket.off;

                            await User.updateOne({ email: findUser.email }, { $push: { orders: { couponCode, orderCart, bellacoinsUse, totalbill, orderID, isConfirmed: false, time: new Date(),totalProductSum } } })
                            await User.updateOne({ email: findUser.email }, { $inc: { totalOrders: +1 } })

                            return res.json({ status: true, amount: totalbill, orderID });
                        }

                        return res.json({ status: false, message: "Coupon problem!" });
                    }
                    await User.updateOne({ email: findUser.email }, { $push: { orders: { couponCode, orderCart, bellacoinsUse, totalbill, orderID, isConfirmed: false, time: new Date(),totalProductSum } } })
                    await User.updateOne({ email: findUser.email }, { $inc: { totalOrders: +1 } })

                    return res.json({ status: true, amount: totalbill, orderID });
                }

                return res.json({ message: "unAuthorised", status: false })
            }
        }
        catch (e) {
            console.log(e)
            return res.json({ message: "Something want wrong", status: false })
        }

    }
    return res.json({ message: "Invalid method", status: false });
}