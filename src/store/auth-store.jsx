import axios from "axios";
import { create } from "zustand";
import { actionLogin } from "../api/auth";
import { persist } from "zustand/middleware";

const authStore = (set, get) => ({
   user: [],
   token: null,
   customerId: null, // เพิ่ม customerId state


   // ฟังก์ชันนี้รับค่า value(ซึ่งมักจะเป็นข้อมูลอีเมลและรหัสผ่าน) แล้วส่งไปยัง API ผ่าน actionLogin
   // หากล็อกอินสำเร็จ จะได้รับ token และ payload ที่เก็บข้อมูลผู้ใช้จากเซิร์ฟเวอร์(เช่น ชื่อผู้ใช้, บทบาท ฯลฯ)
   // ใช้ set เพื่ออัพเดตค่าใน store ด้วยข้อมูลที่ได้(เช่น user, token, และ customerId)
   // คืนค่าผลลัพธ์ที่แสดงถึงสถานะของการล็อกอินสำเร็จหรือไม่
   actionLoginWithZustand: async (value) => {
      try {
         const res = await actionLogin(value);
         const { payload, token } = res.data;
         set({ user: payload, token: token, customerId: payload.id });

         return { success: true, role: payload.role, customerId: payload.id };
      } catch (error) {
         return { success: false, error: error.response.data.message };
      }
   },


   // ฟังก์ชันนี้ใช้ token ที่เก็บใน store เพื่อทำการร้องขอ customerId จาก API
   // หากมี token ใน store จะทำการส่งคำร้องขอ GET ไปที่ /user/customer-id โดยใช้ Authorization header ที่มี Bearer token
   // เมื่อได้รับข้อมูล customerId จาก API จะใช้ set อัพเดตค่า customerId ใน store
   // หากเกิดข้อผิดพลาดจะทำการพิมพ์ข้อความผิดพลาดในคอนโซล
   fetchCustomerId: async () => {
      try {
         const token = get().token; //ดึง token จาก store
         if (!token) return; // หากไม่มี token จะไม่ทำการร้องขอ

         const res = await axios.get("http://localhost:8008/user/customer-id", {
            headers: { Authorization: `Bearer ${token}` },
         });

         set({ customerId: res.data.customerId }); //อัพเดตค่า customerId ใน store
      } catch (error) {
         console.error("Error fetching customerId:", error);
      }
   },

   // ฟังก์ชันนี้ใช้ในการออกจากระบบ โดยการลบข้อมูลทั้งหมดใน store (เช่น user, token, และ customerId)
   // จะทำให้ผู้ใช้ถูกออกจากระบบและข้อมูลทั้งหมดถูกลบจาก store
   actionLogout: () => {
      set({ user: [], token: null, customerId: null });
   },
});

const useAuthStore = create(persist(authStore, { name: "auth-store" }));
export default useAuthStore;
