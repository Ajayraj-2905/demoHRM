import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { Link, useNavigate } from 'react-router-dom'
import { CustomStyles } from '../../../components/CustomStyles'
import ActionMenu from '../../../components/ActionMenu'
import Swal from 'sweetalert2'

const NatureOfComplianceList = () => {
    const [data, setData] = useState([])
    const [search, setSearch] = useState('')
    const [selectedRowId, setSelectedRowId] = useState(null)
    const navigate = useNavigate()

    const fetchData = async () => {
        try {
            const response = await fetch('https://backend-hrcompliance.onrender.com/api/natureofcompliance')
            const result = await response.json()
            setData(result)
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }
    useEffect(() => {
        fetchData()
        console.log('Nature list running')
    }, [])

    const toggleMenu = (rowId) => {
        setSelectedRowId(selectedRowId === rowId ? null : rowId)
    }
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Delete',
            text: "Do you want to delete the category",
            imageUrl: '/public/Edit.png',
            imageHeight: 80,
            imageAlt: 'Delete Image',
            confirmButtonText: "Delete",
            showCancelButton: true,
            cancelButtonText: "Cancel",
            customClass: {
                confirmButton: 'w-32 bg-customYellow-default py-1.5 border-solid border-[1px] border-customYellow-default rounded',
                cancelButton: 'w-32 bg-white text-black py-1.5 border-solid border-[1px] border-gray-400 rounded',
                title: 'p-0',
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await fetch(`https://backend-hrcompliance.onrender.com/api/natureofcompliance/${id}`, {
                    method: 'DELETE',
                    credentials: 'include', 
                })
                const data = await response.json()
                if (response.ok) {
                    Swal.fire({
                        text: 'Deleted Successfully',
                        customClass: {
                            confirmButton: 'bg-customYellow-default'
                        }
                    })
                    setData(prevData => prevData.filter(item => item.id !== id))
                } else {
                    Swal.fire({
                        title: data.message || "Failed To Delete",
                        icon: "error",
                        confirmButtonText: "Retry"
                    })
                }
            }
        })
    }
    const handleEdit = (id) => {
        navigate(`/updateNatureOfCompliance/${id}`)
    }
    const handleView = (id) => {
        console.log(`View data with ID: ${id}`)
    }
    const filteredData = data.filter(item =>
        item.id.toString().includes(search) ||
        item.nature_of_compliance.toLowerCase().includes(search.toLowerCase()))

    const columns = [
        {
            name: 'S.NO',
            selector: (row) => row.id,
            sortable: true,
        },
        {
            name: 'Category',
            selector: (row) => row.nature_of_compliance,
            sortable: true,
        },
        {
            name: 'Action',
            cell: (row) => (
                <div className='hover:shadow-md w-8 h-8 rounded-full flex justify-center items-center cursor-pointer'
                    onClick={() => toggleMenu(row.id)}>
                    <svg width="20" height="20" viewBox="0 0 5 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.5 9C1.5 9.23206 1.60536 9.45462 1.79289 9.61872C1.98043 9.78281 2.23478 9.875 2.5 9.875C2.76522 9.875 3.01957 9.78281 3.20711 9.61872C3.39464 9.45462 3.5 9.23206 3.5 9C3.5 8.76794 3.39464 8.54538 3.20711 8.38128C3.01957 8.21719 2.76522 8.125 2.5 8.125C2.23478 8.125 1.98043 8.21719 1.79289 8.38128C1.60536 8.54538 1.5 8.76794 1.5 9Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M1.5 15.125C1.5 15.3571 1.60536 15.5796 1.79289 15.7437C1.98043 15.9078 2.23478 16 2.5 16C2.76522 16 3.01957 15.9078 3.20711 15.7437C3.39464 15.5796 3.5 15.3571 3.5 15.125C3.5 14.8929 3.39464 14.6704 3.20711 14.5063C3.01957 14.3422 2.76522 14.25 2.5 14.25C2.23478 14.25 1.98043 14.3422 1.79289 14.5063C1.60536 14.6704 1.5 14.8929 1.5 15.125Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M1.5 2.875C1.5 3.10706 1.60536 3.32962 1.79289 3.49372C1.98043 3.65781 2.23478 3.75 2.5 3.75C2.76522 3.75 3.01957 3.65781 3.20711 3.49372C3.39464 3.32962 3.5 3.10706 3.5 2.875C3.5 2.64294 3.39464 2.42038 3.20711 2.25628C3.01957 2.09219 2.76522 2 2.5 2C2.23478 2 1.98043 2.09219 1.79289 2.25628C1.60536 2.42038 1.5 2.64294 1.5 2.875Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {selectedRowId === row.id && (
                        <ActionMenu
                            onView={() => handleView(row.id)}
                            onEdit={() => handleEdit(row.id)}
                            onDelete={() => handleDelete(row.id)}
                        />
                    )}
                </div>
            ),
        },
    ]

    return (
        <div className='h-full bg-white p-5 rounded-md shadow-lg'>
            <div className='flex flex-col sm:flex-row justify-between sm:items-center gap-2'>
                <h1 className='text-xl font-semibold'>Nature of Compliance List</h1>
                <div className='flex justify-center items-center gap-4'>
                    <div className='bg-customYellow-default w-10 h-10 rounded-full flex justify-center items-center cursor-pointer'>
                        <svg width="20" height="20" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.10096 12.4503L4.09724 8.44769L4.89821 7.63314L7.5353 10.2702V0.484375H8.66661V10.2702L11.3026 7.63427L12.1047 8.44769L8.10096 12.4503ZM0.181763 16.3228V11.7545H1.31308V15.1914H14.8888V11.7545H16.0201V16.3228H0.181763Z" fill="white" />
                        </svg>
                    </div>
                    <Link to='/natureOfCompliance' className='flex-1 px-4 py-2 text-center bg-customYellow-default text-white rounded'>Create Nature Of Compliance</Link>
                </div>
            </div>
            <div className='flex flex-col gap-5 mt-6'>
                <div className='flex w-full sm:w-[280px] border border-gray-400 bg-white rounded-md ps-2'>
                    <div className='flex justify-center items-center gap-2'>
                        <svg width="20" height="20" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 19.5L13 13.5M1 8.5C1 9.41925 1.18106 10.3295 1.53284 11.1788C1.88463 12.0281 2.40024 12.7997 3.05025 13.4497C3.70026 14.0998 4.47194 14.6154 5.32122 14.9672C6.1705 15.3189 7.08075 15.5 8 15.5C8.91925 15.5 9.82951 15.3189 10.6788 14.9672C11.5281 14.6154 12.2997 14.0998 12.9497 13.4497C13.5998 12.7997 14.1154 12.0281 14.4672 11.1788C14.8189 10.3295 15 9.41925 15 8.5C15 7.58075 14.8189 6.6705 14.4672 5.82122C14.1154 4.97194 13.5998 4.20026 12.9497 3.55025C12.2997 2.90024 11.5281 2.38463 10.6788 2.03284C9.82951 1.68106 8.91925 1.5 8 1.5C7.08075 1.5 6.1705 1.68106 5.32122 2.03284C4.47194 2.38463 3.70026 2.90024 3.05025 3.55025C2.40024 4.20026 1.88463 4.97194 1.53284 5.82122C1.18106 6.6705 1 7.58075 1 8.5Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <input type="text" placeholder='Search' value={search} onChange={(e) => setSearch(e.target.value)}
                        className='w-full bg-transparent px-2 py-1 focus-visible:outline-none' />
                </div>
            </div>
            <div className='rounded-md mt-5'>
                <DataTable
                    className='pb-10'
                    columns={columns}
                    data={filteredData}
                    customStyles={CustomStyles}
                    selectableRows
                />
            </div>
            {/* <Link className='mx-5 mb-10 py-2 w-36 text-center bg-yellow-500 rounded-md text-white' to='/dashboard'>Dashboard</Link> */}
        </div>
    )
}

export default NatureOfComplianceList