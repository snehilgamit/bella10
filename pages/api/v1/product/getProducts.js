import products from "@/models/products";
import connectDB from "@/database/mongoDB";
export default async function handler(req, res) {
    await connectDB();
    if (req.method === 'POST') {
        const { category } = req.body;
        if(category==='' || !category) return res.json({messgae:"Category is missing!",status:false});
        if (category === 'all') {
            const result = await products.find();
            const resResult = [];
            result.forEach(el => {
                resResult.push({
                    product_id: el.product_id,
                    name: el.name,
                    percentage: el.percentage,
                    image_uri: el.image_uri,
                    price_after_discount: el.price_after_discount,
                    category: el.category,
                    price: el.price,
                    stock: el.stock
                });
            });
            return res.status(200).json({ status: true, results: resResult });
        }
        const result = await products.find({ category });
        const resResult = [];
        result.forEach(el => {
            resResult.push({
                product_id: el.product_id,
                name: el.name,
                percentage: el.percentage,
                image_uri: el.image_uri,
                price_after_discount: el.price_after_discount,
                category: el.category,
                price: el.price,
                stock: el.stock
            });
        });
        return res.status(200).json({ status: true, results: resResult });
    };
    return res.status(400).json({ status: false, message: "Invalid method" });
};