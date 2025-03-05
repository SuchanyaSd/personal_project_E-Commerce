import React, { useContext, useEffect } from 'react';
// import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/frontend_assets/assets';
import CartTotal from '../components/CartTotal';
import { useNavigate } from 'react-router';
import useAuthStore from '../store/auth-store';
import useCartStore from '../store/order_store';
import { toast } from 'react-toastify';

const Cart = () => {
  const navigate = useNavigate();
  // const { products, currency } = useContext(ShopContext);
  const currency = "$"
  const customerId = useAuthStore((state) => state.customerId); // ดึง customerId
  const { token } = useAuthStore(); // ดึง token เพื่อตรวจสอบการ login
  const { cart, removeFromCart, updateCartQuantity } = useCartStore();


  useEffect(() => {

  }, [customerId]);

  const handleProceedToCheckout = () => {
    if (!token) {
      toast("Please login to place order.");
      navigate("/login");
    } else {
      navigate("/place-order");
    }
  };

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
              onClick={handleProceedToCheckout}
              disabled={cart.length === 0}
              className={`bg-black text-white text-sm my-8 px-8 py-3  ${cart.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-pink-600 , cursor-pointer'}`}
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