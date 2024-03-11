import React from 'react'
import Layout from '../Layout/Layout'
import Banner from '../Components/Home/Banner'
import Popular from '../Components/Home/Popular'
import TopRate from '../Components/Home/TopRate'
import Promos from '../Components/Home/Promos'
import { Button } from 'antd'

const HomeScreen = () => {
  return (
    <Layout>
      <div className='container mx-auto px-2'>
        <Banner />
        <Popular />
        <Promos />
        <TopRate />
      </div>
    </Layout>
  )
}

export default HomeScreen
