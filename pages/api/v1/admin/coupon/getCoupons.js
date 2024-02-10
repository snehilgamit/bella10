import coupons from "@/models/coupons";
import connectDB from "@/util/mongoDB";

export default async function handler(req,res){
    if(req.method!=='GET')  return res.status(200).json({ message: "Invalid method", status: false });

    await connectDB();
    const allCoupons = await coupons.find();
    return res.status(200).json({coupons:allCoupons,status:true});
}