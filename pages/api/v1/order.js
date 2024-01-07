import coupons from "@/models/coupons";
import products from "@/models/products";
import connectDB from "@/util/mongoDB";
export default async function handler(req,res){
    if(req.method==='POST'){
        const { couponCode , productIDs } = req.body;
        connectDB();
        let totalbill = 0;
        for(let i = 0;i<productIDs.length;i++){
            const findPRprice = await products.findOne({product_id:productIDs[i]});
            totalbill+=findPRprice.price_after_discount;
        }
        if(couponCode && couponCode !=""){
            const checkticket = await coupons.findOne({couponId:couponCode})
            if(checkticket.minimumCart<=totalbill){
                totalbill-=checkticket.off;
                return res.json( { status:true , amount:totalbill } );
            }
            return res.json( { status:false , message:"Coupon problem!" } );
        }
        return res.json( { status:true , amount:totalbill } );;
    }
    return res.json({message:"Invalid method",status:false});
}