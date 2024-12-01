import React, { useState } from 'react'
import CompanyLogo from '../assets/Companylogo.png'
import { Link } from 'react-router-dom'

const Sidebar = ({ isOpen, closeSidebar }) => {
    const [isComplianceOpen, setIsComplianceOpen] = useState(false)
    const [isReportOpen, setIsReportOpen] = useState(false)
    const toggleComplianceMaster = () => {
        setIsComplianceOpen(!isComplianceOpen)
    }
    const toggleReport = () => {
        setIsReportOpen(!isReportOpen)
    }
    return (
        <aside
            className={`fixed z-40 top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in
                ${isOpen ? 'translate-x-0' : '-translate-x-full'} overflow-y-scroll no-scrollbar`}>
            <div className='flex items-center gap-2 ps-3 py-3'>
                <img src={CompanyLogo} alt="Company Logo" width={45} />
                <span className='font-semibold'>ENCOMPLIANCE HR</span>
                <span className='px-1 ms-1 text-center md:hidden hover:bg-slate-200 rounded cursor-pointer' onClick={closeSidebar}>X</span>
            </div>
            <nav className="flex flex-col py-4 gap-4">
                <Link to='/dashboard' className='ps-4 py-2 flex items-center gap-2 hover:bg-customYellow-default hover:border-e-4 hover:border-black'>
                    <div className='flex items-center gap-2'>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.62726 1.00759C7.69033 1.45647 5.9088 2.41521 4.46747 3.78437C3.02613 5.15354 1.97749 6.88326 1.43031 8.79412C0.883122 10.705 0.857326 12.7274 1.35559 14.6516C1.85386 16.5758 2.85804 18.3317 4.26399 19.7371C5.66993 21.1426 7.42642 22.1464 9.35128 22.6445C11.2761 23.1426 13.2993 23.1168 15.2108 22.5698C17.1223 22.0228 18.8526 20.9746 20.2223 19.5337C21.5919 18.0929 22.551 16.312 23 14.3757C23 14.0474 22.8695 13.7326 22.6373 13.5005C22.4051 13.2683 22.0902 13.1379 21.7618 13.1379H13.3419C12.6851 13.1379 12.0552 12.8771 11.5908 12.4128C11.1264 11.9486 10.8655 11.3189 10.8655 10.6623V1.99783C10.8501 1.85118 10.8057 1.70904 10.735 1.57966C10.6642 1.45028 10.5685 1.33623 10.4533 1.24411C10.3381 1.152 10.2058 1.08366 10.064 1.04306C9.92221 1.00246 9.77376 0.990407 9.62726 1.00759Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M15.8175 1.37956C17.3897 1.93295 18.8177 2.83185 19.9963 4.01006C21.1749 5.18826 22.0741 6.61575 22.6277 8.1874H17.0557C16.7273 8.1874 16.4124 8.05699 16.1802 7.82486C15.9479 7.59273 15.8175 7.27789 15.8175 6.94961V1.37956Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg><span>Dashboard</span>
                    </div>
                </Link>
                <div>
                    <div className='ps-4 py-2 pe-4 hover:pe-3 flex justify-between items-center gap-2 hover:bg-customYellow-default hover:border-e-4 hover:border-black cursor-pointer' onClick={toggleComplianceMaster}>
                        <div className='flex items-center gap-2'>
                            <svg width="20" height="20" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.23529 3.31579H3.11765C2.55601 3.31579 2.01738 3.55977 1.62024 3.99407C1.22311 4.42836 1 5.01739 1 5.63158V19.5263C1 20.1405 1.22311 20.7295 1.62024 21.1638C2.01738 21.5981 2.55601 21.8421 3.11765 21.8421H9.14977M5.23529 3.31579C5.23529 2.7016 5.4584 2.11257 5.85554 1.67828C6.25268 1.24398 6.79131 1 7.35294 1H9.47059C10.0322 1 10.5709 1.24398 10.968 1.67828C11.3651 2.11257 11.5882 2.7016 11.5882 3.31579M5.23529 3.31579C5.23529 3.92998 5.4584 4.51901 5.85554 4.9533C6.25268 5.38759 6.79131 5.63158 7.35294 5.63158H9.47059C10.0322 5.63158 10.5709 5.38759 10.968 4.9533C11.3651 4.51901 11.5882 3.92998 11.5882 3.31579M15.8235 11.4211V5.63158C15.8235 5.01739 15.6004 4.42836 15.2033 3.99407C14.8061 3.55977 14.2675 3.31579 13.7059 3.31579H11.5882M5.23529 10.2632H9.47059M5.23529 14.8947H8.41177M16.3529 20.1053L19 23M11.5882 17.7895C11.5882 18.5572 11.8671 19.2935 12.3635 19.8364C12.86 20.3792 13.5333 20.6842 14.2353 20.6842C14.9373 20.6842 15.6106 20.3792 16.107 19.8364C16.6035 19.2935 16.8824 18.5572 16.8824 17.7895C16.8824 17.0217 16.6035 16.2855 16.107 15.7426C15.6106 15.1997 14.9373 14.8947 14.2353 14.8947C13.5333 14.8947 12.86 15.1997 12.3635 15.7426C11.8671 16.2855 11.5882 17.0217 11.5882 17.7895Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg><span>Compliance Master</span>
                        </div>
                        {isComplianceOpen ? (
                            <svg width="15" height="15" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M0.410582 0.909788C0.736018 0.584351 1.26366 0.584351 1.58909 0.909788L5.99984 5.32053L10.4106 0.909788C10.736 0.584351 11.2637 0.584351 11.5891 0.909788C11.9145 1.23522 11.9145 1.76286 11.5891 2.0883L6.58909 7.0883C6.26366 7.41374 5.73602 7.41374 5.41058 7.0883L0.410582 2.0883C0.0851447 1.76286 0.0851447 1.23522 0.410582 0.909788Z" fill="black" />
                            </svg>) : (
                            <svg width="15" height="15" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.94 0L0 0.94L3.05333 4L0 7.06L0.94 8L4.94 4L0.94 0Z" fill="black" />
                            </svg>)}
                    </div>
                    {isComplianceOpen && (
                        <ul className='flex flex-col gap-1 mt-3'>
                            <Link to='/compliance' className='ps-12 py-2 pe-4 hover:pe-3 flex justify-between items-center hover:bg-customYellow-default hover:border-e-4 hover:border-black'>
                                Compliance
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.875 15C7.875 15.2984 7.99353 15.5845 8.2045 15.7955C8.41548 16.0065 8.70163 16.125 9 16.125C9.29837 16.125 9.58452 16.0065 9.7955 15.7955C10.0065 15.5845 10.125 15.2984 10.125 15V10.125H15C15.2984 10.125 15.5845 10.0065 15.7955 9.7955C16.0065 9.58452 16.125 9.29837 16.125 9C16.125 8.70163 16.0065 8.41548 15.7955 8.2045C15.5845 7.99353 15.2984 7.875 15 7.875H10.125V3C10.125 2.70163 10.0065 2.41548 9.7955 2.2045C9.58452 1.99353 9.29837 1.875 9 1.875C8.70163 1.875 8.41548 1.99353 8.2045 2.2045C7.99353 2.41548 7.875 2.70163 7.875 3V7.875H3C2.70163 7.875 2.41548 7.99353 2.2045 8.2045C1.99353 8.41548 1.875 8.70163 1.875 9C1.875 9.29837 1.99353 9.58452 2.2045 9.7955C2.41548 10.0065 2.70163 10.125 3 10.125H7.875V15Z" fill="black" />
                                </svg>
                            </Link>
                            <Link to='/natureOfComplianceList' className='ps-12 py-2 pe-4 hover:pe-3 flex justify-between items-center hover:bg-customYellow-default hover:border-e-4 hover:border-black'>
                                NatureOfComp..
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.875 15C7.875 15.2984 7.99353 15.5845 8.2045 15.7955C8.41548 16.0065 8.70163 16.125 9 16.125C9.29837 16.125 9.58452 16.0065 9.7955 15.7955C10.0065 15.5845 10.125 15.2984 10.125 15V10.125H15C15.2984 10.125 15.5845 10.0065 15.7955 9.7955C16.0065 9.58452 16.125 9.29837 16.125 9C16.125 8.70163 16.0065 8.41548 15.7955 8.2045C15.5845 7.99353 15.2984 7.875 15 7.875H10.125V3C10.125 2.70163 10.0065 2.41548 9.7955 2.2045C9.58452 1.99353 9.29837 1.875 9 1.875C8.70163 1.875 8.41548 1.99353 8.2045 2.2045C7.99353 2.41548 7.875 2.70163 7.875 3V7.875H3C2.70163 7.875 2.41548 7.99353 2.2045 8.2045C1.99353 8.41548 1.875 8.70163 1.875 9C1.875 9.29837 1.99353 9.58452 2.2045 9.7955C2.41548 10.0065 2.70163 10.125 3 10.125H7.875V15Z" fill="black" />
                                </svg>
                            </Link>
                            <Link to='/categoryList' className='ps-12 py-2 pe-4 hover:pe-3 flex justify-between items-center hover:bg-customYellow-default hover:border-e-4 hover:border-black'>
                                Category
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.875 15C7.875 15.2984 7.99353 15.5845 8.2045 15.7955C8.41548 16.0065 8.70163 16.125 9 16.125C9.29837 16.125 9.58452 16.0065 9.7955 15.7955C10.0065 15.5845 10.125 15.2984 10.125 15V10.125H15C15.2984 10.125 15.5845 10.0065 15.7955 9.7955C16.0065 9.58452 16.125 9.29837 16.125 9C16.125 8.70163 16.0065 8.41548 15.7955 8.2045C15.5845 7.99353 15.2984 7.875 15 7.875H10.125V3C10.125 2.70163 10.0065 2.41548 9.7955 2.2045C9.58452 1.99353 9.29837 1.875 9 1.875C8.70163 1.875 8.41548 1.99353 8.2045 2.2045C7.99353 2.41548 7.875 2.70163 7.875 3V7.875H3C2.70163 7.875 2.41548 7.99353 2.2045 8.2045C1.99353 8.41548 1.875 8.70163 1.875 9C1.875 9.29837 1.99353 9.58452 2.2045 9.7955C2.41548 10.0065 2.70163 10.125 3 10.125H7.875V15Z" fill="black" />
                                </svg>
                            </Link>
                            <Link to='/SubCategoryList' className='ps-12 py-2 pe-4 hover:pe-3 flex justify-between items-center hover:bg-customYellow-default hover:border-e-4 hover:border-black'>
                                Sub-Category
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.875 15C7.875 15.2984 7.99353 15.5845 8.2045 15.7955C8.41548 16.0065 8.70163 16.125 9 16.125C9.29837 16.125 9.58452 16.0065 9.7955 15.7955C10.0065 15.5845 10.125 15.2984 10.125 15V10.125H15C15.2984 10.125 15.5845 10.0065 15.7955 9.7955C16.0065 9.58452 16.125 9.29837 16.125 9C16.125 8.70163 16.0065 8.41548 15.7955 8.2045C15.5845 7.99353 15.2984 7.875 15 7.875H10.125V3C10.125 2.70163 10.0065 2.41548 9.7955 2.2045C9.58452 1.99353 9.29837 1.875 9 1.875C8.70163 1.875 8.41548 1.99353 8.2045 2.2045C7.99353 2.41548 7.875 2.70163 7.875 3V7.875H3C2.70163 7.875 2.41548 7.99353 2.2045 8.2045C1.99353 8.41548 1.875 8.70163 1.875 9C1.875 9.29837 1.99353 9.58452 2.2045 9.7955C2.41548 10.0065 2.70163 10.125 3 10.125H7.875V15Z" fill="black" />
                                </svg>
                            </Link>
                        </ul>
                    )}
                </div>
                <Link className='ps-4 py-2 flex items-center gap-2 hover:bg-customYellow-default hover:border-e-4 hover:border-black'>
                    <div className='flex items-center gap-2'>
                        <svg width="20" height="20" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 21H21M3.22222 21V5.44444L12.1111 1V21M18.7778 21V9.88889L12.1111 5.44444M7.66667 7.66667V7.67778M7.66667 11V11.0111M7.66667 14.3333V14.3444M7.66667 17.6667V17.6778" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg><span>Company Master</span>
                    </div>
                </Link>
                <Link className='ps-4 py-2 flex items-center gap-2 hover:bg-customYellow-default hover:border-e-4 hover:border-black'>
                    <div className='flex items-center gap-2'>
                        <svg width="20" height="20" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 21H21M3.22222 21V5.44444L12.1111 1V21M18.7778 21V9.88889L12.1111 5.44444M7.66667 7.66667V7.67778M7.66667 11V11.0111M7.66667 14.3333V14.3444M7.66667 17.6667V17.6778" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg><span>Compliance Filing</span>
                    </div>
                </Link>
                <Link to='/userManagementList' className='ps-4 py-2 flex items-center gap-2 hover:bg-customYellow-default hover:border-e-4 hover:border-black'>
                    <div className='flex items-center gap-2'>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.87196 20.371C5.17447 19.3642 5.79348 18.4817 6.63715 17.8544C7.48082 17.2272 8.50422 16.8886 9.55552 16.8889H14.4444C15.4971 16.8885 16.5217 17.2279 17.366 17.8566C18.2103 18.4853 18.8291 19.3697 19.1304 20.3783M1 12C1 13.4445 1.28452 14.8749 1.83733 16.2095C2.39013 17.5441 3.20038 18.7567 4.22183 19.7782C5.24327 20.7996 6.4559 21.6099 7.79048 22.1627C9.12506 22.7155 10.5555 23 12 23C13.4445 23 14.8749 22.7155 16.2095 22.1627C17.5441 21.6099 18.7567 20.7996 19.7782 19.7782C20.7996 18.7567 21.6099 17.5441 22.1627 16.2095C22.7155 14.8749 23 13.4445 23 12C23 10.5555 22.7155 9.12506 22.1627 7.79048C21.6099 6.4559 20.7996 5.24327 19.7782 4.22183C18.7567 3.20038 17.5441 2.39013 16.2095 1.83733C14.8749 1.28452 13.4445 1 12 1C10.5555 1 9.12506 1.28452 7.79048 1.83733C6.4559 2.39013 5.24327 3.20038 4.22183 4.22183C3.20038 5.24327 2.39013 6.4559 1.83733 7.79048C1.28452 9.12506 1 10.5555 1 12ZM8.33333 9.55556C8.33333 10.528 8.71964 11.4606 9.40727 12.1483C10.0949 12.8359 11.0275 13.2222 12 13.2222C12.9725 13.2222 13.9051 12.8359 14.5927 12.1483C15.2804 11.4606 15.6667 10.528 15.6667 9.55556C15.6667 8.58309 15.2804 7.65046 14.5927 6.96283C13.9051 6.2752 12.9725 5.88889 12 5.88889C11.0275 5.88889 10.0949 6.2752 9.40727 6.96283C8.71964 7.65046 8.33333 8.58309 8.33333 9.55556Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg><span>User Management</span>
                    </div>
                </Link>
                <div>
                    <div className='ps-4 py-2 pe-4 hover:pe-3 flex justify-between items-center gap-2 hover:bg-customYellow-default hover:border-e-4 hover:border-black cursor-pointer' onClick={toggleReport}>
                        <div className='flex items-center gap-2'>
                            <svg width="20" height="20" viewBox="0 0 19 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.85714 3.44444H3.42857C2.78447 3.44444 2.16676 3.70198 1.71131 4.16041C1.25587 4.61883 1 5.24058 1 5.88889V20.5556C1 21.2039 1.25587 21.8256 1.71131 22.284C2.16676 22.7425 2.78447 23 3.42857 23H15.5714C16.2155 23 16.8332 22.7425 17.2887 22.284C17.7441 21.8256 18 21.2039 18 20.5556V5.88889C18 5.24058 17.7441 4.61883 17.2887 4.16041C16.8332 3.70198 16.2155 3.44444 15.5714 3.44444H13.1429M5.85714 3.44444C5.85714 2.79614 6.11301 2.17438 6.56846 1.71596C7.0239 1.25754 7.64162 1 8.28571 1H10.7143C11.3584 1 11.9761 1.25754 12.4315 1.71596C12.887 2.17438 13.1429 2.79614 13.1429 3.44444M5.85714 3.44444C5.85714 4.09275 6.11301 4.71451 6.56846 5.17293C7.0239 5.63135 7.64162 5.88889 8.28571 5.88889H10.7143C11.3584 5.88889 11.9761 5.63135 12.4315 5.17293C12.887 4.71451 13.1429 4.09275 13.1429 3.44444M5.85714 18.1111V12M9.5 18.1111V16.8889M13.1429 18.1111V14.4444" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg><span>Reports</span>
                        </div>
                        {isReportOpen ? (
                            <svg width="15" height="15" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M0.410582 0.909788C0.736018 0.584351 1.26366 0.584351 1.58909 0.909788L5.99984 5.32053L10.4106 0.909788C10.736 0.584351 11.2637 0.584351 11.5891 0.909788C11.9145 1.23522 11.9145 1.76286 11.5891 2.0883L6.58909 7.0883C6.26366 7.41374 5.73602 7.41374 5.41058 7.0883L0.410582 2.0883C0.0851447 1.76286 0.0851447 1.23522 0.410582 0.909788Z" fill="black" />
                            </svg>) : (
                            <svg width="15" height="15" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.94 0L0 0.94L3.05333 4L0 7.06L0.94 8L4.94 4L0.94 0Z" fill="black" />
                            </svg>)}
                    </div>
                    {isReportOpen && (
                        <ul className='flex flex-col gap-1 mt-3'>
                            <Link className='ps-12 py-2 pe-4 hover:pe-3 flex justify-between items-center hover:bg-customYellow-default hover:border-e-4 hover:border-black'>
                                Compliance Report
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.875 15C7.875 15.2984 7.99353 15.5845 8.2045 15.7955C8.41548 16.0065 8.70163 16.125 9 16.125C9.29837 16.125 9.58452 16.0065 9.7955 15.7955C10.0065 15.5845 10.125 15.2984 10.125 15V10.125H15C15.2984 10.125 15.5845 10.0065 15.7955 9.7955C16.0065 9.58452 16.125 9.29837 16.125 9C16.125 8.70163 16.0065 8.41548 15.7955 8.2045C15.5845 7.99353 15.2984 7.875 15 7.875H10.125V3C10.125 2.70163 10.0065 2.41548 9.7955 2.2045C9.58452 1.99353 9.29837 1.875 9 1.875C8.70163 1.875 8.41548 1.99353 8.2045 2.2045C7.99353 2.41548 7.875 2.70163 7.875 3V7.875H3C2.70163 7.875 2.41548 7.99353 2.2045 8.2045C1.99353 8.41548 1.875 8.70163 1.875 9C1.875 9.29837 1.99353 9.58452 2.2045 9.7955C2.41548 10.0065 2.70163 10.125 3 10.125H7.875V15Z" fill="black" />
                                </svg>
                            </Link>
                            <Link className='ps-12 py-2 pe-4 hover:pe-3 flex justify-between items-center hover:bg-customYellow-default hover:border-e-4 hover:border-black'>
                                Company Report
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.875 15C7.875 15.2984 7.99353 15.5845 8.2045 15.7955C8.41548 16.0065 8.70163 16.125 9 16.125C9.29837 16.125 9.58452 16.0065 9.7955 15.7955C10.0065 15.5845 10.125 15.2984 10.125 15V10.125H15C15.2984 10.125 15.5845 10.0065 15.7955 9.7955C16.0065 9.58452 16.125 9.29837 16.125 9C16.125 8.70163 16.0065 8.41548 15.7955 8.2045C15.5845 7.99353 15.2984 7.875 15 7.875H10.125V3C10.125 2.70163 10.0065 2.41548 9.7955 2.2045C9.58452 1.99353 9.29837 1.875 9 1.875C8.70163 1.875 8.41548 1.99353 8.2045 2.2045C7.99353 2.41548 7.875 2.70163 7.875 3V7.875H3C2.70163 7.875 2.41548 7.99353 2.2045 8.2045C1.99353 8.41548 1.875 8.70163 1.875 9C1.875 9.29837 1.99353 9.58452 2.2045 9.7955C2.41548 10.0065 2.70163 10.125 3 10.125H7.875V15Z" fill="black" />
                                </svg>
                            </Link>
                        </ul>
                    )}
                </div>
                <Link className='ps-4 py-2 flex items-center gap-2 hover:bg-customYellow-default hover:border-e-4 hover:border-black'>
                    <div className='flex items-center gap-2'>
                        <svg width="20" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 15V16C6 16.7956 6.31607 17.5587 6.87868 18.1213C7.44129 18.6839 8.20435 19 9 19C9.79565 19 10.5587 18.6839 11.1213 18.1213C11.6839 17.5587 12 16.7956 12 16V15M7 3C7 2.46957 7.21071 1.96086 7.58579 1.58579C7.96086 1.21071 8.46957 1 9 1C9.53043 1 10.0391 1.21071 10.4142 1.58579C10.7893 1.96086 11 2.46957 11 3C12.1484 3.54303 13.1274 4.38833 13.8321 5.4453C14.5367 6.50227 14.9404 7.73107 15 9V12C15.0753 12.6217 15.2954 13.2171 15.6428 13.7381C15.9902 14.2592 16.4551 14.6914 17 15H1C1.54494 14.6914 2.00981 14.2592 2.35719 13.7381C2.70457 13.2171 2.92474 12.6217 3 12V9C3.05956 7.73107 3.4633 6.50227 4.16795 5.4453C4.8726 4.38833 5.85159 3.54303 7 3Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg><span>Notification</span>
                    </div>
                </Link>
            </nav>
        </aside >
    )
}

export default Sidebar
