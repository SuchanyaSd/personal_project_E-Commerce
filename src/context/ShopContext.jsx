// เป็นฟังก์ชันจาก React ที่ใช้สร้าง Context สำหรับแชร์ข้อมูลระหว่าง Components โดยไม่ต้องใช้ props ซ้ำๆ
import { createContext, useEffect, useState } from "react";
import { products } from "../assets/frontend_assets/assets"
import { toast } from "react-toastify";

// createContext() จะสร้าง ShopContext ขึ้นมา ซึ่งเป็นตัวกลางที่ใช้แชร์ข้อมูลระหว่าง components
export const ShopContext = createContext()

// ShopContextProvider เป็น Component ที่ใช้เป็นตัว "ห่อ" (Wrapper) สำหรับ Components อื่นๆ ที่ต้องการเข้าถึงข้อมูลจาก ShopContext
const ShopContextProvider = (props) => {

   // กำหนดค่าที่ต้องการแชร์ผ่าน Context
   const currency = "$"
   const delivery_free = 10
   const [search, setSearch] = useState("")
   const [showSearch, setShowSearch] = useState(false)
   const [cartItems, setCartItems] = useState({})

   const addToCart = async (itemId, size) => {

      if (!size) {
         toast.error("Select Product Size")
         return
      }

      let cartData = structuredClone(cartItems)

      if (cartData[itemId]) {
         if (cartData[itemId][size]) {
            cartData[itemId][size] += 1
         } else {
            cartData[itemId][size] = 1
         }
      } else {
         cartData[itemId] = {}
         cartData[itemId][size] = 1
      }
      setCartItems(cartData)
   }

   // const getCartCount = () => {
   //    let totalCount = 0
   //    for (const items in +cartItems) {
   //       console.log(items)
   //       for (const item in +cartItems[items]) {
   //          try {
   //             console.log(item)
   //             if (cartItems[items][item] > 0) {
   //                totalCount += +cartItems[items[item]]
   //             }
   //          } catch (error) {
   //             console.log(error)
   //          }
   //       }
   //    }
   //    return totalCount
   // }

   // value เป็น object ที่เก็บข้อมูลที่ต้องการแชร์ให้ components 

   const getCartCount = () => {
      let totalCount = 0;
      for (const items of Object.keys(cartItems)) {
         for (const item of Object.keys(cartItems[items])) {
            try {
               if (cartItems[items][item] > 0) {
                  totalCount += cartItems[items][item];
               }
            } catch (error) {
               console.log(error);
            }
         }
      }
      return totalCount;
   };

   const updateQuantity = async (itemId, size, quantity) => {
      let cartData = structuredClone(cartItems)

      cartData[itemId][size] = quantity

      setCartItems(cartData)
   }

   const getCartAmount = () => {
      let totalAmount = 0
      for (const items in cartItems) {
         let itemInfo = products.find((product) => product.id === Number(items))
         if (!itemInfo) continue
         for (const item in cartItems[items]) {
            try {
               if (cartItems[items][item] > 0) {
                  totalAmount += itemInfo.price * cartItems[items][item]
               }
            } catch (error) {
               console.log(error)
            }
         }
      }

      return totalAmount
   }

   const value = {
      products, currency, delivery_free,
      search, setSearch, showSearch, setShowSearch,
      cartItems, addToCart,
      getCartCount, updateQuantity,
      getCartAmount

   }

   return (
      // คืนค่า Context Provider
      <ShopContext.Provider value={value}>
         {props.children}
      </ShopContext.Provider>
   )
}

export default ShopContextProvider