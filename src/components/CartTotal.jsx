import React from 'react';
import Title from './Title';
import useCartStore from '../store/order_store';

const CartTotal = () => {
   const { cart } = useCartStore();
   const currency = "$";

   const getCartAmount = () => {
      return cart.reduce((total, item) => {
         return total + item.price * item.quantity;
      }, 0);
   };

   return (
      <div className='w-full'>
         <div className="text-2xl">
            <Title text1={"CART"} text2={"TOTALS"} />
         </div>

         <div className="flex flex-col gap-2 mt-2 text-sm">
            <div className="flex justify-between">
               <p>Subtotal</p>
               <p>{currency} {getCartAmount().toFixed(2)}</p>
            </div>
            <hr />
            <div className="flex justify-between">
               <p>Total</p>
               <p>{currency} {getCartAmount().toFixed(2)}</p>
            </div>
         </div>
      </div>
   );
};

export default CartTotal;
