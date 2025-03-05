import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router'
import { AvatarIcon, CartIcon, DropdownIcon, MenuIcon, SearchIcon, TapeeIcon } from '../icon/icon'
import useAuthStore from '../store/auth-store'
import useCartStore from '../store/order_store'


function Navbar() {

   const [visible, setVisible] = useState(false)
   const [showSearch, setShowSearch] = useState(false)
   const [cartItems, setCartItems] = useState({})
   const navigate = useNavigate()
   const { actionLogout } = useAuthStore();
   const { clearCart, cart } = useCartStore();

   const handleLogout = () => {
      actionLogout(); // ล้างข้อมูลการล็อกอิน
      clearCart(); // ล้างข้อมูลตะกร้าสินค้า
      navigate("/"); // นำทางไปหน้า Login
   };


   const getCartCount = () => {
      return cart.reduce((total, item) => total + item.quantity, 0);
   };




   return (
      <div className='flex items-center justify-between py-5 font-medium m-0 p-0'>

         {/* LOGO img */}
         {/* <img src={Logo} alt="logo" className='w-20 m-0 p-0' /><p>ShopStore</p> */}
         <Link to="/" className='flex justify-center items-center cursor-pointer'>
            <TapeeIcon className="w-12" />
            <p className='text-[30px]'>ShopStore</p>
         </Link>

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
            <SearchIcon onClick={() => setShowSearch(true)} className="w-8 cursor-pointer" />

            <div className="group relative">
               <AvatarIcon className="w-8 cursor-pointer" />
               <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
                  <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded-b-lg">
                     <p className="cursor-pointer hover:text-black">My Profile</p>
                     <p onClick={() => navigate("/login")} className="cursor-pointer hover:text-black">Login</p>
                     <p onClick={() => navigate("/orders")} className="cursor-pointer hover:text-black">Order</p>
                     <p onClick={handleLogout} className="cursor-pointer hover:text-black">Logout</p>
                  </div>
               </div>
            </div>

            <Link to="/cart" className='relative'>
               {/* CartIcon */}
               <CartIcon className="w-9 cursor-pointer" />
               <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[12px]'>{getCartCount()}</p>
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
               <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 text-[18px] border" to="/">HOME</NavLink>
               <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 text-[18px] border" to="/collection">COLLECTION</NavLink>
               <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 text-[18px] border" to="/about">ABOUT</NavLink>
               <NavLink onClick={() => setVisible(false)} className="py-2 pl-6 text-[18px] border" to="/contact">CONTACT</NavLink>
            </div>
         </div>

      </div>
   )
}

export default Navbar
