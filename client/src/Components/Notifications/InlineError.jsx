import React from 'react'

const InlineError = ({ msg }) => {
  return (
    <div className='w-full  -mb-4'>
      <p className='text-sm text-red-400'>{msg}</p>
    </div>
  )
}

export default InlineError
