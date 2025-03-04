import { create } from "zustand";
import { persist } from "zustand/middleware";


// สร้าง Zustand store พร้อม middleware ให้ persist ข้อมูลใน Local Storage
const useCartStore = create(
   persist(
      (set, get) => ({
         cart: [],
         addToCart: (product) => {
            const updatedCart = [...get().cart, product];
            set({ cart: updatedCart });
            // console.log(updatedCart);
         },

         updateCartQuantity: (itemId, size, quantity) => {
            const cartData = [...get().cart].map((item) =>
               item.id === itemId && item.size === size ? { ...item, quantity } : item
            );

            set({ cart: cartData });
         },

         removeFromCart: (id, size) => {
            // console.log(id)
            set({ cart: get().cart.filter((item) => ((item.id) !== id && (item.size) !== size)) });
         },
         clearCart: () => set({ cart: [] })
      }),
      { name: "cart-storage" }
   )
);

export default useCartStore;