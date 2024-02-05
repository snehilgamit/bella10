import { model , models , Schema } from "mongoose";

const userSchema = new Schema({
    email:String,
    password:String,
    referralcode:String,
    bellaPoints:{
        type:Number,
        default:0
    },
    myReferralcode:{
        type:String
    },
    orders:{
        type:Array,
        default:[]
    },
    bellaTransaction:{
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
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    isBanned:{
        type:Boolean,
        default:false
    },
    referrals:{
        type:Array
    },
    referralsOrders:{
        type:Number,
        default:0
    },
    isProcessing:{
        type:Boolean,
        default:false
    }
})

const bellaUser = models.bellaUser || model('bellaUser',userSchema);
export default bellaUser