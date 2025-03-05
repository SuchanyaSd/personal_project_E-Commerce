import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { toast } from 'react-toastify';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import useCartStore from '../store/order_store';
import useAuthStore from '../store/auth-store';

const PlaceOrder = () => {
   const [method, setMethod] = useState("cod");
   const navigate = useNavigate();
   const cart = useCartStore.getState().cart;
   const { customerId } = useAuthStore.getState();
   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
   const [email, setEmail] = useState('');
   const [street, setStreet] = useState('');
   const [city, setCity] = useState('');
   const [state, setState] = useState('');
   const [zipcode, setZipcode] = useState('');
   const [country, setCountry] = useState('');
   const [phone, setPhone] = useState('');

   const handlePlaceOrder = async () => {
      if (!customerId) {
         toast.error("Please login before placing an order!");
         return;
      }

      if (cart.length === 0) {
         toast.error("Your cart is empty!");
         return;
      }

      try {
         const orderData = {
            customerId,
            items: cart.map(item => ({
               productId: item.id,
               size: item.size, // ให้ Backend แปลงเป็น sizeId เอง
               quantity: item.quantity,
            })),
            // deliveryInfo: {
            //    firstName,
            //    lastName,
            //    email,
            //    street,
            //    city,
            //    state,
            //    zipcode,
            //    country,
            //    phone,
            // },
            paymentMethod: method,
         };

         const response = await axios.post("http://localhost:8008/api/cart/add-cart", orderData);

         toast.success("Order placed successfully!");
         useCartStore.getState().clearCart();
         navigate("/orders");
      } catch (error) {
         console.error("Error placing order:", error);
         toast.error("Failed to place order: " + (error.response?.data?.message || error.message));
      }
   };

   return (
      <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
         <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
            <div className="text-xl sm:text-2xl my-3">
               <Title text1={"DELIVERY"} text2={"INFORMATION"} />
            </div>
            <div className="flex gap-3">
               <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First name' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
               <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last name' value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </div>
            <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='street' value={street} onChange={(e) => setStreet(e.target.value)} />
            <div className="flex gap-3">
               <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City' value={city} onChange={(e) => setCity(e.target.value)} />
               <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='State' value={state} onChange={(e) => setState(e.target.value)} />
            </div>
            <div className="flex gap-3">
               <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Zipcode' value={zipcode} onChange={(e) => setZipcode(e.target.value)} />
               <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Country' value={country} onChange={(e) => setCountry(e.target.value)} />
            </div>
            <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Phone' value={phone} onChange={(e) => setPhone(e.target.value)} />
         </div>

         <div className='flex flex-col w-full sm:max-w-[480px] gap-2 ml-10'>
            {
               cart.map((item, index) => (
                  <div key={index} className="flex justify-items-start py-4 
                   gap-4">
                     <div>
                        <img className="w-14 sm:w-20" src={item.image} alt={item.name} />
                     </div>
                     <div className='flex flex-col gap-2'>
                        <div className='flex text-center'>
                           <p className="text-[15px]">{item.name}</p>
                        </div>
                        <div className='flex items-center gap-5 mt-2'>
                           <p className='text-[17px]'>${item.price}</p>
                           <p className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1">{item.size}</p>
                           <p className="border-b-2 text-[15px]">Quantity :</p>
                           <p className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1">{item.quantity}</p>
                        </div>
                     </div>
                  </div>
               ))
            }
         </div>

         <div className="mt-8 w-[700px]">
            <CartTotal />
            <div className="mt-12">
               <Title text1={"PAYMENT"} text2={"METHOD"} />
               <div className="flex gap-3 flex-col lg:flex-row">
                  <div onClick={() => setMethod("cod")} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                     <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "cod" ? "bg-green-400" : ""}`}></p>
                     <p className="text-gray-500 text-sm font-medium mx-4">CASH ON DELIVERY</p>
                  </div>
               </div>
               <div className="w-full text-end mt-8">
                  <button onClick={handlePlaceOrder} className='bg-black text-white px-16 py-3 text-sm cursor-pointer hover:bg-pink-500'>PLACE ORDER</button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default PlaceOrder;