import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'

function LatestCollection() {

   const { products } = useContext(ShopContext)
   console.log(products)

   return (
      <div className='my-10'>
         <div className="text-center py-8 text-3xl">
            <Title text1={"LATEST"} text2={"COLLECTIONS"} />
            <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro commodi obcaecati cumque animi optio recusandae. Earum
            </p>
         </div>
      </div>
   )
}

export default LatestCollection
