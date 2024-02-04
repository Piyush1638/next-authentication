"use client"
import axios from 'axios'
import { useRouter } from 'next/navigation';
import React from 'react'

const Profile = () => {
  const router = useRouter();
  const onLogout = async()=> {
      try {
        await axios('/api/users/logout');
        console.log("Logout successful!");
        router.push("/login")
      } catch (error:any) {
        console.log("Logout failed!");
        console.log(error.message)
      }

  }
  return (
    <div className='flex items-center flex-col justify-center min-h-screen '>
      <h1>Profile</h1>
      <button
      onClick={onLogout}
      className='bg-none hover:bg-slate-300 hover:text-black hover:border-none border my-6 border-slate-50 rounded-lg px-3 py-2'
      >Logout</button>
    </div>
  )
}

export default Profile