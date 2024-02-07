import { model, models, Schema } from 'mongoose'
import { v4 as uuidv4 } from 'uuid';
const couponSchema = new Schema({
    couponId: {
        type: String,
        required:true
    },
    unique:{
        type:String,
        default:uuidv4
    },
    off: {
        type: Number,
        required:true
    },
    minimumCart:{
        type:Number,
        required:true
    },
    isActive:{
        type:Boolean,
        default:true
    },
    left:{
        type:Number,
        default:100
    },
    maxLimit:{
        type:Number,
        default:100
    }
});

const coupons = models.coupons || model('coupons',couponSchema);
export default coupons