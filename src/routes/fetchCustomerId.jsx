import React, { useEffect } from "react";
import useAuthStore from "../store/auth-store";

const Profile = () => {
   const { customerId, fetchCustomerId } = useAuthStore();

   useEffect(() => {
      fetchCustomerId(); // ดึง customerId ตอนโหลด Component
   }, []);

   return <h1>Customer ID: {customerId}</h1>;
};

export default Profile;
// จากโค้ดข้างบน สร้าง Component ที่ชื่อ Profile โดยใช้ hook useAuthStore จาก store/authStore และเรียกฟังก์ชัน fetchCustomerId ใน useEffect ของ Component เพื่อดึง customerId มาแสดงผล
// ในการใช้งานจริง คุณอาจจะใช้ customerId ในการดึงข้อมูลของลูกค้าจาก API หรือใช้ในการทำงานอื่นๆ ตามที่ต้องการ