import { model, models, Schema } from 'mongoose'
import { v4 as uuidv4 } from 'uuid';
const ordersSchema = new Schema({
    orderID:{
        type:String,
        default:uuidv4
    },
    orderAmount:{
        type: Number,
        required:true
    },
    userEmail:{
        type:String,
        default:uuidv4
    },
    mobileNo:{
        type:String,
        required:true
    },
    isConfirmed: {
        type: Boolean,
        default:false
    },
    couponID:{
        type:Number,
        required:true
    },
});

const orders = models.orders || model('orders',ordersSchema);
export default orders;