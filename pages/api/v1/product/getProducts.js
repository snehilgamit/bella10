import products from "@/models/products";
import connectDB from "@/util/mongoDB";
export default async function handler(req, res) {
    if (req.method == 'POST') {
        const { category } = req.body;

        try {

            await connectDB();
            const fetch = async (result) => {
                const resResult = [];
                result.forEach(el => {
                    resResult.push({
                        product_id: el.product_id,
                        name: el.name,
                        price: el.price,
                        percentage: el.percentage,
                        image_uri: el.image_uri,
                        price_after_discount: el.price_after_discount,
                        category: el.category,
                    });
                });
                return res.json({ status: true, results: resResult });
            }
        }
        catch (err) {
            console.log(err);
            return res.json({ status: false, message: "Invalid method" });
        }
        if (category === 'all') {
            const result = await products.find();
            fetch(result);
        }
        if (category) {
            const result = await products.find({ category });
            fetch(result);
        }
    };
    return res.json({ status: false, message: "Invalid method" });
};