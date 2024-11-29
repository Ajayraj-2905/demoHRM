import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from './AuthContext'
import Swal from 'sweetalert2'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('https://backend-hrcompliance.onrender.com/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (response.ok) {
      Swal.fire({
        text: data.message || "Login Successfully!",
        icon: "success",
        confirmButtonText: "Proceed",
        customClass: {
          confirmButton: 'bg-customYellow-default',
          text: 'p-0'
        }
      }).then(() => {
        login(data.token)
        navigate("/dashboard")
      })
    } else {
      Swal.fire({
        text: data.message || "Login Failed",
        icon: "error",
        confirmButtonText: "Retry"
      })
    }
  }

  return (
    <div className='w-screen h-screen bg-blue-200 flex justify-center items-center'>
      <form onSubmit={handleSubmit} className='flex flex-col justify-center items-start gap-4'>
        <h1 className='text-5xl font-semibold text-orange-600'>Login</h1>
        <label htmlFor="username" className='text-md font-semibold'>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className='border border-gray-400 px-2 w-96 rounded-md py-1 focus-visible:outline-none'
          required
        />
        <label htmlFor="password" className='text-md font-semibold'>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='border border-gray-400 px-2 w-96 rounded-md py-1 focus-visible:outline-none'
          required
        />
        <button type='submit' className='bg-blue-600 px-4 py-2 rounded-md text-md text-white'>Sign-In</button>
        <p className='text-md font-semibold'>Already have an account? <Link to='/register' className='text-orange-600'>Register</Link></p>
      </form>
    </div>
  )
}

export default Login
