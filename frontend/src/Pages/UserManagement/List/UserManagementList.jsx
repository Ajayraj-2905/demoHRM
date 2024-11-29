import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { CustomStyles } from '../../../components/CustomStyles'
import ActionMenu from '../../../components/ActionMenu'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const UserManagementList = ({ data, setData }) => {
    const navigate = useNavigate()
    const [selectedRowId, setSelectedRowId] = useState(null)
    const toggleMenu = (rowId) => {
        setSelectedRowId(selectedRowId === rowId ? null : rowId)
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Delete',
            text: "Do you want to delete the user",
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
                const response = await fetch(`https://backend-hrcompliance.onrender.com/api/usermanagement/${id}`, {
                    method: 'DELETE',
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
        navigate(`/updateUserManagement/${id}`)
    }
    const handleView = (id) => {
        console.log(`View data with ID: ${id}`)
    }

    const columns = [
        {
            name: 'S.NO',
            selector: (row) => row.id,
            sortable: true,
        },
        {
            name: 'User',
            cell: (row) => (
                <div className='flex justify-center items-center gap-2'>
                    <div className='w-10 h-10 flex justify-center items-center text-xl text-white font-bold bg-purple-400 rounded-full'>
                        {row.username[0]}
                    </div>
                    {row.username}
                </div>
            ),
            sortable: true,
        },
        {
            name: 'Designation',
            selector: (row) => row.designation,
            sortable: true,
        },
        {
            name: 'Company',
            selector: (row) => row.company_access,
            sortable: true,
        },
        {
            name: 'Modules',
            selector: (row) => row.module_access,
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
        <div className='rounded-md mt-5'>
            <DataTable
                className='pb-10'
                columns={columns}
                data={data}
                customStyles={CustomStyles}
                selectableRows
                responsive
            />
        </div>
    )
}

export default UserManagementList