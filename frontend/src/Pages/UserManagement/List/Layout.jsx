import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import UserManagementList from './UserManagementList'
import UserManagementGrid from './UserManagementGrid'

const Layout = () => {
    const [data, setData] = useState([])
    const [view, setView] = useState('grid')
    const [search, setSearch] = useState('')
    const [filteredUser, setFilteredUser] = useState({
        designation: '', companyAccess: '', moduleAccess: ''
    })

    const fetchUsers = async () => {
        try {
            const response = await fetch('https://backend-hrcompliance.onrender.com/api/usermanagement')
            if (response.ok) {
                const data = await response.json()
                setData(data)
            }
        } catch (error) {
            console.error('Error:', error)
        }
    }
    useEffect(() => {
        fetchUsers()
        console.log('User list running')
    }, [])

    const filteredData = data.filter((user) => {
        const matchesSearch = search === "" ||
            user.username.toLowerCase().includes(search.toLowerCase()) ||
            user.designation.toLowerCase().includes(search.toLowerCase()) ||
            user.company_access.toLowerCase().includes(search.toLowerCase()) ||
            user.module_access.toLowerCase().includes(search.toLowerCase())
        const matchesSelect =
            (filteredUser.companyAccess === "" || user.company_access === filteredUser.companyAccess) &&
            (filteredUser.designation === "" || user.designation === filteredUser.designation) &&
            (filteredUser.moduleAccess === "" || user.module_access === filteredUser.moduleAccess)

        return matchesSearch && matchesSelect
    })

    return (
        <div className='h-full bg-white p-5 rounded-md shadow-lg'>
            <div className='flex flex-col sm:flex-row justify-between sm:items-center gap-2'>
                <h1 className='text-xl font-semibold'>User Management({filteredData.length})</h1>
                <div className='flex justify-center items-center gap-4'>
                    <div className='bg-customYellow-default w-10 h-10 rounded-full flex justify-center items-center cursor-pointer'>
                        <svg width="20" height="20" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.10096 12.4503L4.09724 8.44769L4.89821 7.63314L7.5353 10.2702V0.484375H8.66661V10.2702L11.3026 7.63427L12.1047 8.44769L8.10096 12.4503ZM0.181763 16.3228V11.7545H1.31308V15.1914H14.8888V11.7545H16.0201V16.3228H0.181763Z" fill="white" />
                        </svg>
                    </div>
                    <Link to='/userManagement' className='flex-1 px-4 py-2 text-center bg-customYellow-default text-white rounded'>Add User</Link>
                </div>
            </div>
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between flex-wrap gap-5 mt-6'>
                <div className='flex flex-col sm:flex-row sm:items-center flex-wrap gap-5'>
                    <select
                        value={filteredUser.companyAccess} onChange={(e) => setFilteredUser({ ...filteredUser, companyAccess: e.target.value })}
                        className='w-full sm:w-[250px] px-2 py-1 rounded-md border border-gray-400' required>
                        <option value="">Company</option>
                        {[...new Set(data.map((item) => item.company_access))].map((company, index) => (
                            <option key={index} value={company}>
                                {company}
                            </option>
                        ))}
                    </select>
                    <select
                        value={filteredUser.designation} onChange={(e) => setFilteredUser({ ...filteredUser, designation: e.target.value })}
                        className='w-full sm:w-[250px] px-2 py-1 rounded-md border border-gray-400' required>
                        <option value="">Designation</option>
                        {[...new Set(data.map((item) => item.designation))].map((designation, index) => (
                            <option key={index} value={designation}>
                                {designation}
                            </option>
                        ))}
                    </select>
                    <select
                        value={filteredUser.moduleAccess} onChange={(e) => setFilteredUser({ ...filteredUser, moduleAccess: e.target.value })}
                        className='w-full sm:w-[250px] px-2 py-1 rounded-md border border-gray-400' required>
                        <option value="">Modules</option>
                        {[...new Set(data.map((item) => item.module_access))].map((module, index) => (
                            <option key={index} value={module}>
                                {module}
                            </option>
                        ))}
                    </select>
                    <div className='w-full sm:w-[250px] flex border border-gray-400 bg-white rounded-md ps-2'>
                        <div className='flex justify-center items-center'>
                            <svg width="20" height="20" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19 19.5L13 13.5M1 8.5C1 9.41925 1.18106 10.3295 1.53284 11.1788C1.88463 12.0281 2.40024 12.7997 3.05025 13.4497C3.70026 14.0998 4.47194 14.6154 5.32122 14.9672C6.1705 15.3189 7.08075 15.5 8 15.5C8.91925 15.5 9.82951 15.3189 10.6788 14.9672C11.5281 14.6154 12.2997 14.0998 12.9497 13.4497C13.5998 12.7997 14.1154 12.0281 14.4672 11.1788C14.8189 10.3295 15 9.41925 15 8.5C15 7.58075 14.8189 6.6705 14.4672 5.82122C14.1154 4.97194 13.5998 4.20026 12.9497 3.55025C12.2997 2.90024 11.5281 2.38463 10.6788 2.03284C9.82951 1.68106 8.91925 1.5 8 1.5C7.08075 1.5 6.1705 1.68106 5.32122 2.03284C4.47194 2.38463 3.70026 2.90024 3.05025 3.55025C2.40024 4.20026 1.88463 4.97194 1.53284 5.82122C1.18106 6.6705 1 7.58075 1 8.5Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <input type="text" placeholder='Search'
                            value={search} onChange={(e) => setSearch(e.target.value)}
                            className='w-full bg-transparent px-2 py-1 focus-visible:outline-none' />
                    </div>
                </div>
                <div className='flex items-center gap-2'>
                    <div onClick={() => setView('grid')} className={`${view === 'grid' ? 'bg-black border border-black' : 'bg-white border border-gray-400'} w-8 h-8 rounded flex justify-center items-center cursor-pointer`}>
                        <svg width="20" height="20" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1.5C1 1.23478 1.10536 0.98043 1.29289 0.792893C1.48043 0.605357 1.73478 0.5 2 0.5H6C6.26522 0.5 6.51957 0.605357 6.70711 0.792893C6.89464 0.98043 7 1.23478 7 1.5V5.5C7 5.76522 6.89464 6.01957 6.70711 6.20711C6.51957 6.39464 6.26522 6.5 6 6.5H2C1.73478 6.5 1.48043 6.39464 1.29289 6.20711C1.10536 6.01957 1 5.76522 1 5.5V1.5Z" stroke={`${view === 'grid' ? 'white' : 'black'}`} strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M11 1.5C11 1.23478 11.1054 0.98043 11.2929 0.792893C11.4804 0.605357 11.7348 0.5 12 0.5H16C16.2652 0.5 16.5196 0.605357 16.7071 0.792893C16.8946 0.98043 17 1.23478 17 1.5V5.5C17 5.76522 16.8946 6.01957 16.7071 6.20711C16.5196 6.39464 16.2652 6.5 16 6.5H12C11.7348 6.5 11.4804 6.39464 11.2929 6.20711C11.1054 6.01957 11 5.76522 11 5.5V1.5Z" stroke={`${view === 'grid' ? 'white' : 'black'}`} strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M1 11.5C1 11.2348 1.10536 10.9804 1.29289 10.7929C1.48043 10.6054 1.73478 10.5 2 10.5H6C6.26522 10.5 6.51957 10.6054 6.70711 10.7929C6.89464 10.9804 7 11.2348 7 11.5V15.5C7 15.7652 6.89464 16.0196 6.70711 16.2071C6.51957 16.3946 6.26522 16.5 6 16.5H2C1.73478 16.5 1.48043 16.3946 1.29289 16.2071C1.10536 16.0196 1 15.7652 1 15.5V11.5Z" stroke={`${view === 'grid' ? 'white' : 'black'}`} strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M11 11.5C11 11.2348 11.1054 10.9804 11.2929 10.7929C11.4804 10.6054 11.7348 10.5 12 10.5H16C16.2652 10.5 16.5196 10.6054 16.7071 10.7929C16.8946 10.9804 17 11.2348 17 11.5V15.5C17 15.7652 16.8946 16.0196 16.7071 16.2071C16.5196 16.3946 16.2652 16.5 16 16.5H12C11.7348 16.5 11.4804 16.3946 11.2929 16.2071C11.1054 16.0196 11 15.7652 11 15.5V11.5Z" stroke={`${view === 'grid' ? 'white' : 'black'}`} strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <div onClick={() => setView('list')} className={`${view === 'list' ? 'bg-black border border-black' : 'bg-white border border-gray-400'} w-8 h-8 rounded flex justify-center items-center cursor-pointer`}>
                        <svg width="20" height="20" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 1H16M5 7H16M5 13H16M1 1V1.01M1 7V7.01M1 13V13.01" stroke={`${view === 'list' ? 'white' : 'black'}`} strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>
            </div>
            <div className='w-full rounded-md min-h-[200px] sm:min-h-[300px] mt-5'>
                {view === 'grid' ?
                    (filteredData.length === 0 ? (<div className='bg-white text-center py-6'>There are no records to display</div>) :
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center gap-6">
                            {filteredData.map((user) => (<UserManagementGrid key={user.id} user={user} setData={setData} />))}
                        </div>
                    ) :
                    (<UserManagementList data={filteredData} setData={setData} />)}
            </div>
            {/* <Link className='mx-5 mb-10 py-2 w-36 text-center bg-yellow-500 rounded-md text-white' to='/dashboard'>Dashboard</Link> */}
        </div>
    )
}

export default Layout