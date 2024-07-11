import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import axios from 'axios';
const AddProduct = ({ data }) => {
    return (
        <div className='h-screen overflow-x-scroll px-10 py-5 w-full mx-auto bg-gray-400/10'>
            <div className='w-[85%] mt-10 text-xl font-bold ml-[6.6rem] mb-2'>
                <h1>
                    Create A New Product
                </h1>
            </div>
            <div className='w-full flex justify-center'>
                <div className='w-[85%] flex'>
                    <div className='text-3xl font-semibold relative w-[65%] h-fit bg-white border rounded-lg p-4'>
                        <div className='w-[80%] text-base font-bold ml-3 mb-2'>
                            <h1>
                                General
                            </h1>
                        </div>
                        <AddProductForm />
                    </div>
                    <SideBox />
                </div>
            </div>
            <div className='py-14'></div>
        </div>
    )
}

export default AddProduct



const AddProductForm = () => {
    return (
        <div className='flex gap-2 flex-col p-4 mx-5 font-normal text-base'>
            <div id='name'>
                <lable for="name">Name</lable>
                <input type="text" className='border rounded-md border-black/85 w-full py-1 mt-1 px-2 focus:ring-0 opacity-80' placeholder='Name' />
            </div>
            <div id='details' className='flex gap-5'>
                <div id='sku'>
                    <lable for="sku">SKU</lable>
                    <input type="text" className='border rounded-md border-black/85 w-full py-1 mt-1 px-2 focus:ring-0 opacity-80' placeholder='SKU' />
                </div>
                <div id='price' className='relative'>
                    <lable for="price">Price</lable>
                    <input type="text" className='border rounded-md border-black/85 w-full py-1 mt-1 px-2 focus:ring-0 opacity-80' placeholder='Price' />
                    <div className='absolute px-3 right-0 py-0.5 top-1/2'>₹</div>
                </div>
                <div id='weight'>
                    <lable for="weight">Weight</lable>
                    <input type="text" className='border rounded-md border-black/85 w-full py-1 mt-1 px-2 focus:ring-0 opacity-80' placeholder='Weight' />
                </div>
            </div>
            <div id='name'>
                <h1>Category</h1>
                <select className=' border rounded-md border-black/85 w-full py-1.5 mt-1 px-2 opacity-80' onChange={(e) => { console.log(e.target.value) }}>
                    <option value={"select_category"}>Select category</option>
                    <option value={"cricket"}>Cricket</option>
                    <option value={"football"}>Football</option>
                    <option value={"tennis"}>Tennis</option>
                    <option value={'volleyball'}>Volleyball</option>
                    <option value={'other'}>Other</option>
                </select>
            </div>
            <div id='description'>
                <h1>Description</h1>
                <input type='text' className=' border rounded-md border-black/85 w-full py-1 mt-1 px-2 focus:ring-0 opacity-80' placeholder='Description' />
            </div>
        </div>
    )
}

const SideBox = () => {
    return (
        <div className='flex flex-col w-[25%] gap-2'>
            <div className='flex flex-col'>
                <div className='mx-4 px-6 p-6 bg-white h-fit rounded-lg border rounded-b-none'>
                    <div className='w-[80%] text-base font-bold mb-1'>
                        <h1>
                            Product status
                        </h1>
                    </div>
                    <div className='ml-2 mt-2 font-semibold text-sm flex flex-col gap-1 '>
                        <label for="status">Status</label>
                        <div className='flex items-center ml-3'>
                            <input type='checkbox' className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-transparent focus:ring-2">
                            </input>
                            <h1 for="purple-checkbox" class="ms-2 text-sm font-normal text-gray-900" >
                                Disable
                            </h1>
                        </div>
                        <div className='flex items-center ml-3'>

                            <input type='checkbox' className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-transparent focus:ring-2">
                            </input>
                            <h1 for="purple-checkbox" class="ms-2 text-sm font-normal text-gray-900" >
                                Enable
                            </h1>
                        </div>
                    </div>
                </div>

                <div className='mx-4 px-6 p-3 bg-white h-fit rounded-lg border rounded-t-none'>
                    <div className='ml-2 my-2 font-semibold text-sm flex flex-col gap-1 '>
                        <label for="status">Visibility</label>
                        <div className='flex items-center ml-3'>
                            <input type='checkbox' className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-transparent focus:ring-2">
                            </input>
                            <h1 for="purple-checkbox" class="ms-2 text-sm font-normal text-gray-900" >
                                Disable
                            </h1>
                        </div>
                        <div className='flex items-center ml-3'>

                            <input type='checkbox' className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-transparent focus:ring-2">
                            </input>
                            <h1 for="purple-checkbox" class="ms-2 text-sm font-normal text-gray-900" >
                                Enable
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col'>
                <div className='mx-4 px-6 p-6 bg-white h-fit rounded-lg border rounded-b-none'>
                    <div className='w-[80%] text-base font-bold mb-1'>
                        <h1>
                        Inventory
                        </h1>
                    </div>
                    <div className='ml-2 mt-2 font-semibold text-sm flex flex-col gap-1 '>
                        <label for="status">Manage stock?</label>
                        <div className='flex items-center ml-3'>
                            <input type='checkbox' className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-transparent focus:ring-2">
                            </input>
                            <h1 for="purple-checkbox" class="ms-2 text-sm font-normal text-gray-900" >
                                No
                            </h1>
                        </div>
                        <div className='flex items-center ml-3'>

                            <input type='checkbox' className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-transparent focus:ring-2">
                            </input>
                            <h1 for="purple-checkbox" class="ms-2 text-sm font-normal text-gray-900" >
                                Yes
                            </h1>
                        </div>
                    </div>
                </div>
                
                <div className='mx-4 px-6 p-3 bg-white h-fit rounded-lg border rounded-t-none rounded-b-none'>
                    <div className='ml-2 my-2 font-semibold text-sm flex flex-col gap-1 '>
                        <label for="status">Stock availability</label>
                        <div className='flex items-center ml-3'>
                            <input type='checkbox' className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-transparent focus:ring-2">
                            </input>
                            <h1 for="purple-checkbox" class="ms-2 text-sm font-normal text-gray-900" >
                                No
                            </h1>
                        </div>
                        <div className='flex items-center ml-3'>
                            <input type='checkbox' className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-transparent focus:ring-2">
                            </input>
                            <h1 for="purple-checkbox" class="ms-2 text-sm font-normal text-gray-900" >
                                Yes
                            </h1>
                        </div>
                    </div>
                </div>
                <div className='mx-4 px-6 p-3 bg-white h-fit rounded-lg border rounded-t-none'>
                    <div className='ml-2 my-2 font-semibold text-sm flex flex-col gap-1 '>
                        <label for="status">Quantity</label>
                        <div className='flex items-center mx-3'>
                            <input type="text" className='border rounded-md border-black/85 w-full py-1 mt-0 px-2 focus:ring-0 opacity-80' placeholder='Quantity' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}