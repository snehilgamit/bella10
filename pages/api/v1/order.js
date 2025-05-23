import coupons from "@/models/coupons";
import products from "@/models/products";
import User from '@/models/User';
import connectDB from "@/database/mongoDB";
import jwt from 'jsonwebtoken'

// TO-DO: ReWrite entire code

// Function for generating order id 
const getOrder = () => {
    const str = "1234567890abcdefghijklmnopqrstuvwxyz"
    let orderId = "";
    let i = 0;
    while (i < 12) {
        orderId += str[Math.floor(Math.random() * (str.length - 1))];
        i++;
    }
    return orderId;
}
// Function for stock update
const stockUpdate = async (productIds) => {
    for (let k = 0; k < productIds.length; k++) {
        await products.updateOne({ product_id: productIds[k], stock: { $gt: 0 } }, { $inc: { stock: -1 } });
    }
}

// Increase totalOrders count by +1
const setorderCount = async (email) => {
    await User.updateOne({ email }, { $inc: { totalOrders: +1 } })
    return 0;
}

const updateCoupon = async (code) => {
    await coupons.updateOne({ couponId: code }, { $inc: { left: -1 } });
}
const incressCouponStock = async (code) => {
    await coupons.updateOne({ couponId: code }, { $inc: { left: 1 } });
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.json({ message: "Invalid method", status: false });
    }

    const { couponCode, productIDs, bellacoinsUse, token, mobileNo } = req.body;
    if (bellacoinsUse !== true && bellacoinsUse != false) {
        return res.json({ message: "Error in bellacoins use", status: false });
    }
    if (!mobileNo) {
        return res.json({ message: "Mobile number not entered", status: false });
    }
    await connectDB();

    try {
        // Verifying jwt token
        const verify = jwt.verify(token, process.env.SECRET)
        if (verify) {
            const findUser = await User.findOne({ email: verify.email });

            if (findUser) {
                if (findUser.bellaPoints < 0) {
                    return res.json({ message: "Something went wrong", status: false });
                }
                // Total bill with price discount
                let totalbill = 0;
                const orderCart = [];
                for (let i = 0; i < productIDs.length; i++) {
                    const findPRprice = await products.findOne({ product_id: productIDs[i] });
                    if (findPRprice === null) {
                        return res.json({ message: "Something went wrong", status: false });
                    }
                    orderCart.push(
                        { productIDs: findPRprice.product_id, name: findPRprice.name, price: findPRprice.price_after_discount }
                    )
                    totalbill += findPRprice.price_after_discount;
                }
                // Saving totalbill to update on database query, it is constant bill can not be changed.
                const totalProductSum = totalbill;

                // Generating order ID
                const orderID = getOrder();



                // If the coupon code and bellacoins used
                if (couponCode && couponCode != "" && bellacoinsUse) {

                    const checkticket = await coupons.findOne({ couponId: couponCode, 'left': { $gt: 0 } });
                    if (!checkticket) {
                        return res.json({ message: "Coupon limit is over", status: false })
                    }
                    if (!checkticket.isActive) return res.json({ message: "Coupon is not active", status: false });
                    if (checkticket.left <= 0) return res.json({ message: "Coupon limit is over", status: false });
                    checkticket.left = checkticket.left - 1;

                    // update coupon (left - 1);
                    await updateCoupon(couponCode);

                    // If the minimumcart value is smaller than total bill (it is for setting the minimum order value)
                    if (checkticket.minimumCart <= totalbill) {
                        totalbill -= checkticket.off;

                        // If bella points used
                        if (bellacoinsUse) {

                            // If the user total bill is smaller than user bella points(coins)
                            let use = await User.findOne({ email: verify.email, "bellaPoints": { $gte: totalbill + checkticket.off } });
                            // If the total bellaPoints are greater than totalbill

                            /*
                                bellapoints = 2000
                                totalbill = 100
                                100<2000 = true
                            */

                            if (use) {
                                // Decreasing user bella points
                                const updatingPoints = await User.updateOne(
                                    { 'email': findUser.email, 'bellaPoints': { $gte: totalbill } }, {
                                    $inc: { bellaPoints: -totalbill }
                                })
                                if (!updatingPoints.modifiedCount) {
                                    await incressCouponStock(couponCode)
                                    return res.json({ message: "Error occured in order", status: false })
                                }
                                // Pushing bella transaction
                                await User.updateOne(
                                    { email: findUser.email },
                                    {
                                        $push: {
                                            bellaTransaction: {
                                                status: true, orderID, time: new Date(), type: "order", totalbill, usedBellaPoints: totalbill
                                            }
                                        }
                                    }
                                )


                                // Storing order
                                await User.updateOne(
                                    { email: findUser.email },
                                    {
                                        $push: {
                                            orders: {
                                                couponCode, orderCart, bellacoinsUse, totalbill: 0, orderID, usedBellaPoints: totalbill, isConfirmed: false, isComplete: false, isCancelled: false, time: new Date(), totalProductSum, mobileNo
                                            }
                                        }
                                    }
                                )

                                // Total bill is 0 beacuase all amount paid by bella point(coins)
                                totalbill = 0;
                                // Increase totalOrders count by +1
                                await setorderCount(findUser.email);

                                await stockUpdate(productIDs);
                                return res.json({ status: true, amount: totalbill, orderID });
                            }

                            // Decreasing user bella points
                            const getUser = await User.findOne({ email: verify.email, "bellaPoints": { $gt: 0 } });
                            if (!getUser) {
                                await incressCouponStock(couponCode)
                                return res.json({ message: "Something went wrong", status: false });
                            }

                            var updating = await User.updateOne(
                                { 'email': findUser.email, "bellaPoints": { $gte: getUser.bellaPoints } },
                                {
                                    $inc: {
                                        bellaPoints: -getUser.bellaPoints
                                    }
                                }
                            )
                            if (!updating.matchedCount) {
                                await incressCouponStock(couponCode)
                                return res.json({ message: "Error occured in order", status: false });
                            }

                            totalbill = totalbill - getUser.bellaPoints;

                            // Pushing bella transaction
                            await User.updateOne(
                                { email: findUser.email },
                                {
                                    $push: {
                                        bellaTransaction: {
                                            status: true, orderID, time: new Date(), type: "order", totalbill: getUser.bellaPoints, usedBellaPoints: getUser.bellaPoints, totalProductSum
                                        }
                                    }
                                }
                            )
                            // Storing order
                            await User.updateOne({ email: findUser.email }, {
                                $push: {
                                    orders: {
                                        couponCode, orderCart, bellacoinsUse, totalbill, orderID, usedBellaPoints: getUser.bellaPoints, isConfirmed: false, isComplete: false, isCancelled: false, time: new Date(), totalProductSum, mobileNo
                                    }
                                }
                            })

                            // Increase totalOrders count by +1
                            await setorderCount(findUser.email);

                            await stockUpdate(productIDs);
                            return res.json({ status: true, amount: totalbill, orderID });
                        }

                        // Storing order
                        await User.updateOne(
                            { email: findUser.email },
                            {
                                $push: {
                                    orders: {
                                        couponCode, orderCart, bellacoinsUse, totalbill, orderID, isConfirmed: false, isComplete: false, isCancelled: false, time: new Date(), totalProductSum, mobileNo
                                    }
                                }
                            }
                        );
                        // Increase totalOrders count by +1
                        await setorderCount(findUser.email);

                        await stockUpdate(productIDs);
                        return res.json({ status: true, amount: totalbill, orderID });
                    }
                    return res.json({ status: false, message: "Coupon problem!" });
                }




                // only if bellacoinUsed
                if (bellacoinsUse) {
                    var use = await User.findOne({ email: verify.email, "bellaPoints": { $gte: totalbill } });
                    if (use) {
                        // Decreasing user bella points
                        var updating = await User.updateOne(
                            { 'email': findUser.email, 'bellaPoints': { $gte: totalbill } },
                            {
                                $inc: { bellaPoints: - totalbill }
                            }
                        );
                        if (!updating.matchedCount) {
                            return res.json({ message: "Error occured in order", status: false });
                        }
                        // Pushing bella transaction
                        await User.updateOne(
                            { email: findUser.email },
                            {
                                $push: {
                                    bellaTransaction: {
                                        status: true, orderID, time: new Date(), type: "order", totalbill, usedBellaPoints: totalbill
                                    }
                                }
                            }
                        )
                        var temp = totalbill;
                        totalbill = 0;

                        // Storing order
                        await User.updateOne(
                            { email: findUser.email },
                            {
                                $push: {
                                    orders: {
                                        couponCode, orderCart, bellacoinsUse, totalbill, mobileNo, orderID, usedBellaPoints: temp, isConfirmed: false, isCancelled: false, isComplete: false, time: new Date(), totalProductSum
                                    }
                                }
                            }
                        )
                        // Increase totalOrders count by +1
                        await setorderCount(findUser.email);

                        await stockUpdate(productIDs);
                        return res.json({ status: true, amount: totalbill, orderID });
                    }

                    // Decreasing user bella points
                    var updating = await User.updateOne(
                        { 'email': findUser.email, 'bellaPoints': { $gt: 0 } },
                        {
                            $set: {
                                bellaPoints: 0
                            }
                        }
                    )
                    if (!updating.matchedCount) {
                        return res.json({ message: "Error occured in order", status: false });
                    }
                    // Pushing bella transaction      
                    await User.updateOne(
                        { email: findUser.email },
                        {
                            $push: {
                                bellaTransaction: {
                                    status: true, orderID, time: new Date(), type: "order", totalbill, usedBellaPoints: findUser.bellaPoints
                                }
                            }
                        }
                    )
                    totalbill = totalbill - findUser.bellaPoints;
                    // Storing order
                    await User.updateOne(
                        { email: findUser.email },
                        {
                            $push: {
                                orders: {
                                    couponCode, orderCart, bellacoinsUse, totalbill, orderID, usedBellaPoints: findUser.bellaPoints, isConfirmed: false, isComplete: false, isCancelled: false, time: new Date(), totalProductSum, mobileNo
                                }
                            }
                        }
                    )

                    // Increase totalOrders count by +1
                    await setorderCount(findUser.email);

                    await stockUpdate(productIDs);
                    return res.json({ status: true, amount: totalbill, orderID });
                }





                // run if when coupon code used
                if (couponCode && couponCode != "") {
                    const checkticket = await coupons.findOne({ couponId: couponCode, 'left': { $gt: 0 } });
                    if (!checkticket) {
                        return res.json({ message: "Coupon limit is over", status: false });
                    }
                    await updateCoupon(couponCode);
                    if (checkticket.minimumCart <= totalbill) {
                        totalbill -= checkticket.off;

                        // Storing order
                        await User.updateOne(
                            { email: findUser.email },
                            {
                                $push: {
                                    orders:
                                    {
                                        couponCode, orderCart, bellacoinsUse, totalbill, orderID, isConfirmed: false, isComplete: false, isCancelled: false, time: new Date(), totalProductSum, mobileNo
                                    }
                                }
                            }
                        )

                        // Increase totalOrders count by +1
                        await setorderCount(findUser.email);

                        await stockUpdate(productIDs);
                        return res.json({ status: true, amount: totalbill, orderID });
                    }

                    return res.json({ status: false, message: "Coupon problem!" });
                }
                // Storing order
                await User.updateOne(
                    { email: findUser.email },
                    {
                        $push: {
                            orders: {
                                couponCode, orderCart, bellacoinsUse, totalbill, orderID, isConfirmed: false, isComplete: false, isCancelled: false, time: new Date(), totalProductSum, mobileNo
                            }
                        }
                    }
                )

                // Increase totalOrders count by +1
                await setorderCount(findUser.email);

                await stockUpdate(productIDs);
                return res.json({ status: true, amount: totalbill, orderID });
            }

            return res.json({ message: "unAuthorised", status: false });
        }
    }
    // catching unExpected errors
    catch (e) {
        console.log(e);
        return res.json({ message: "Something want wrong", status: false });
    }

}