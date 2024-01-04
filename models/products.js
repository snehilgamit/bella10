import { model, models, Schema } from 'mongoose'
const productSchema = new Schema({
    product_id: {
        type: Object,
        required:true
    },
});

const products = model.products || models('products',productSchema);
export default products