import React from 'react'
import Title from '../Title'
import { BsCollection } from 'react-icons/bs'
import Movies from '../Movies'
import { MoviesData } from '../../Data/MovieData'

const RelateMovies = () => {
  return (
    <div className='container mx-auto px-2'>
      <Title Icon={BsCollection} text={'Relate Movies'} />
      <br />
      <Movies movies={MoviesData.slice(0, 4)} />
      <br />
    </div>
  )
}

export default RelateMovies
