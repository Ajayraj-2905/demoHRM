import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const UpdateCategory = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [category, setCategory] = useState('')

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:5000/api/category/${id}`)
                .then(response => response.json())
                .then(data => {
                    if (data.category_name) {
                        setCategory(data.category_name)
                    } else {
                        alert('Category not found')
                        navigate('/categoryList')
                    }
                })
                .catch(error => console.error('Error fetching category:', error))
        }
    }, [id, navigate])

    const handleSubmit = (event) => {
        event.preventDefault()
        Swal.fire({
            title: 'Edit',
            text: "Do you want to edit the category",
            imageUrl: '/public/Edit.png',
            imageHeight: 80,
            imageAlt: 'Edit Image',
            confirmButtonText: "Edit",
            showCancelButton: true,
            cancelButtonText: "Cancel",
            customClass: {
                confirmButton: 'w-32 bg-customYellow-default py-1.5 border-solid border-[1px] border-customYellow-default rounded',
                cancelButton: 'w-32 bg-white text-black py-1.5 border-solid border-[1px] border-gray-400 rounded',
                title: 'p-0',
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await fetch(`http://localhost:5000/api/category/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ category }),
                })
                const data = await response.json()
                if (response.ok) {
                    Swal.fire({
                        text: 'Updated Successfully',
                        customClass: {
                            confirmButton: 'bg-customYellow-default'
                        }
                    })
                    setCategory('')
                    navigate('/categoryList')
                } else {
                    Swal.fire({
                        title: data.message || "Failed To Create",
                        icon: "error",
                        confirmButtonText: "Retry"
                    })
                }
            }
        })
    }

    return (
        <div className='h-full bg-white p-5 rounded-md shadow-lg'>
            <h1 className='text-xl font-semibold'>Edit Category</h1>
            <form onSubmit={handleSubmit}>
                <div className='flex flex-wrap justify-between mt-6 h-[400px]'>
                    <div className='w-full sm:max-w-[600px] flex flex-col gap-2'>
                        <label className='text-md font-semibold'>Category</label>
                        <input type="text" placeholder='Enter category' value={category}
                            className='border border-gray-400 rounded-md px-2 py-1 w-full focus-visible:outline-none'
                            onChange={(e) => setCategory(e.target.value)} />
                    </div>
                </div>
                <div className='flex justify-center items-center gap-5'>
                    <button type='button' className='bg-white w-[130px] py-1.5 rounded border border-gray-400' onClick={() => navigate('/categoryList')}>Cancel</button>
                    <button type='submit' className='bg-customYellow-default w-[130px] py-1.5 text-white rounded border border-customYellow-default'>Save</button>
                </div>
            </form>
        </div>

    )
}

export default UpdateCategory
