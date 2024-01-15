import products from "@/models/products";
import connectDB from "@/util/mongoDB";
export default async function handler(req, res) {
    const fetch = async (result) => {
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
            });
        });
        return res.json({ status: true, results: resResult });
    }
    if (req.method == 'POST') {
        const { category } = req.body;
        await connectDB();
        if (category === 'all') {
            const result = await products.find();
            await fetch(result);
        }
        if (category !== "all") {
            const result = await products.find({ category });
            await fetch(result);
        }
    };
    return res.json({ status: false, message: "Invalid method" });
};