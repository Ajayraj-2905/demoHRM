import React from 'react'
import demo from '/demo.avif'
import { Link } from 'react-router-dom'

const Error = () => {
    return (
        <div className='w-full p-10 flex flex-col justify-center items-center gap-4'>
            <img src={demo} alt="Error page" className='bg-cover w-96' />
            <h3 className='text-3xl text-red-600'>PAGE NOT FOUND</h3>
            <p>Go to Home page...</p>
            <Link to='/' className='bg-blue-600 px-4 py-2 rounded-md text-white'>Home</Link>
        </div>
    )
}

export default Error