import React from 'react'

const Title = ({ Icon, text }) => {
  return (
    <div className='flex gap-4 lg:gap-8'>
      <Icon color='red' className='text-[25px]' />
      <h1 className='font-bold capitalize sm:text-xl'>{text}</h1>
    </div>
  )
}

export default Title
