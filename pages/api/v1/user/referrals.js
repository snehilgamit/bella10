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
                    // const responseRef = []
                    // let currentUser = findUser.myReferralcode;
                    // let referrals = await User.find({ referralcode: currentUser });
                    // for (let j = 0; j < 7; j++) {
                    //     let referrals = await User.find({ referralcode: currentUser });
                    //     if (referrals.length != 0) {
                    //         for (let i = 0; i < referrals.length; i++) {
                    //             responseRef.push({
                    //                 email: referrals[i].email,
                    //                 referralcode: referrals[i].myReferralcode,
                    //                 referrals: []
                    //             })
                    //         }
                    //     }
                    //     else {
                    //         break
                    //     }
                    // }
                    console.log(referrals)
                    return res.json({
                        status: true, referralCode: findUser.myReferralcode,
                        email: findUser.email, bellaPoints: findUser.bellaPoints,

                    })
                }
                return res.json({ message: "unAuthorised", status: false });
            }
        }
        catch {
            return res.json({ message: "unAuthorised", status: false });
        }
        return res.json({ message: "unAuthorised", status: false });
    }
}