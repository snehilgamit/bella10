import { model , models , Schema } from "mongoose";

const userSchema = new Schema({
    email:String,
    password:String,
    referralcode:String,
    bellaPoints:{
        type:Number,
        default:0
    },
    enteredReferralcode:String,
    orders:{
        type:Array,
        default:[]
    },
    totalOrders:{
        type:Number,
        default:0
    },
    Ordercanceled:{
        type:Number,
        default:0
    },
    created:{
        type:String,
        default:new Date(),
    }
})

const bellaUser = models.bellaUser || model('bellaUser',userSchema);
export default bellaUser