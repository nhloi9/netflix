import React from 'react'
import { Button } from 'antd'
import { BiSolidUser } from 'react-icons/bi'
const Promos = () => {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 bg-dry  p-10  '>
      <div className='flex flex-col justify-center leading-8 lg:leading-10'>
        <h1 className='font-bold'>Download Your Movies Watch Offline.</h1>
        <h1 className='font-bold'>Enjoy On Your Mobile</h1>
        <br />
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries..
        </p>
        <br />
        <div>
          <Button danger type='primary' className='mr-4'>
            HD 4K
          </Button>
          <Button
            danger
            type='primary'
            icon={<BiSolidUser size={18} className='-mb-[3px]' />}
          >
            2k
          </Button>
        </div>
      </div>
      <div>
        <img src='asset/mobile.png' alt='' />
      </div>
    </div>
  )
}

export default Promos
