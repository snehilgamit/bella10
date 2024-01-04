import { model, models, Schema } from 'mongoose'
import { v4 as uuidv4 } from 'uuid';
const couponSchema = new Schema({
    couponId: {
        type: String,
        required:true
    },
    name: {
        type: String,
        required:true
    },
    price: {
        type: Number,
        required:true
    },
    price_after_discount: {
        type: Number,
        required:true
    },
    percentage: {
        type: String,
        required:true
    },
    image_uri: {
        type: String,
        required:true
    },
});

const coupons = model.coupons || models('coupons',couponSchema);
export default coupons