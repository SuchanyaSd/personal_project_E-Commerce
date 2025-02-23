import React from 'react'
import { TapeeIcon } from '../icon/icon'

const Footer = () => {
   return (
      <div>
         <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-10 text-sm">

            <div>
               <div className="flex items-center justify-start">
                  <TapeeIcon className="w-12" />
                  <p className='text-[30px]'>ShopStore</p>
               </div>
               <p className="w-full md:w-2/3 text-gray-600">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem maxime atque sint debitis veritatis beatae. Nemo nam, repellendus sequi earum inventore consequuntur vel consectetur odit quidem, harum nostrum adipisci soluta aliquam placeat necessitatibus numquam nihil dolore, animi eos natus doloremque.
               </p>
            </div>

            <div>
               <p className="text-xl font-medium mb-5">COMPANY</p>
               <ul className="flex flex-col gap-1 text-gray-600">
                  <li className='text-[16px]'>Home</li>
                  <li className='text-[16px]'>About us</li>
                  <li className='text-[16px]'>Delivery</li>
                  <li className='text-[16px]'>Privacy policy</li>
               </ul>
            </div>

            <div>
               <p className="text-xl font-medium mb-5">GET IN TUCH</p>
               <ul className='flex flex-col gap-1 text-gray-600'>
                  <li className='text-[16px]'>+1-112-888-567</li>
                  <li className='text-[16px]'>contact@shopstore.com</li>
               </ul>
            </div>
         </div>

         <div>
            <hr />
            <p className="py-5 text-sm text-center">Copyright 2025@ shopstore.com - All Right Reserved.</p>
         </div>

      </div>
   )
}

export default Footer
