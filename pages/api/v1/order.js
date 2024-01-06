export default async function handler(req,res){
    if(req.method==='POST'){
        const { couponCode , productIDs } = req.body;
        console.log(couponCode,productIDs);
        return res.json({ couponCode , productIDs })
    }
    return res.json({message:"Invalid method",status:false});
}