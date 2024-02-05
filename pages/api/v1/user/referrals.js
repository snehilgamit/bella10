import connectDB from "@/util/mongoDB";
import User from '@/models/User';
import jwt from 'jsonwebtoken'
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { token } = req.body;
        try {
            await connectDB();
            const verify = jwt.verify(token, process.env.SECRET);
            if (verify) {
                const findUser = await User.findOne({ email: verify.email });
                if (findUser) {
                    let totalReferralOrders =findUser.referralsOrders ||0;
                    let totalReferrals = findUser.referrals.length;

                    let data ={status: true, referralCode: findUser.myReferralcode,
                        email: findUser.email, bellaPoints: findUser.bellaPoints,
                        totalReferrals,totalReferralOrders,referrals:findUser.referrals}
                    return res.status(200).json(data);
                }
                return res.status(200).json({ message: "unAuthorised", status: false });
            }
        }
        catch {
            return res.status(500).json({ message: "Error occured", status: false });
        }
        return res.status(200).json({ message: "unAuthorised", status: false });
    }
    return res.status(400).json({ status: false, message: "Invalid method" });
}