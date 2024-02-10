import bellaUser from "@/models/User";
import connectDB from "@/util/mongoDB";
import jwt from 'jsonwebtoken';
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(200).json({ message: "Invalid method", status: false });
  const { token } = req.body;
  try {
    const verify = jwt.verify(token, process.env.SECRET);
    if (!verify) return res.json({ message: "unAuthorised", status: false });
    await connectDB();
    const find = await bellaUser.findOne({email:verify.email},{isAdmin:true});
    if(!find) return res.json({ message: "You are not admin!", status: false });
    if(!find.isAdmin) return res.json({ message: "You are not admin!", status: false });
    let user = await bellaUser.find();
    let totalOrder = 0;
    let completeOrder = 0;
    let cancelledOrder = 0;
    let users = user.length;
    let orders = [];
    user.forEach(el => {
      el.orders.forEach(e => {
        e.email = el.email
        orders.push(e);
        if (e.isConfirmed) completeOrder++;
        if (e.isCancelled) cancelledOrder++;
      })
      totalOrder += el.orders.length;
    })

    return res.json({ users, totalOrder, completeOrder, cancelledOrder, orders: orders.reverse() ,status:true})
  }
  catch {
    return res.json({ message: "Something want wrong", status: false });
  }
}