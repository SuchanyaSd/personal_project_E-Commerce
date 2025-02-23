import React, { useState } from 'react'
import { Link, NavLink } from 'react-router'
import { AvatarIcon, CartIcon, DropdownIcon, MenuIcon, SearchIcon, TapeeIcon } from '../icon/icon'

function Navbar() {

   const [visible, setVisible] = useState(false)

   return (
      <div className='flex items-center justify-between py-5 font-medium m-0 p-0'>

         {/* LOGO img */}
         {/* <img src="../assets/logo.png" alt="logo" className='w-36' /> */}
         <div className='flex justify-center items-center'>
            <TapeeIcon className="w-12 cursor-pointer" />
            <p>ShopStore</p>
         </div>

         <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
            <NavLink to="/" className="flex flex-col items-center gap-1">
               <p className='text-[17px]'>HOME</p>
               <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
            </NavLink>
            <NavLink to="/collection" className="flex flex-col items-center gap-1">
               <p className='text-[17px]'>COLLECTION</p>
               <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
            </NavLink>
            <NavLink to="/about" className="flex flex-col items-center gap-1">
               <p className='text-[17px]'>ABOUT</p>
               <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
            </NavLink>
            <NavLink to="/contact" className="flex flex-col items-center gap-1">
               <p className='text-[17px]'>CONTACT</p>
               <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
            </NavLink>
         </ul>

         {/* ICON */}
         <div className="flex items-center gap-6">
            {/* SearchIcon */}
            <SearchIcon className="w-8 cursor-pointer" />

            <div className="group relative">
               {/*ProfileIcon*/}
               <AvatarIcon className="w-8 cursor-pointer" />
               <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
                  <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded-b-lg">
                     <p className='cursor-pointer hover:text-black'>My Profile</p>
                     <p className='cursor-pointer hover:text-black'>Order</p>
                     <p className='cursor-pointer hover:text-black'>Logout</p>
                  </div>
               </div>
            </div>

            <Link to="/cart" className='relative'>
               {/* CartIcon */}
               <CartIcon className="w-9 cursor-pointer" />
               <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[12px]'>10</p>
            </Link>
            {/* MenuIcon */}
            <MenuIcon onClick={() => setVisible(true)} className="w-10 cursor-pointer sm:hidden" />
         </div>

         {/* Sidebar menu for small screens */}
         <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? "w-full" : "w-0"}`}>
            <div className="flex flex-col text-gray-600">
               <div onClick={() => setVisible(false)} className="flex items-center gap-2 p-3 bg-blue-300">
                  <DropdownIcon className="w-8" />
                  <p className='text-[20px]'>Back</p>
               </div>
               <NavLink onClick={()=>setVisible(false)} className="py-2 pl-6 text-[18px] border hover:bg-slate-300" to="/">HOME</NavLink>
               <NavLink onClick={()=>setVisible(false)} className="py-2 pl-6 text-[18px] border hover:bg-slate-300" to="/collection">COLLECTION</NavLink>
               <NavLink onClick={()=>setVisible(false)} className="py-2 pl-6 text-[18px] border hover:bg-slate-300" to="/about">ABOUT</NavLink>
               <NavLink onClick={()=>setVisible(false)} className="py-2 pl-6 text-[18px] border hover:bg-slate-300" to="/contact">CONTACT</NavLink>
            </div>
         </div>

      </div>
   )
}

export default Navbar
