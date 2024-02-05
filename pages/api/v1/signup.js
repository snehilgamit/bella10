import connectDB from "@/util/mongoDB";
import User from '@/models/User';
import jwt from 'jsonwebtoken';

const newRef = () => {
    const str = "1234567890abcdefghijklmnopqrstuvwxyz"
    let i = 0;
    let referralCode = "";
    while(i<8){
        referralCode+=str[Math.floor(Math.random()*(str.length-1))];
        i++;
    }
    return referralCode;
};

export default async function main(req, res) {
    if (req.method === 'POST') {
        const { email, password, repassword, referralcode } = req.body;
        try {
            if (email.length == 0 || password.length == 0 || repassword.length == 0 || referralcode.length == 0) {
                return res.status(200).json({ status: false, message: "Something missing" })
            }
            await connectDB();
            const findEmail = await User.findOne({ email });
            if (findEmail) {
                return res.status(200).json({ status: false, message: "Email already exist!" });
            }
            else {
                if (password === repassword) {
                    const referCodeVerify = await User.findOne({myReferralcode:referralcode});
                    if(!referCodeVerify){
                        return res.status(200).json({ status: false, message: "Referral code not found." });
                    }
                    await User.updateOne({myReferralcode:referralcode},{$push:{referrals:{email:email.toLowerCase()}}})
                    const referral = newRef();
                    await User.create({ email:email.toLowerCase(), password, referralcode,myReferralcode:referral})
                    const token = jwt.sign({ email }, process.env.SECRET);
                    return res.status(200).json({ status: true, email, token });
                }
                return res.status(200).json({ status: false, message: "Confirm password not matched" });
            }
        }
        catch(e) {
            console.log(e);
            return res.status(500).json({ status: false, message: "Something want wrong" });
        }
    }
    return res.status(400).json({ status: false, message: "Invalid method" })
}