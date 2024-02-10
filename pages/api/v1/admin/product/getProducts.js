import products from "@/models/products";
import connectDB from "@/util/mongoDB";

export default async function handler(req,res){
    if(req.method!=='GET')  return res.status(200).json({ message: "Invalid method", status: false });

    await connectDB();
    const allProduct = await products.find();
    return res.status(200).json({products:allProduct,status:true});
}