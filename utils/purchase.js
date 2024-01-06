import axios from "axios"
const purchase = async (carts,couponCode) => {
    const productIDs = []
    carts.forEach(el=>{
        productIDs.push(el.product_id)
    })
    // const req = await axios.post("/api/v1/order",{productIDs,couponCode});
    // const s = await axios.get("/api/v1/test")
}

export default purchase