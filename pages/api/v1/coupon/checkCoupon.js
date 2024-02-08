import coupons from "@/models/coupons";
import connectDB from "@/util/mongoDB";
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { couponCode } = req.body;
        await connectDB();
        const result = await coupons.findOne({ couponId: couponCode.toLowerCase() });
        if (result) {
            if (!result.isActive) return res.json({ message: "Coupon is not active", status: false });
            if (result.left <= 0) return res.json({ message: "Coupon limit is over", status: false });
            return res.status(200).json({ status: true, off: result.off, minimumCart: result.minimumCart });
        }
        return res.status(200).json({ status: false, message: "Incorrect Code" });
    }
    return res.status(400).json({ status: false, message: "Invalid method" });
}