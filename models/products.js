import { model, models, Schema } from 'mongoose'
const productSchema = new Schema({
    product_id: {
        type: String,
        required:true
    },
    name: {
        type: String,
        required:true
    },
    price:{
        type: Number,
        required:true
    },
    price:{
        type: Number,
        required:true
    },
    percentage:{
        type: Number,
        required:true
    },
    image_uri:{
        type: String,
        required:true
    },
    price_after_discount:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true,
    }
});

const products = models.products || model('products',productSchema);
export default products