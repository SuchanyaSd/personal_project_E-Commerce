// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// const useCartStore = create(
//    persist(
//       (set, get) => ({
//          cart: [],

//          addToCart: (product) => {
//             const cartData = [...get().cart];
//             const existingIndex = cartData.findIndex(
//                (item) => item.id === product.id && item.size === product.size
//             );

//             if (existingIndex !== -1) {
//                // ถ้าสินค้ามีอยู่แล้ว ให้เพิ่มจำนวน
//                cartData[existingIndex].quantity += product.quantity;
//             } else {
//                // ถ้าไม่มีสินค้า ให้เพิ่มเข้าไปใหม่
//                cartData.push(product);
//             }

//             set({ cart: cartData });
//          },

//          updateCartQuantity: (itemId, size, quantity) => {
//             const cartData = [...get().cart].map((item) =>
//                item.id === itemId && item.size === size ? { ...item, quantity } : item
//             );

//             set({ cart: cartData });
//          },

//          removeFromCart: (itemId, size) => {
//             set({
//                cart: get().cart.filter((item) => !(item.id === itemId && item.size === size))
//             });
//          },

//          clearCart: () => set({ cart: [] })
//       }),
//       { name: "cart-storage" }
//    )
// );

// export default useCartStore;
