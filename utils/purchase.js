import axios from "axios"
const purchase = async (carts,couponCode) => {
    const productIDs = [];
    carts.forEach(el=>{
        productIDs.push(el.product_id)
    });
    const order = await axios.post('/api/v1/order',{productIDs,couponCode})
}

export default purchase