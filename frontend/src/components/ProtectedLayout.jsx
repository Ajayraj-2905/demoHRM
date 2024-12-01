import React from 'react'
import Sidebar from '../Navbar/Sidebar'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'

const ProtectedLayout = ({ isSidebarOpen, toggleSidebar }) => {
    return (
        <div className="flex min-h-screen">
            <Sidebar isOpen={isSidebarOpen} closeSidebar={toggleSidebar} />
            {isSidebarOpen && (
                <div className='fixed inset-0 z-30 bg-black opacity-50 md:hidden' onClick={toggleSidebar}></div>
            )}
            <div className={`w-full display-scrollbar bg-slate-50 transition-all duration-300 ease-in ${isSidebarOpen ? 'md:ml-64' : 'md:ml-0'}`}>
                <Navbar toggleSidebar={toggleSidebar} />
                <main className="p-4 w-full rounded-md">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default ProtectedLayout
