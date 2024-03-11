import React from 'react'
import { BsCollectionFill } from 'react-icons/bs'
import Title from '../Title'
import Movies from '../Movies'
import { MoviesData } from '../../Data/MovieData'

const Popular = () => {
  return (
    <div className='my-16'>
      <Title Icon={BsCollectionFill} text='Popular movies' />
      <br />

      <Movies movies={MoviesData} />
    </div>
  )
}

export default Popular
