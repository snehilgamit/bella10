import { useRouter } from "next/router"
const Contain = () => {
    const router = useRouter();
    const routing = (path) => {
        router.push(path)
    }
    return(
        <div className='flex justify-center items-center mt-10 text-center'>
            <ul className='text-white text-xl w-[250px]'>
                <li className='bg-black my-2 rounded-xl py-1 cursor-pointer' onClick={() => routing('admin/dashboard')}>Dashboard</li>
                <li className='bg-black my-2 rounded-xl py-1 cursor-pointer' onClick={() => routing('admin/verifyOrder')}>Verify order</li>
                <li className='bg-black my-2 rounded-xl py-1 cursor-pointer' onClick={() => routing('admin/products')}>Product managment</li>
                <li className='bg-black my-2 rounded-xl py-1 cursor-pointer' onClick={() => routing('admin/coupons')}>Coupon managment</li>
            </ul>
        </div>
    )
}
export default Contain