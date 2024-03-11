import React from 'react'
import Sidebar from './Sidebar'
import { Button } from 'antd'
import { MoviesData } from '../../Data/MovieData'
import MoviesTable from '../../Components/MoviesTable'

/* eslint-disable */

const MoviesList = () => {
  return (
    <Sidebar>
      <div>
        <div className='flex justify-between'>
          <h1 className='text-lg font-bold'> Movies List</h1>
          <Button type='text' danger className='h-[40px] border-border'>
            Delete all
          </Button>
        </div>
        <br />
        <MoviesTable data={MoviesData} isAdmin={true} />
      </div>
    </Sidebar>
  )
}

export default MoviesList
