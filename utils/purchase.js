import axios from "axios"
const purchase = async (carts,couponCode,bellacoinsUse,token,mobileNo) => {
    const productIDs = [];
    carts.forEach(el=>{
        productIDs.push(el.product_id)
    });
    const order = await axios.post('/api/v1/order',{couponCode:couponCode.toLowerCase(),productIDs,bellacoinsUse,token,mobileNo});
    return order.data
}

export default purchase