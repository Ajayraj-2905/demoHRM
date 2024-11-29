import React from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const UserManagementGrid = ({ user, setData }) => {
    const navigate = useNavigate()

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
        navigate(`/updateUserManagement/${id}`)
    }
    const handleView = (id) => {
        console.log(`View data with ID: ${id}`)
    }

    return (
        <div className="border rounded-lg min-w-64 p-4 pt-10 bg-white flex flex-col items-center border-t-8">
            <div className='h-28 w-28 mb-4 flex justify-center items-center'>{user.profile_photo ? (
                <img
                    src={`https://backend-hrcompliance.onrender.com/public/${user.profile_photo}`}
                    alt={`${user.username}'s profile`}
                    className="w-28 h-28 rounded-full object-cover" />) :
                (<svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.87196 20.371C5.17447 19.3642 5.79348 18.4817 6.63715 17.8544C7.48082 17.2272 8.50422 16.8886 9.55552 16.8889H14.4444C15.4971 16.8885 16.5217 17.2279 17.366 17.8566C18.2103 18.4853 18.8291 19.3697 19.1304 20.3783M1 12C1 13.4445 1.28452 14.8749 1.83733 16.2095C2.39013 17.5441 3.20038 18.7567 4.22183 19.7782C5.24327 20.7996 6.4559 21.6099 7.79048 22.1627C9.12506 22.7155 10.5555 23 12 23C13.4445 23 14.8749 22.7155 16.2095 22.1627C17.5441 21.6099 18.7567 20.7996 19.7782 19.7782C20.7996 18.7567 21.6099 17.5441 22.1627 16.2095C22.7155 14.8749 23 13.4445 23 12C23 10.5555 22.7155 9.12506 22.1627 7.79048C21.6099 6.4559 20.7996 5.24327 19.7782 4.22183C18.7567 3.20038 17.5441 2.39013 16.2095 1.83733C14.8749 1.28452 13.4445 1 12 1C10.5555 1 9.12506 1.28452 7.79048 1.83733C6.4559 2.39013 5.24327 3.20038 4.22183 4.22183C3.20038 5.24327 2.39013 6.4559 1.83733 7.79048C1.28452 9.12506 1 10.5555 1 12ZM8.33333 9.55556C8.33333 10.528 8.71964 11.4606 9.40727 12.1483C10.0949 12.8359 11.0275 13.2222 12 13.2222C12.9725 13.2222 13.9051 12.8359 14.5927 12.1483C15.2804 11.4606 15.6667 10.528 15.6667 9.55556C15.6667 8.58309 15.2804 7.65046 14.5927 6.96283C13.9051 6.2752 12.9725 5.88889 12 5.88889C11.0275 5.88889 10.0949 6.2752 9.40727 6.96283C8.71964 7.65046 8.33333 8.58309 8.33333 9.55556Z" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>)}
            </div>
            <h2 className="text-xl font-semibold">{user.username}</h2>
            <p className="text-md text-gray-600">{user.designation}</p>
            <p className="text-md text-gray-600">Assigned companies - {user.company_access.length}</p>
            <div className='flex w-full justify-center items-center gap-3 mt-4'>
                <div className='flex justify-center items-center bg-customYellow-default p-2 rounded-full cursor-pointer'>
                    <svg width="20" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 15V16C6 16.7956 6.31607 17.5587 6.87868 18.1213C7.44129 18.6839 8.20435 19 9 19C9.79565 19 10.5587 18.6839 11.1213 18.1213C11.6839 17.5587 12 16.7956 12 16V15M7 3C7 2.46957 7.21071 1.96086 7.58579 1.58579C7.96086 1.21071 8.46957 1 9 1C9.53043 1 10.0391 1.21071 10.4142 1.58579C10.7893 1.96086 11 2.46957 11 3C12.1484 3.54303 13.1274 4.38833 13.8321 5.4453C14.5367 6.50227 14.9404 7.73107 15 9V12C15.0753 12.6217 15.2954 13.2171 15.6428 13.7381C15.9902 14.2592 16.4551 14.6914 17 15H1C1.54494 14.6914 2.00981 14.2592 2.35719 13.7381C2.70457 13.2171 2.92474 12.6217 3 12V9C3.05956 7.73107 3.4633 6.50227 4.16795 5.4453C4.8726 4.38833 5.85159 3.54303 7 3Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <div onClick={() => handleView(user.id)} className='flex justify-center items-center bg-customYellow-default p-2 rounded-full cursor-pointer'>
                    <svg width="20" height="20" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 2.55512C1 2.08363 1.1873 1.63144 1.5207 1.29804C1.8541 0.964645 2.30628 0.777344 2.77778 0.777344H15.2222C15.6937 0.777344 16.1459 0.964645 16.4793 1.29804C16.8127 1.63144 17 2.08363 17 2.55512M1 2.55512V11.444C1 11.9155 1.1873 12.3677 1.5207 12.7011C1.8541 13.0345 2.30628 13.2218 2.77778 13.2218H15.2222C15.6937 13.2218 16.1459 13.0345 16.4793 12.7011C16.8127 12.3677 17 11.9155 17 11.444V2.55512M1 2.55512L9 7.88845L17 2.55512" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <div onClick={() => handleEdit(user.id)} className='flex justify-center items-center bg-customYellow-default p-2 rounded-full cursor-pointer'>
                    <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.67669 2.66969L13.33 6.32304M1 15H4.65334L14.2434 5.40998C14.4833 5.17009 14.6735 4.88531 14.8034 4.57189C14.9332 4.25847 15 3.92255 15 3.5833C15 3.24406 14.9332 2.90814 14.8034 2.59472C14.6735 2.2813 14.4833 1.99651 14.2434 1.75663C14.0035 1.51675 13.7187 1.32647 13.4053 1.19664C13.0919 1.06682 12.7559 1 12.4167 1C12.0775 1 11.7415 1.06682 11.4281 1.19664C11.1147 1.32647 10.8299 1.51675 10.59 1.75663L1 11.3467V15Z" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <div onClick={() => handleDelete(user.id)} className='flex justify-center items-center bg-customYellow-default p-2 rounded-full cursor-pointer'>
                    <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 4.11111H15M6.25 7.22222V11.8889M9.75 7.22222V11.8889M1.875 4.11111L2.75 13.4444C2.75 13.857 2.93437 14.2527 3.26256 14.5444C3.59075 14.8361 4.03587 15 4.5 15H11.5C11.9641 15 12.4092 14.8361 12.7374 14.5444C13.0656 14.2527 13.25 13.857 13.25 13.4444L14.125 4.11111M5.375 4.11111V1.77778C5.375 1.5715 5.46719 1.37367 5.63128 1.22781C5.79538 1.08194 6.01794 1 6.25 1H9.75C9.98206 1 10.2046 1.08194 10.3687 1.22781C10.5328 1.37367 10.625 1.5715 10.625 1.77778V4.11111" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default UserManagementGrid