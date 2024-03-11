import React from 'react'
import Layout from '../Layout/Layout'

const AboutUsPage = () => {
  return (
    <div>
      <Layout>
        <div className='bg-main min-h-screen container mx-auto p-2 py-6'>
          <img
            src='/asset/aboutus.jpg'
            alt=''
            className='block h-[150px] lg:h-[250px] w-full object-cover'
          />
          <br />
          <h1 className='font-bold text-[21px] mb-4'>
            Welcome to our Netflixo
          </h1>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply
            dummy text of the printing and typesetting industry. Lorem Ipsum has
            been the industry's standard dummy text ever since the 1500s, when
            an unknown printer took a galley of type and scrambled it to make a
            type specimen book. It has survived not only five centuries, but
            also the leap into electronic typesetting, remaining essentially
            unchanged.
          </p>
          <br />
          <div className='grid md:grid-cols-2 gap-6'>
            <div className='h-[200px] bg-dry rounded-md p-5'>
              <h1 className='text-3xl font-bold'>10K</h1>
              <br />
              <h1 className='text-xl font-bold'>Listed Movies</h1>
              <br />
              <p>Lorem Ipsum is simply dummy text of the printing and</p>
            </div>
            <div className='h-[200px] bg-dry rounded-md p-5'>
              <h1 className='text-3xl font-bold'>8K</h1>
              <br />
              <h1 className='text-xl font-bold'>Lovely Users</h1>
              <br />
              <p>
                Completely free, without registration! Lorem Ipsum is simply
              </p>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default AboutUsPage
