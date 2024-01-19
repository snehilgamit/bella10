import axios from "axios"
const purchase = async (carts,couponCode,bellacoinsUse,token) => {
    const productIDs = [];
    carts.forEach(el=>{
        productIDs.push(el.product_id)
    });
    const order = await axios.post('/api/v1/order',{couponCode,productIDs,bellacoinsUse,token});
    return order.data
}

export default purchase