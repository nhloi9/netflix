import React from 'react'
import Layout from '../Layout/Layout'
import { AiOutlineMail, AiOutlinePhone } from 'react-icons/ai'
import { FiMapPin } from 'react-icons/fi'

const ContactUsPage = () => {
  const ContactData = [
    {
      id: 1,
      icon: AiOutlineMail,
      title: 'Email Us',
      info: 'Interactively grow backend ideas for cross-platform models.',
      contact: 'nhloi2k1@gmail.com'
    },
    {
      id: 2,
      icon: AiOutlinePhone,
      title: 'Call Us',
      info: 'Distinctively exploit optimal alignments for intuitive bandwidth.',
      contact: '+255 789 456 123'
    },
    {
      id: 3,
      icon: FiMapPin,
      title: 'Location',
      info: 'Dar es salaam, Tanzania. 345 Kigamboni, Street No. 12,',
      contact: ''
    }
  ]
  return (
    <div>
      <Layout>
        <div className='bg-main min-h-screen container mx-auto p-2 py-6'>
          <img
            src='/asset/aboutus.jpg'
            alt=''
            className='block h-[150px] lg:h-[250px] w-full object-cover'
          />
          <div className='grid md:grid-cols-2 lg:grid-cols-3 my-6 lg:my-10 gap-3 lg:gap-5 '>
            {ContactData.map((contact, index) => (
              <div
                key={index}
                className='bg-dry border border-gray-500 h-[300px] rounded-md px-9 flex-colo'
              >
                <div className='p-4 rounded-full bg-main !text-red-600 shadow-md '>
                  {<contact.icon size={26} />}
                </div>
                <br />
                <h1 className='font-extrabold text-lg'>{contact.title}</h1>
                <br />
                <p className='text-center'>
                  <a
                    className='text-blue-400'
                    href='mailto:example@example.com'
                  >
                    Send Email
                  </a>{' '}
                  {contact.info}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default ContactUsPage
