import jwt from 'jsonwebtoken'
import User from '@/models/User'
import connectDB from '@/database/mongoDB'
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { token } = req.body;
    if(!token) return res.status(200).json({status:false});
    try {
      await connectDB();
      const verify = jwt.verify(token, process.env.SECRET);
      if (verify) {
        const findUser = await User.findOne({ email: verify.email });
        if (findUser) {
          const token = jwt.sign({ email: findUser.email }, process.env.SECRET);
          return res.status(200).json({ message: "Authorised", status: true, email: findUser.email, token, isAdmin: findUser.isAdmin });
        }
        return res.status(200).json({ message: "unAuthorised", status: false });
      }
    }
    catch (e){
      return res.status(500).json({ message: "Something want wrong!", status: false });
    }
    return res.status(200).json({ message: "unAuthorised", status: false });
  }
  return res.status(400).json({ message: "Invalid method", status: false });
}
