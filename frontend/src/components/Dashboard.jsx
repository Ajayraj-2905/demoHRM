import React from 'react'
import { useAuth } from './AuthContext'
import { Link } from 'react-router-dom'

const Dashboard = () => {
    const { logout } = useAuth()
    const handleLogout = () => {
        logout()
    }

    return (
        <div className='p-5 flex flex-col justify-center gap-4'>
            <h1 className='text-2xl'>Welcome to Dashboard</h1>
            <button className='px-4 py-2 bg-yellow-500 rounded-md text-white' onClick={handleLogout}>Logout</button>
            <Link className='mx-5 py-2 w-36 text-center bg-yellow-500 rounded-md text-white' to='/natureOfCompliance'>Nature Of Compliance</Link>
            <Link className='mx-5 py-2 w-36 text-center bg-yellow-500 rounded-md text-white' to='/category'>Category</Link>
            <Link className='mx-5 py-2 w-36 text-center bg-yellow-500 rounded-md text-white' to='/subCategory'>Sub Category</Link>
            <Link className='mx-5 py-2 w-36 text-center bg-yellow-500 rounded-md text-white' to='/userManagement'>User Management</Link>
            <Link className='mx-5 py-2 w-36 text-center bg-yellow-500 rounded-md text-white' to='/compliance'>Compliance</Link>
        </div>
    )
}

export default Dashboard
