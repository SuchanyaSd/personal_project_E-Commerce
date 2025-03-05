import React from 'react'
import Header from '../components/Header'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
// import NewsletterBox from '../components/NewsletterBox'

export default function Home() {
  return (
    <div>
      <Header/>
      <LatestCollection/>
      <BestSeller/>
      <OurPolicy/>
      {/* <NewsletterBox/> */}
    </div>
  )
}
