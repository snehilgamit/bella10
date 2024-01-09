import coupons from "@/models/coupons";
import connectDB from "@/util/mongoDB";
export default async function handler(req,res){
    if(req.method==='POST'){
        const { couponCode } = req.body;
        await connectDB();
        const result = await coupons.findOne({couponId:couponCode.toLowerCase()});
        if(result){
            return res.json({status:true,off:result.off,minimumCart:result.minimumCart});
        }
        return res.json({status:false});
    }
    return res.json({status:false,message:"Invalid method"})
}