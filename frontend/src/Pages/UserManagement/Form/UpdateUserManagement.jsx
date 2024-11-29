import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

const UpdateUserManagement = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: "", email: "", password: "", companyAccess: "", designation: "",
        modulesAccess: "", profilePhoto: null
    })
    const [previewImage, setPreviewImage] = useState(null)

    useEffect(() => {
        if (id) {
            fetch(`https://backend-hrcompliance.onrender.com/api/usermanagement/${id}`)
                .then(response => response.json())
                .then(data => {
                    if (data) {
                        setFormData({
                            username: data.username, email: data.email, password: '', designation: data.designation,
                            companyAccess: data.company_access, modulesAccess: data.module_access, profilePhoto: null
                        })
                        {
                            data.profile_photo ? setPreviewImage(`https://backend-hrcompliance.onrender.com/public/${data.profile_photo}`) :
                                setPreviewImage(null)
                        }
                    } else {
                        alert('NatureOFCompliance not found')
                        navigate('/natureOfComplianceList')
                    }
                })
                .catch(error => console.error('Error fetching :', error))
        }
    }, [id, navigate])

    const handleSubmit = (e) => {
        e.preventDefault()
        Swal.fire({
            title: 'Edit',
            text: "Do you want to edit the user",
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
            const data = new FormData()
            data.append('username', formData.username)
            data.append('email', formData.email)
            data.append('password', formData.password)
            data.append('companyAccess', formData.companyAccess)
            data.append('designation', formData.designation)
            data.append('modulesAccess', formData.modulesAccess)
            {
                formData.profilePhoto ? data.append('image', formData.profilePhoto) :
                    data.append('image', null)
            }
            if (result.isConfirmed) {
                const response = await fetch(`https://backend-hrcompliance.onrender.com/api/usermanagement/upload/${id}`, {
                    method: "PUT",
                    credentials: 'include', 
                    body: data,
                })
                const result = await response.json()
                if (response.ok) {
                    Swal.fire({
                        text: 'Updated Successfully',
                        customClass: {
                            confirmButton: 'bg-customYellow-default'
                        }
                    })
                    setFormData({
                        username: '', email: '', password: '', designation: '', companyAccess: '',
                        modulesAccess: '', profilePhoto: null,
                    })
                    setPreviewImage(null)
                    navigate('/userManagementList')
                } else {
                    Swal.fire({
                        title: result.message || "Failed To Create",
                        icon: "error",
                        confirmButtonText: "Retry"
                    })
                }
            }
        })
    }
    const handleCancel = () => {
        setFormData({
            username: "", email: "", password: "", companyAccess: "", designation: "",
            modulesAccess: "", profilePhoto: ""
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
            <h1 className='text-xl font-semibold'>Edit User</h1>
            <form onSubmit={handleSubmit}>
                <div className='flex justify-center items-center'>
                    <label htmlFor="UserProfile" className="cursor-pointer relative">
                        <div className="w-40 h-40 bg-gray-100 shadow-md rounded-full overflow-hidden flex items-center justify-center">
                            {previewImage ? (
                                <img
                                    src={previewImage}
                                    alt="profile photo"
                                    className="w-full h-full object-cover flex justify-center items-center"
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
                        <div className='h-8 w-8 bg-white border shadow-lg flex justify-center items-center rounded-full absolute top-2 right-2'>
                            <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.67669 2.66969L13.33 6.32304M1 15H4.65334L14.2434 5.40998C14.4833 5.17009 14.6735 4.88531 14.8034 4.57189C14.9332 4.25847 15 3.92255 15 3.5833C15 3.24406 14.9332 2.90814 14.8034 2.59472C14.6735 2.2813 14.4833 1.99651 14.2434 1.75663C14.0035 1.51675 13.7187 1.32647 13.4053 1.19664C13.0919 1.06682 12.7559 1 12.4167 1C12.0775 1 11.7415 1.06682 11.4281 1.19664C11.1147 1.32647 10.8299 1.51675 10.59 1.75663L1 11.3467V15Z" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
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
                            <option value="Company Alpha">Company A</option>
                            <option value="Company Beta">Company B</option>
                            <option value="Company Gamma">Company C</option>
                            <option value="Company Delta">Company C</option>
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

export default UpdateUserManagement