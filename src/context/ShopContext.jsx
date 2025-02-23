// เป็นฟังก์ชันจาก React ที่ใช้สร้าง Context สำหรับแชร์ข้อมูลระหว่าง Components โดยไม่ต้องใช้ props ซ้ำๆ
import { createContext } from "react"; 
import { products } from "../assets/assets"

// createContext() จะสร้าง ShopContext ขึ้นมา ซึ่งเป็นตัวกลางที่ใช้แชร์ข้อมูลระหว่าง components
export const ShopContext = createContext()

// ShopContextProvider เป็น Component ที่ใช้เป็นตัว "ห่อ" (Wrapper) สำหรับ Components อื่นๆ ที่ต้องการเข้าถึงข้อมูลจาก ShopContext
const ShopContextProvider = (props) => {

   // กำหนดค่าที่ต้องการแชร์ผ่าน Context
   const currency = "$"
   const delivery_free = 10

   // value เป็น object ที่เก็บข้อมูลที่ต้องการแชร์ให้ components 
   const value = {
      products, currency, delivery_free
   }

   return (
      // คืนค่า Context Provider
      <ShopContext.Provider value={value}>
         {props.children}
      </ShopContext.Provider>
   )
}

export default ShopContextProvider