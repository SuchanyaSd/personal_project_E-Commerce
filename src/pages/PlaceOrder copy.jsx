import React, { useContext, useEffect, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/frontend_assets/assets'
import { ShopContext } from '../context/ShopContext'
import useAuthStore from '../store/auth-store'

const PlaceOrdercopy = () => {
   const [method, setMethod] = useState("cod");
   const { navigate } = useContext(ShopContext);
   // You'll need to import useEffect
   const [isAuthenticated, setIsAuthenticated] = useState(false);

   // Import your auth store
   // Add this import at the top of your file
   // import { useAuthStore } from './path-to-your-auth-store';

   // Check token when component mounts
   useEffect(() => {
      checkToken();
   }, []);

   // Function to check if token exists
   const checkToken = () => {
      const { token } = useAuthStore.getState();

      if (!token) {
         // Redirect to login page if no token
         navigate("/login");
         return false;
      }

      setIsAuthenticated(true);
      return true;
   };

   // Handle place order with token check
   const handlePlaceOrder = () => {
      // Verify token again before proceeding
      if (checkToken()) {
         // Continue with order placement
         navigate("./orders");
      }
   };

   // If not authenticated, you could return null or a loading state
   // This prevents the component from rendering briefly before redirect
   if (!isAuthenticated) {
      return null; // Or return a loading spinner
   }

   return (
      <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
         {/* left side */}
         <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
            <div className="text-xl sm:text-2xl my-3">
               <Title text1={"DELIVERY"} text2={"INFORMATION"} />
            </div>
            {/* Your form inputs remain the same */}
            <div className="flex gap-3">
               <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First name' />
               <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last name' />
            </div>
            <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='email' />
            <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='stree' />
            <div className="flex gap-3">
               <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City' />
               <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='State' />
            </div>
            <div className="flex gap-3">
               <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Zipcode' />
               <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Country' />
            </div>
            <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Phone' />
         </div>

         {/* right side */}
         <div className="mt-8">
            <div className="mt-8 min-w-80">
               <CartTotal />
            </div>

            <div className="mt-12">
               <Title text1={"PAYMENT"} text2={"METHOD"} />
               {/* payment method*/}
               <div className="flex gap-3 flex-col lg:flex-row">
                  <div onClick={() => setMethod("cod")} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                     <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "cod" ? "bg-green-400" : ""}`}></p>
                     <p className="text-gray-500 text-sm font-medium mx-4">CASH ON DELIVERY</p>
                  </div>
               </div>

               <div className="w-full text-end mt-8">
                  <button onClick={handlePlaceOrder} className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
               </div>
            </div>
         </div>
      </div>
   )
}

export default PlaceOrdercopy