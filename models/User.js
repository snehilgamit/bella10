import { model , models , Schema } from "mongoose";
const newRef = () => {
    const str = "1234567890abcdefghijklmnopqrstuvwxyz@&%$"
    let i = 0;
    let referralCode = "";
    while(i<8){
        referralCode+=str[Math.floor(Math.random()*40)];
        i++;
    }
    return referralCode;
};

const userSchema = new Schema({
    email:String,
    password:String,
    referralcode:String,
    bellaPoints:{
        type:Number,
        default:0
    },
    myReferralcode:{
        type:String,
        default:newRef()
    },
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