import coupons from "@/models/coupons";
import connectDB from "@/util/mongoDB";

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(200).json({ message: "Invalid method", status: false });
    const { couponId, off, minimumCart,maxLimit } = req.body;
    if (!couponId) return res.status(200).json({ message: "Coupon missing...", status: false });
    if (!off) return res.status(200).json({ message: "discount missing...", status: false });
    if (!minimumCart) return res.status(200).json({ message: "minimum cart missing...", status: false }); 
    try{
        await connectDB();
        const findCoupon = await coupons.findOne({couponId});
        if(!findCoupon) return res.status(200).json({ message: "Coupon already exist...", status: false });
        await coupons.create({ couponId, off, minimumCart,maxLimit,left:maxLimit });
        return res.status(200).json({ message: "Created...", status: true });
    }
    catch{
        return res.status(200).json({ message: "Something want wrong...", status: false });
    }
}