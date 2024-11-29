import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const Category = () => {
    const [category, setCategory] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault()
        const response = await fetch('https://backend-hrcompliance.onrender.com/api/category', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include', 
            body: JSON.stringify({ category }),
        })
        if (response.ok) {
            Swal.fire({
                title: 'Save',
                text: "Category Saved Successfully",
                imageUrl: '/public/Save.png',
                imageHeight: 80,
                imageAlt: 'Save Image',
                confirmButtonText: "Ok",
                showCancelButton: true,
                cancelButtonText: "Cancel",
                customClass: {
                    confirmButton: 'w-32 bg-customYellow-default py-1.5 border-solid border-[1px] border-customYellow-default rounded',
                    cancelButton: 'w-32 bg-white text-black py-1.5 border-solid border-[1px] border-gray-400 rounded',
                    title: 'p-0',
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    setCategory('')
                    navigate('/categoryList')
                } else {
                    setCategory('')
                }
            })
        } else {
            Swal.fire({
                title: data.message || "Failed To Create",
                icon: "error",
                confirmButtonText: "Retry"
            })
        }
    }
    const handleCancel = () => {
        setCategory('')
        navigate('/categoryList')
    }

    return (
        <div className='h-full bg-white p-5 rounded-md shadow-lg'>
            <div className='flex flex-col sm:flex-row justify-between sm:items-center gap-2'>
                <h1 className='text-xl font-semibold'>Create Category</h1>
                <Link to='/categoryList' className='px-4 py-2 text-center bg-customYellow-default text-white rounded'>Category List</Link>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='flex flex-wrap justify-between mt-6 h-[400px]'>
                    <div className='w-full sm:max-w-[600px] flex flex-col gap-2'>
                        <label className='text-md font-semibold'>Category</label>
                        <input type="text" placeholder='Enter category' value={category}
                            className='border border-gray-400 rounded-md px-2 py-1 w-full focus-visible:outline-none'
                            onChange={(e) => setCategory(e.target.value)} required />
                    </div>
                </div>
                <div className='flex justify-center items-center gap-5'>
                    <button type='button' className='bg-white w-[130px] py-1.5 rounded border border-gray-400' onClick={handleCancel}>Cancel</button>
                    <button type='submit' className='bg-customYellow-default w-[130px] py-1.5 text-white rounded border border-customYellow-default'>Save</button>
                </div>
            </form>
        </div>
    )
}

export default Category