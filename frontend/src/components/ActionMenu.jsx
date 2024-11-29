import React from 'react'

const ActionMenu = ({ onEdit, onDelete, onView }) => {
    return (
        <div className="bg-white absolute overflow-hidden z-10 top-1 -left-20 flex flex-col justify-center shadow-lg border border-gray-200 rounded-md">
            <div className='flex justify-center items-center hover:bg-gray-300 gap-1 px-1.5 py-0.5'>
                <div className='flex justify-center items-center'>
                    <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.67669 2.66969L13.33 6.32304M1 15H4.65334L14.2434 5.40998C14.4833 5.17009 14.6735 4.88531 14.8034 4.57189C14.9332 4.25847 15 3.92255 15 3.5833C15 3.24406 14.9332 2.90814 14.8034 2.59472C14.6735 2.2813 14.4833 1.99651 14.2434 1.75663C14.0035 1.51675 13.7187 1.32647 13.4053 1.19664C13.0919 1.06682 12.7559 1 12.4167 1C12.0775 1 11.7415 1.06682 11.4281 1.19664C11.1147 1.32647 10.8299 1.51675 10.59 1.75663L1 11.3467V15Z" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <button className='w-full text-start rounded-md font-semibold' onClick={onEdit}>Edit</button>
            </div>
            <div className='flex justify-center items-center hover:bg-gray-300 gap-1 px-1.5 py-0.5'>
                <div className='flex justify-center items-center'>
                    <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 4.11111H15M6.25 7.22222V11.8889M9.75 7.22222V11.8889M1.875 4.11111L2.75 13.4444C2.75 13.857 2.93437 14.2527 3.26256 14.5444C3.59075 14.8361 4.03587 15 4.5 15H11.5C11.9641 15 12.4092 14.8361 12.7374 14.5444C13.0656 14.2527 13.25 13.857 13.25 13.4444L14.125 4.11111M5.375 4.11111V1.77778C5.375 1.5715 5.46719 1.37367 5.63128 1.22781C5.79538 1.08194 6.01794 1 6.25 1H9.75C9.98206 1 10.2046 1.08194 10.3687 1.22781C10.5328 1.37367 10.625 1.5715 10.625 1.77778V4.11111" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <button className='w-full text-start rounded-md font-semibold' onClick={onDelete}>Delete</button>
            </div>
            <div className='flex justify-center items-center hover:bg-gray-300 gap-1 px-1.5 py-0.5'>
                <div className='flex justify-center items-center'>
                    <svg width="20" height="20" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.44444 5.99999C6.44444 6.47149 6.60833 6.92367 6.90006 7.25707C7.19178 7.59047 7.58744 7.77777 8 7.77777C8.41256 7.77777 8.80822 7.59047 9.09994 7.25707C9.39167 6.92367 9.55556 6.47149 9.55556 5.99999C9.55556 5.52849 9.39167 5.07631 9.09994 4.74291C8.80822 4.40951 8.41256 4.22221 8 4.22221C7.58744 4.22221 7.19178 4.40951 6.90006 4.74291C6.60833 5.07631 6.44444 5.52849 6.44444 5.99999Z" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M15 5.99999C13.1333 9.55555 10.8 11.3333 8 11.3333C5.2 11.3333 2.86667 9.55555 1 5.99999C2.86667 2.44443 5.2 0.666656 8 0.666656C10.8 0.666656 13.1333 2.44443 15 5.99999Z" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <button className='w-full text-start rounded-md font-semibold' onClick={onView}>View</button>
            </div>
        </div>
    )
}

export default ActionMenu
