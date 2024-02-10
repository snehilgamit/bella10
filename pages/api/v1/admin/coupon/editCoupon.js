import coupons from "@/models/coupons";
import connectDB from "@/util/mongoDB";

export default async function handler(req,res){
    if(req.method !== 'POST') return res.json({status:false,message:"Invalid method"});
    const { data , couponId } = req.body;
    try{
        await connectDB();
        let couponCode = await coupons.updateOne({couponId});
        if(!couponCode) return res.json({status:false,message:"Coupon code not found!"});
        await coupons.updateOne({couponId},{...data})
        return res.json({status:true,message:"Updated..."})
    }
    catch(e){
        console.log(e)
        return res.json({status:false,message:"Something want wrong!"});
    }
}