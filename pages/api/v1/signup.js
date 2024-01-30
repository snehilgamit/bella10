import connectDB from "@/util/mongoDB";
import User from '@/models/User';
import jwt from 'jsonwebtoken';
export default async function main(req, res) {
    if (req.method === 'POST') {
        const { email, password, repassword, referralcode } = req.body;
        try {
            if (email.length == 0 || password.length == 0 || repassword.length == 0 || referralcode.length == 0) {
                return res.json({ status: false, message: "Something missing" })
            }
            await connectDB();
            const findEmail = await User.findOne({ email });
            if (findEmail) {
                return res.json({ status: false, message: "Email already exist!" });
            }
            else {
                if (password === repassword) {
                    const referCodeVerify = await User.findOne({myReferralcode:referralcode});
                    if(!referCodeVerify){
                        return res.json({ status: false, message: "Referral code not found." });
                    }
                    User.create({ email:email.toLowerCase(), password, referralcode })
                    const token = jwt.sign({ email }, process.env.SECRET);
                    return res.json({ status: true, email, token });
                }
                return res.json({ status: false, message: "Confirm password not matched" });
            }
        }
        catch(e) {
            console.log(e);
            return res.json({ status: false, message: "Something want wrong" });
        }
    }
    return res.json({ status: false, message: "Invalid method" })
}