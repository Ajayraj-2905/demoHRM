import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const NatureOfCompliance = () => {
    const [compliance, setCompliance] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault()
        const response = await fetch('http://localhost:5000/api/natureofcompliance', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ compliance }),
        })
        const data = await response.json();
        if (response.ok) {
            Swal.fire({
                text: "Compliance Saved Successfully!",
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
                    setCompliance('')
                    navigate('/natureOfComplianceList')
                } else {
                    setCompliance('')
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
        setCompliance('')
        navigate('/natureOfComplianceList')
    }

    return (
        <div className='h-full bg-white p-5 rounded-md shadow-lg'>
            <div className='flex flex-col sm:flex-row justify-between sm:items-center gap-2'>
                <h1 className='text-xl font-semibold'>Create Nature of Compliance</h1>
                <Link to='/natureOfComplianceList' className='px-4 py-2 text-center bg-customYellow-default text-white rounded'>Nature Of Compliance List</Link>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='flex flex-wrap justify-between mt-6 h-[400px]'>
                    <div className='w-full sm:max-w-[600px] flex flex-col gap-2'>
                        <label className='text-md font-semibold'>Nature Of Compliance</label>
                        <input type="text" placeholder='Enter nature of compliance' value={compliance}
                            className='border border-gray-400 rounded-md px-2 py-1 w-full focus-visible:outline-none'
                            onChange={(e) => setCompliance(e.target.value)} required />
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

export default NatureOfCompliance
