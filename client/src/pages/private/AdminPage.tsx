import React from 'react'

const AdminPage = () => {
  return (
    <div className="flex flex-col h-full">
      <div className='mb-4'>
        <h1 className="text-heading-1">Site Overview</h1>
        <p className='text-sub-1 text-gray-500'>Full administrative access • Site Moderator</p>
      </div>

      <div className='my-4 flex justify-center items-center gap-8 h-32'>
        <div className='border border-gray-300 h-full w-full rounded-md' />
        <div className='border border-gray-300 h-full w-full rounded-md' />
        <div className='border border-gray-300 h-full w-full rounded-md' />
        <div className='border border-gray-300 h-full w-full rounded-md' />
      </div>

      <div className='my-4 flex justify-center items-center gap-8 h-96'>
        <div className='border border-gray-300 h-full flex-2 rounded-md' />
        <div className='border border-gray-300 h-full flex-1 rounded-md' />
      </div>

      <div className='my-4 flex justify-center items-center gap-8 h-96'>
        <div className='border border-gray-300 h-full w-full rounded-md' />
        <div className='border border-gray-300 h-full w-full rounded-md' />
      </div>
    </div>
  )
}

export default AdminPage