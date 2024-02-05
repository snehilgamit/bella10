import products from "@/models/products";
import connectDB from "@/util/mongoDB";
export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { product_id } = req.body;
        await connectDB();
        const result = await products.findOne({ product_id });
        return res.status(200).json({
            status: true, results: {
                product_id: result.product_id,
                name: result.name,
                price: result.price, 
                percentage: result.percentage, 
                image_uri: result.image_uri, 
                price_after_discount: result.price_after_discount, 
                category: result.category,
                stock: result.stock, 
                offer: ["Buy 2 get 5% extra off", "Buy 5 get 1 bat free"]
            }
        })
    };
    return res.status(400).json({ status: false, message: "Invalid method" });
}