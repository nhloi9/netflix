import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFlip } from 'swiper/modules'
import { Button } from 'antd'
// import Swiper styles
import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/effect-flip'
import { MoviesData } from '../../Data/MovieData'

import { SlCalender } from 'react-icons/sl'
import { AiFillHeart, AiOutlineClockCircle } from 'react-icons/ai'

const Banner = () => {
  return (
    <div className='w-full'>
      <Swiper
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 2000 }}
        speed={1000}
        direction='vertical'
        className='w-full h-60 lg:h-96 '
        modules={[Autoplay, EffectFlip]}
        // noSwiping={true}
        // noSwipingClass='swiper-no-swiping'
        // followFinger={true}
        // effect='flip'
      >
        {MoviesData.map((movie, index) => (
          <SwiperSlide className='relative  ' key={index}>
            <img
              src={movie.titleImage}
              key={index}
              className='w-full h-full blocl object-cover'
              alt=''
            />
            <div className='absolute w-full h-full justify-center p-32 lg:p-60 top-0 left-0 flex flex-col  gap-8'>
              <h1 className='font-sans font-[600] text-[28px]'>{movie.name}</h1>
              <div className='flex gap-4 '>
                <h1 className=''>{movie.category}</h1>
                <div className='flex'>
                  <SlCalender className='mr-1 translate-y-[3px]' />
                  <span>{' ' + movie.year}</span>
                </div>
                <div className='flex'>
                  <AiOutlineClockCircle className='mr-1 translate-y-[3px]' />
                  <p>{movie.time}</p>
                </div>
              </div>
              <div className='flex gap-4'>
                <Button type='primary' danger className=' h-[40px]'>
                  Watch now
                </Button>
                <div className=' h-[40px] flex-colo bg-[#00000029] px-3 '>
                  <AiFillHeart
                    size={20}
                    color='red'
                    className='cursor-pointer'
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default Banner
