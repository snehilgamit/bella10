export default async function handler(req,res){
    if(req.method==='POST'){
        const { couponCode , productID } = req.body;

    }
    return res.json({message:"Invalid method",status:false});
}