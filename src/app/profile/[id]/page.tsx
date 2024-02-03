import React from 'react'

const UserId = ({params}:any) => {
  return (
    <div className='flex items-center justify-center min-h-screen'>Profile Page with user Id: <span className='bg-orange-500 px-2 py-2 rounded-lg mx-3'>{params.id}</span></div>
  )
}

export default UserId