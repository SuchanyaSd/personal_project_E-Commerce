// import React, { useContext, useEffect, useState } from 'react'
// import { ShopContext } from '../context/ShopContext'
// import Title from '../components/Title'
// import { assets } from '../assets/frontend_assets/assets'
// import CartTotal from '../components/CartTotal'
// import { useNavigate } from 'react-router'

// const Cart = () => {
//   const navigate = useNavigate()
//   const [cartItems, setCartItems] = useState({})

//   const { products, currency } = useContext(ShopContext)
//   const [cartData, setCartData] = useState([])

//   const updateQuantity = async (itemId, size, quantity) => {
//     let cartData = structuredClone(cartItems)

//     cartData[itemId][size] = quantity

//     setCartItems(cartData)
//   }

//   useEffect(() => {
//     // console.log(cartItems)
//     const tempData = []
//     for (const items of Object.keys(cartItems)) {
//       for (const item of Object.keys(cartItems[items])) {
//         if (cartItems[items][item] > 0) {
//           tempData.push({
//             id: items,
//             size: item,
//             quantity: cartItems[items][item]
//           })
//         }
//       }
//     }
//     setCartData(tempData)
//   }, [cartItems])

//   return (
//     <div className='border-t pt-14'>
//       <div className="text-2xl mb-3">
//         <Title text1={"YOUR"} text2={"CART"} />
//       </div>

//       <div>
//         {
//           cartData.map((item, index) => {
//             const productData = products.find((product) => String(product.id) === String(item.id))
//             // console.log(productData)
//             return (
//               <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr-2fr-0.5fr] items-center gap-4'>
//                 <div className="flex items-start gap-6">
//                   <img className='w-16 sm:w-20' src={productData.image[0]} />
//                   <div>
//                     <p className="text-xs sm:text-lg font-medium">{productData.name}</p>
//                     <div className="flex items-center gap-5 mt-2">
//                       <p>{currency}{productData.price}</p>
//                       <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.size}</p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* เมื่อเพิ่มจำนวนสินค้าในหน้า cart number in cart จะเปลี่ยนด้วย */}
//                 <input onChange={(e) => e.target.value === "" || e.target.value === "0" ? null : updateQuantity(item.id, item.size, Number(e.target.value))} className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' type="number" min={1} defaultValue={item.quantity} />
//                 <img onClick={() => updateQuantity(item.id, item.size, 0)} className='w-4 mr-4 sm:w-5 cursor-pointer' src={assets.bin_icon} alt="" />
//               </div>
//             )
//           })
//         }
//       </div>

//       <div className="flex justify-end my-20">
//         <div className="w-full sm:w-[450px]">
//           <CartTotal />
//           <div className="w-full text-end">
//             <button onClick={() => navigate("/place-order")} className='bg-black text-white text-sm my-8 px-8 py-3'>PROCEED TO CHECKOUT</button>
//           </div>
//         </div>
//       </div>

//     </div>
//   )
// }

// export default Cart







import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/frontend_assets/assets';
import CartTotal from '../components/CartTotal';
import { useNavigate } from 'react-router';
import axios from 'axios';
import useAuthStore from '../store/auth-store';
import useCartStore from '../store/order_store';

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState({});
  const { products, currency } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const customerId = useAuthStore((state) => state.customerId); // ดึง customerId
  const { cart, removeFromCart, updateCartQuantity } = useCartStore();

  useEffect(() => {
    // const fetchCartData = async () => {
    //   if (!customerId) return; // ตรวจสอบ customerId

    //   try {
    //     const response = await axios.get(`http://localhost:8008/api/order/get-product/${customerId}`); // แทนที่ด้วย URL API จริง
    //     setCartData(response.data);
    //   } catch (error) {
    //     console.error('Error fetching cart data:', error);
    //   }
    // };

    // fetchCartData();
    console.log(cart)

  }, [customerId]);

  const updateQuantity = (itemId, size, quantity) => {
    if (quantity < 1) return; // ป้องกันการอัปเดตค่าต่ำกว่า 1

    const cartData = [...cart]; // Clone ตะกร้าสินค้า

    let found = false;
    cartData.forEach((item) => {
      if (item.id === itemId && item.size === size) {
        found = true;
        updateCartQuantity(itemId, size, quantity); // อัปเดต Zustand store
      }
    });

    if (!found) {
      console.error("Item not found in cart.");
    }
  };


  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      <div>
        {cart.map((item, index) => (
          <div
            key={index}
            className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr-2fr-0.5fr] items-center gap-4"
          >
            <div className="flex items-start gap-6">
              <img className="w-16 sm:w-20" src={item.image} alt={item.name} />
              <div>
                <p className="text-xs sm:text-lg font-medium">{item.name}</p>
                <div className="flex items-center gap-5 mt-2">
                  <p>
                    {currency}
                    {item.price}
                    {/* {item.id} */}
                  </p>
                  <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                    {item.size}
                  </p>
                </div>
              </div>
            </div>


            <input
              onChange={(e) => updateQuantity(item.id, item.size, Number(e.target.value))}
              className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
              type="number"
              min={1}
              defaultValue={item.quantity}
            />

            {/* <input
              onChange={(e) => {
                const newQuantity = Number(e.target.value);
                if (newQuantity > 0) {
                  updateQuantity(item.id, item.size, newQuantity);
                }
              }}
              className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
              type="number"
              min={1}
              defaultValue={item.quantity}
            /> */}
            <img
              onClick={() => {
                removeFromCart(Number(item.id), item.size);
                console.log((item.id))
              }}


              className="w-4 mr-4 sm:w-5 cursor-pointer"
              src={assets.bin_icon}
              alt=""
            />
          </div>
        ))}
      </div>

      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              onClick={() => navigate("/place-order")}
              className="bg-black text-white text-sm my-8 px-8 py-3"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart