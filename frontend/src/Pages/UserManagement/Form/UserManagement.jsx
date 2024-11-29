import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const UserManagement = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: "", email: "", password: "", companyAccess: "", designation: "",
        modulesAccess: "", profilePhoto: null
    })
    const [previewImage, setPreviewImage] = useState(null)

    const handleSubmit = async (event) => {
        event.preventDefault()
        const data = new FormData()
        data.append('username', formData.username)
        data.append('email', formData.email)
        data.append('password', formData.password)
        data.append('companyAccess', formData.companyAccess)
        data.append('designation', formData.designation)
        data.append('moduleAccess', formData.modulesAccess)
        data.append('image', formData.profilePhoto)
        const response = await fetch('https://backend-hrcompliance.onrender.com/api/usermanagement/upload', {
            method: 'POST',
            credentials: 'include', 
            body: data,
        })
        const result = await response.json()
        if (response.ok) {
            Swal.fire({
                title: 'Save',
                text: "User Saved Successfully",
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
                    setFormData({
                        username: '', email: '', password: '', designation: '', companyAccess: '',
                        modulesAccess: '', profilePhoto: null,
                    })
                    setPreviewImage(null)
                    navigate('/userManagementList')
                } else {
                    setFormData({
                        username: '', email: '', password: '', designation: '', companyAccess: '',
                        modulesAccess: '', profilePhoto: null,
                    })
                    setPreviewImage(null)
                }
            })
        } else {
            Swal.fire({
                title: result.message || "Failed To Create",
                icon: "error",
                confirmButtonText: "Retry"
            })
        }
    }
    const handleCancel = () => {
        setFormData({
            username: "", email: "", password: "", companyAccess: "", designation: "",
            modulesAccess: "", profilePhoto: null
        })
        setPreviewImage(null)
        navigate('/userManagementList')
    }
    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setFormData({ ...formData, profilePhoto: file })
            setPreviewImage(URL.createObjectURL(file))
        }
    }

    return (
        <div className='h-full bg-white p-5 rounded-md shadow-lg'>
            <h1 className='text-xl font-semibold'>Create User</h1>
            <form onSubmit={handleSubmit}>
                <div className='flex justify-center items-center'>
                    <label htmlFor="UserProfile" className="cursor-pointer">
                        <div className="w-40 h-40 bg-gray-100 shadow-md rounded-full overflow-hidden flex items-center justify-center">
                            {previewImage ? (
                                <img
                                    src={previewImage}
                                    alt="Upload Profile"
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />) :
                                (<svg width="55" height="55" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M26.623 19.6016V24.6016C26.623 25.2646 26.3597 25.9005 25.8908 26.3693C25.422 26.8382 24.7861 27.1016 24.123 27.1016H6.62305C5.96001 27.1016 5.32412 26.8382 4.85528 26.3693C4.38644 25.9005 4.12305 25.2646 4.12305 24.6016V19.6016M21.623 10.8516L15.373 4.60156M15.373 4.60156L9.12305 10.8516M15.373 4.60156V19.6016" stroke="gray" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>)}
                        </div>
                        <input
                            id="UserProfile"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </label>
                </div>
                <p className="mt-4 text-center text-lg font-semibold">User Profile Photo</p>
                <div className='my-6 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-x-10'>
                    <div className='w-full flex flex-col gap-2 order-1'>
                        <label className='text-md font-semibold'>Username</label>
                        <input type="text" placeholder='Enter the username' value={formData.username}
                            className='border border-gray-400 rounded-md px-2 py-1 w-full focus-visible:outline-none'
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })} required />
                    </div>
                    <div className='w-full flex flex-col gap-2 order-3'>
                        <label className='text-md font-semibold'>Email Id</label>
                        <input type="email" placeholder='Enter the email' value={formData.email}
                            className='border border-gray-400 rounded-md px-2 py-1 w-full focus-visible:outline-none'
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                    </div>
                    <div className='w-full flex flex-col gap-2 order-2'>
                        <label className='text-md font-semibold'>Designation</label>
                        <input type="text" placeholder='Enter the designation' value={formData.designation}
                            className='border border-gray-400 rounded-md px-2 py-1 w-full focus-visible:outline-none'
                            onChange={(e) => setFormData({ ...formData, designation: e.target.value })} required />
                    </div>
                    <div className='w-full flex flex-col gap-2 order-4'>
                        <label className='text-md font-semibold'>Password</label>
                        <input type="password" placeholder='Enter the password' value={formData.password}
                            className='border border-gray-400 rounded-md px-2 py-1 w-full focus-visible:outline-none'
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
                    </div>
                    <div className='w-full flex flex-col gap-2 order-5'>
                        <label className='text-md font-semibold'>Company Access</label>
                        <select value={formData.companyAccess} onChange={(e) => setFormData({ ...formData, companyAccess: e.target.value })}
                            className='px-2 py-1 rounded-md border border-gray-400' required>
                            <option value="">Select a Company</option>
                            <option value="Company Alpha">Company Alpha</option>
                            <option value="Company Beta">Company Beta</option>
                            <option value="Company Gamma">Company Gamma</option>
                            <option value="Company Delta">Company Delta</option>
                        </select>
                    </div>
                    <div className='w-full flex flex-col gap-2 order-6'>
                        <label className='text-md font-semibold'>Module Access</label>
                        <select value={formData.modulesAccess} onChange={(e) => setFormData({ ...formData, modulesAccess: e.target.value })}
                            className='px-2 py-1 rounded-md border border-gray-400' required>
                            <option value="">Select a Module</option>
                            <option value="Compliance Filing">Compliance Filing</option>
                            <option value="Company Master">Company Master</option>
                            <option value="Notification">Notification</option>
                            <option value="Reports">Reports</option>
                        </select>
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

export default UserManagement