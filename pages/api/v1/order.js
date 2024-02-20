import coupons from "@/models/coupons";
import products from "@/models/products";
import User from '@/models/User';
import connectDB from "@/util/mongoDB";
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
const stockUpdate = async (productIds) =>{
    for(let k = 0;k<productIds.length;k++){
        await products.updateOne({product_id:productIds[k]},{$inc:{stock:-1}});
    }
} 

// Increase totalOrders count by +1
const setorderCount = async (email) => {
    await User.updateOne({ email }, { $inc: { totalOrders: +1 } })
    return 0;
}


export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.json({ message: "Invalid method", status: false });
    }

    const { couponCode, productIDs, bellacoinsUse, token, mobileNo } = req.body;
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
                        { productIDs: findPRprice.product_id, name: findPRprice.name,price:findPRprice.price_after_discount}
                    )
                    totalbill += findPRprice.price_after_discount;
                }
                // Saving totalbill to update on database query, it is constant bill can not be changed.
                const totalProductSum = totalbill;

                // Generating order ID
                const orderID = getOrder();

                // If the coupon code and bellacoins used
                if (couponCode && couponCode != "" && bellacoinsUse) {

                    const checkticket = await coupons.findOne({ couponId: couponCode })
                    if (!checkticket.isActive) return res.json({ message: "Coupon is not active", status: false });
                    if (checkticket.left <= 0) return res.json({ message: "Coupon limit is over", status: false });
                    checkticket.left = checkticket.left - 1;
                    await coupons.updateOne({ couponId: couponCode }, checkticket);
                    // If the minimumcart value is smaller than total bill (it is for setting the minimum order value)
                    if (checkticket.minimumCart <= totalbill) {
                        totalbill -= checkticket.off;

                        // If bella points used
                        if (bellacoinsUse) {

                            // If the user total bill is smaller than user bella points(coins)
                            const { bellaPoints } = await User.findOne({ email: verify.email });
                            if (bellaPoints !== findUser.bellaPoints) {
                                return res.json({ message: "Something went wrong", status: false });
                            }
                            if (bellaPoints < 0) {
                                return res.json({ message: "Something went wrong", status: false });
                            }
                            if (bellaPoints >= totalbill) {

                                // Decreasing user bella points
                                await User.updateOne(
                                    { 'email': findUser.email }, {
                                    $inc: { bellaPoints: -totalbill }
                                })

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

                                // Total bill is 0 beacuase all amount paid by bella point(coins)
                                totalbill = 0;

                                // Storing order
                                await User.updateOne(
                                    { email: findUser.email },
                                    {
                                        $push: {
                                            orders: {
                                                couponCode, orderCart, bellacoinsUse, totalbill, orderID, usedBellaPoints: totalbill, isConfirmed: false, isComplete: false, isCancelled: false, time: new Date(), totalProductSum, mobileNo
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
                            const getUser = await User.findOne({ email: verify.email });
                            if (getUser.bellaPoints !== findUser.bellaPoints) {
                                return res.json({ message: "Something went wrong", status: false })
                            }
                            if (getUser.bellaPoints < 0) {
                                return res.json({ message: "Something went wrong", status: false });
                            }

                            await User.updateOne(
                                { 'email': findUser.email },
                                {
                                    $inc: {
                                        bellaPoints: -getUser.bellaPoints
                                    }
                                }
                            )

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
                if (bellacoinsUse) {
                    const getUser = await User.findOne({ email: verify.email });
                    if (getUser.bellaPoints !== findUser.bellaPoints) {
                        return res.json({ message: "Something went wrong", status: false })
                    }
                    if (getUser.bellaPoints < 0) {
                        return res.json({ message: "Something went wrong", status: false });
                    }

                    if (getUser.bellaPoints >= totalbill) {
                        // Decreasing user bella points
                        await User.updateOne(
                            { 'email': findUser.email },
                            {
                                $inc: { bellaPoints: -totalbill }
                            }
                        );

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
                    const getUsertemp = await User.findOne({ email: verify.email });
                    if (getUsertemp.bellaPoints !== findUser.bellaPoints) {
                        return res.json({ message: "Something went wrong", status: false })
                    }
                    if (getUsertemp.bellaPoints < 0) {
                        return res.json({ message: "Something went wrong", status: false });
                    }
                    await User.updateOne(
                        { 'email': findUser.email },
                        {
                            $inc: {
                                bellaPoints: -getUsertemp.bellaPoints
                            }
                        }
                    )

                    // Pushing bella transaction      
                    await User.updateOne(
                        { email: findUser.email },
                        {
                            $push: {
                                bellaTransaction: {
                                    status: true, orderID, time: new Date(), type: "order", totalbill, usedBellaPoints: getUsertemp.bellaPoints
                                }
                            }
                        }
                    )
                    totalbill = totalbill - getUsertemp.bellaPoints;
                    // Storing order
                    await User.updateOne(
                        { email: findUser.email },
                        {
                            $push: {
                                orders: {
                                    couponCode, orderCart, bellacoinsUse, totalbill, orderID, usedBellaPoints: getUsertemp.bellaPoints, isConfirmed: false, isComplete: false, isCancelled: false, time: new Date(), totalProductSum, mobileNo
                                }
                            }
                        }
                    )

                    // Increase totalOrders count by +1
                    await setorderCount(findUser.email);

                    await stockUpdate(productIDs);
                    return res.json({ status: true, amount: totalbill, orderID });
                }
                if (couponCode && couponCode != "") {
                    const checkticket = await coupons.findOne({ couponId: couponCode });
                    if (!checkticket.isActive) return res.json({ message: "Coupon is not active", status: false });
                    if (checkticket.left <= 0) return res.json({ message: "Coupon limit is over", status: false });
                    checkticket.left = checkticket.left - 1;
                    await coupons.updateOne({ couponId: couponCode }, checkticket);
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