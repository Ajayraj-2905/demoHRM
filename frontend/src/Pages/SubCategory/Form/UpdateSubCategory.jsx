import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import Swal from 'sweetalert2'

const UpdateSubCategory = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [categories, setCategories] = useState([])
    const [categoryId, setCategoryId] = useState('')
    const [subCategory, setSubCategory] = useState('')

    useEffect(() => {
        if (id) {
            fetch(`http://localhost:5000/api/subcategory/${id}`)
                .then(response => response.json())
                .then(data => {
                    if (data.subcategory_name) {
                        setSubCategory(data.subcategory_name)
                        setCategoryId(data.category_id)
                    } else {
                        alert('subCategory not found')
                    }
                })
                .catch(error => console.error('Error fetching subcategory:', error))
        }
    }, [id, navigate])

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/category')
            const result = await response.json()
            setCategories(result)
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }
    useEffect(() => {
        fetchData()
        console.log('SubCategory list running')
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault()
        Swal.fire({
            title: 'Edit',
            text: "Do you want to edit the subcategory",
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
                const response = await fetch(`http://localhost:5000/api/subcategory/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ subCategory, categoryId }),
                })
                const data = await response.json()
                if (response.ok) {
                    Swal.fire({
                        text: 'Updated Successfully',
                        customClass: {
                            confirmButton: 'bg-customYellow-default'
                        }
                    })
                    setCategoryId('')
                    setSubCategory('')
                    navigate('/subcategoryList')
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
    const handleCancel = () => {
        setCategoryId('')
        setSubCategory('')
        navigate('/subcategoryList')
    }

    return (
        <div className='h-full bg-white p-5 rounded-md shadow-lg'>
            <div className='flex flex-col sm:flex-row justify-between sm:items-center gap-2'>
                <h1 className='text-xl font-semibold'>Create Sub Category</h1>
                <Link to='/SubCategoryList' className='px-4 py-2 text-center bg-customYellow-default text-white rounded'>Back To List</Link>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col sm:flex-row gap-5 sm:gap-10 sm:justify-between mt-6 h-[400px]'>
                    <div className='w-full flex flex-col gap-2'>
                        <label className='text-md font-semibold'>Category</label>
                        <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}
                            className='px-2 py-1 rounded-md border border-gray-400' required>
                            <option value="">Select a Category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.category_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='w-full flex flex-col gap-2'>
                        <label className='text-md font-semibold'>Sub Category</label>
                        <input type="text" placeholder='Enter category' value={subCategory}
                            className='border border-gray-400 rounded-md px-2 py-1 w-full focus-visible:outline-none'
                            onChange={(e) => setSubCategory(e.target.value)} required />
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

export default UpdateSubCategory
