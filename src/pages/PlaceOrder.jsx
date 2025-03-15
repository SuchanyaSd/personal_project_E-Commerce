// import React, { useState } from 'react';
// import { useNavigate } from 'react-router';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import Title from '../components/Title';
// import CartTotal from '../components/CartTotal';
// import useCartStore from '../store/order_store';
// import useAuthStore from '../store/auth-store';

// const PlaceOrder = () => {
//    const [method, setMethod] = useState("cod");
//    const navigate = useNavigate();

//    // 🔹 ดึงข้อมูลจาก Zustand
//    const cart = useCartStore.getState().cart;
//    const { customerId } = useAuthStore.getState();

//    // 🔹 เก็บค่าที่อยู่จากฟอร์ม
//    const [address, setAddress] = useState({
//       street: "",
//       city: "",
//       state: "",
//       zipcode: "",
//       country: "",
//       phone: ""
//    });


//    // ฟังก์ชันอัปเดตค่าฟอร์ม
//    const handleChange = (e) => {
//       setAddress({ ...address, [e.target.name]: e.target.value });
//    };

//    const handlePlaceOrder = async () => {
//       if (!customerId) {
//          toast.error("Please login before placing an order!");
//          return;
//       }

//       if (cart.length === 0) {
//          toast.error("Your cart is empty!");
//          return;
//       }

//       if (!address.street || !address.city || !address.state || !address.zipcode || !address.country || !address.phone) {
//          toast.error("Please fill in all address fields!");
//          return;
//       }

//       try {
//          for (const item of cart) {
//             console.log("Sending order:", {
//                customerId,
//                productId: item.id,
//                size: item.size,
//                quantity: item.quantity,
//                address
//             });

//             await axios.post("http://localhost:8008/api/cart/add-cart", {
//                customerId,
//                productId: item.id,
//                size: item.size,
//                quantity: item.quantity,
//                address
//             });
//          }

//          toast.success("Order placed successfully!");
//          useCartStore.getState().clearCart();
//          navigate("/orders");
//       } catch (error) {
//          console.error("Error placing order:", error);
//          toast.error("Failed to place order.");
//       }
//    };



//    return (
//       <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
//          {/* left side */}
//          <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
//             <div className="text-xl sm:text-2xl my-3">
//                <Title text1={"DELIVERY"} text2={"INFORMATION"} />
//             </div>
//             {/* <div className="flex gap-3">
//                <input name="firstName" value={address.firstName} onChange={handleChange} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First name' />
//                <input name="lastName" value={address.lastName} onChange={handleChange} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last name' />
//             </div> */}
//             <input
//                className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
//                type="text" placeholder='street'
//                value={address.street}
//                onChange={(e) => setAddress({ ...address, street: e.target.value })}
//             />

//             <div className="flex gap-3">
//                <input
//                   className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
//                   type="text" placeholder='City'
//                   value={address.city}
//                   onChange={(e) => setAddress({ ...address, city: e.target.value })}
//                />

//                <input
//                   className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
//                   type="text" placeholder='State'
//                   value={address.state}
//                   onChange={(e) => setAddress({ ...address, state: e.target.value })}
//                />
//             </div>
//             <div className="flex gap-3">
//                <input
//                   className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
//                   type="number" placeholder='Zipcode'
//                   value={address.zipcode}
//                   onChange={(e) => setAddress({ ...address, zipcode: e.target.value })}
//                />

//                <input
//                   className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
//                   type="text" placeholder='Country'
//                   value={address.country}
//                   onChange={(e) => setAddress({ ...address, country: e.target.value })}
//                />
//             </div>
//             <input
//                className='border border-gray-300 rounded py-1.5 px-3.5 w-full'
//                type="number" placeholder='Phone'
//                value={address.phone}
//                onChange={(e) => setAddress({ ...address, phone: e.target.value })}
//             />
//          </div>

//          <div className='flex flex-col w-full sm:max-w-[480px] gap-2 ml-10'>
//             {cart.map((item, index) => (
//                <div key={index} className="flex justify-items-start py-4 gap-4">
//                   <div>
//                      <img className="w-14 sm:w-20" src={item.image} alt={item.name} />
//                   </div>
//                   <div className='flex flex-col gap-2'>
//                      <div className='flex text-center'>
//                         <p className="text-[15px]">{item.name}</p>
//                      </div>
//                      <div className='flex items-center gap-5 mt-2'>
//                         <p className='text-[17px]'>${item.price}</p>
//                         <p className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1">{item.size}</p>
//                         <p className="border-b-2 text-[15px]">Quantity :</p>
//                         <p className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1">{item.quantity}</p>
//                      </div>
//                   </div>
//                </div>
//             ))}
//          </div>

//          {/* right side */}
//          <div className="mt-8">
//             <CartTotal />
//             <div className="mt-12">
//                <Title text1={"PAYMENT"} text2={"METHOD"} />
//                <div className="flex gap-3 flex-col lg:flex-row">
//                   <div onClick={() => setMethod("cod")} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
//                      <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "cod" ? "bg-green-400" : ""}`}></p>
//                      <p className="text-gray-500 text-sm font-medium mx-4">CASH ON DELIVERY</p>
//                   </div>
//                </div>
//                <div className="w-full text-end mt-8">
//                   <button onClick={handlePlaceOrder} className='bg-black text-white px-16 py-3 text-sm hover:bg-pink-600 cursor-pointer'>PLACE ORDER</button>
//                </div>
//             </div>
//          </div>
//       </div>
//    );
// };

// export default PlaceOrder;



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

   // 🔹 ดึงข้อมูลจาก Zustand
   const cart = useCartStore.getState().cart;
   const { customerId } = useAuthStore.getState();

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
         for (const item of cart) {
            console.log("Sending order:", {
               customerId,
               productId: item.id,
               size: item.size,
               quantity: item.quantity
            });

            await axios.post("http://localhost:8008/api/cart/add-cart", {
               customerId,
               productId: item.id,
               size: item.size,
               quantity: item.quantity
            });
         }

         toast.success("Order placed successfully!");
         useCartStore.getState().clearCart(); // เคลียร์ตะกร้า
         navigate("/orders"); // ไปหน้าคำสั่งซื้อ
      } catch (error) {
         console.error("Error placing order:", error);
         toast.error("Failed to place order.");
      }
   };

   return (
      <div className='flex flex-col sm:flex-row justify-evenly gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
         {/* left side */}
         {/* <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
            <div className="text-xl sm:text-2xl my-3">
               <Title text1={"DELIVERY"} text2={"INFORMATION"} />
            </div>
            <div className="flex gap-3">
               <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First name' />
               <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last name' />
            </div>
            <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='email' />
            <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='street' />
            <div className="flex gap-3">
               <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City' />
               <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='State' />
            </div>
            <div className="flex gap-3">
               <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Zipcode' />
               <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Country' />
            </div>
            <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Phone' />
         </div> */}

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

         {/* right side */}
         <div className="mt-8">
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
                  <button onClick={handlePlaceOrder} className='bg-black text-white px-16 py-3 text-sm hover:bg-pink-600 cursor-pointer'>PLACE ORDER</button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default PlaceOrder;
