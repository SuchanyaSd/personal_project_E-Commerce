import axios from 'axios'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

//create(persist(...)): ใช้ในการสร้าง zustand store ซึ่งจะเก็บและจัดการสถานะของ user และ token และเชื่อมโยงกับ middleware persist เพื่อเก็บข้อมูลลงใน localStorage
const UserStore = create(persist((set, get) => ({
   //persist ใช้เพื่อเก็บข้อมูลใน localStorage ดังนั้นเมื่อผู้ใช้รีเฟรชหรือเปิดหน้าเว็บใหม่ ข้อมูลใน store จะยังคงอยู่
   user: null,
   token: '',
   login: async (input) => {
      //มื่อการล็อกอินสำเร็จ (ตอบกลับจากเซิร์ฟเวอร์) ระบบจะเก็บ token และ user ลงใน state โดยใช้ set({ token, user })
      const rs = await axios.post('http://localhost:8008/api/user/login', input)
      set({ token: rs.data.token, user: rs.data.user })
      return rs.data
   },
   logout: () => set({ token: '', user: null })
}), {
   name: 'state',
   storage: createJSONStorage(() => localStorage)
}))


export default UserStore
