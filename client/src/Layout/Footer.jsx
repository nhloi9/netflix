import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  const Links = [
    {
      title: 'Company',
      links: [
        {
          name: 'Home',
          link: '/'
        },
        {
          name: 'About Us',
          link: '/about-us'
        },
        {
          name: 'Contact Us',
          link: '/contact-us'
        },
        {
          name: 'Movies',
          link: '/movies'
        }
      ]
    },
    {
      title: 'Top Categories',
      links: [
        {
          name: 'Action',
          link: '/'
        },
        {
          name: 'Romantic',
          link: '/'
        },
        {
          name: 'Historical',
          link: '/'
        },
        {
          name: 'Drama',
          link: ''
        }
      ]
    },
    {
      title: 'My Account',
      links: [
        {
          name: 'Dashboard',
          link: '/dashboard'
        },
        {
          name: 'My Favorites',
          link: '/'
        },
        {
          name: 'Profile',
          link: '/'
        },
        {
          name: 'Change Password',
          link: '/'
        }
      ]
    },
    {
      title: (
        <Link to={''}>
          <img src='/asset/logo1.png' className='h-[30px]' alt='' />
        </Link>
      ),
      links: [
        {
          name: 'Lorem 196 Andrew Road,',
          link: '*'
        },
        {
          name: 'Suite 200,',
          link: '/'
        },
        {
          name: 'Tell: +255 754 661 423',
          link: '/'
        },
        {
          name: 'Email: info@zpunet.com',
          link: '/'
        }
      ]
    }
  ]
  return (
    <div className='bg-dry'>
      <div className=' container mx-auto bg-dry grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-2 gap-3'>
        {Links.map(sub => (
          <div key={sub.title} className='leading-8'>
            <div className='font-[700]'> {sub.title}</div>
            {sub.links.map((item, index) => (
              <Link key={index} className='block' to={item.link}>
                {item.name}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Footer
