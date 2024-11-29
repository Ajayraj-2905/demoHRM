import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch('https://backend-hrcompliance.onrender.com/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        })
        const data = await response.json()
        console.log(data.message)
    }

    return (
        <div className='w-screen h-screen bg-blue-200 flex justify-center items-center'>
            <form onSubmit={handleSubmit} className='flex flex-col justify-center items-start gap-4'>
                <h1 className='text-5xl font-semibold text-orange-600'>Register Form</h1>
                <label htmlFor="username" className='text-md font-semibold'>Username</label>
                <input className='border border-gray-400 px-2 w-96 rounded-md py-1 focus-visible:outline-none' type="text" id='username' onChange={(e) => setUsername(e.target.value)} />
                <label htmlFor="email" className='text-md font-semibold'>Email</label>
                <input className='border border-gray-400 px-2 w-96 rounded-md py-1 focus-visible:outline-none' type="email" id='email' onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="password" className='text-md font-semibold'>Password</label>
                <input className='border border-gray-400 px-2 w-96 rounded-md py-1 focus-visible:outline-none' type="password" id='password' onChange={(e) => setPassword(e.target.value)} />
                <button type='submit' className='bg-blue-600 px-4 py-2 rounded-md text-md text-white'>Sign-Up</button>
                <p className='text-md font-semibold'>Create an account!<Link to='/' className='ms-3 text-orange-600'>Login</Link></p>
            </form>
        </div>
    )
}

export default Register