import React, { useState } from 'react'
import UserStore from '../store/UserStore'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'
import useAuthStore from '../store/auth-store'


const Login = () => {
   const actionLoginWithZustand = useAuthStore(state => state.actionLoginWithZustand)
   const [currentState, setCurrentState] = useState("Login")
   const navigate = useNavigate()
   const login = UserStore(state => state.login)

   //useState ใช้ในการเก็บข้อมูลของฟอร์มล็อกอิน โดยเก็บค่า email และ password ไว้ใน state input ซึ่งเริ่มต้นเป็นค่าว่าง (empty string)
   const [input, setInput] = useState({
      //input จะเก็บข้อมูลอีเมลและรหัสผ่านที่ผู้ใช้กรอกเข้ามา
      email: '',
      password: ''
   })

   // จะทำงานทุกครั้งที่มีการเปลี่ยนแปลงใน input (เช่น การพิมพ์ตัวอักษรในฟอร์ม) โดยจะได้รับอีเวนต์ (event) e เป็นพารามิเตอร์
   //ฟังก์ชันนี้จะใช้ setInput เพื่ออัพเดตค่าใน state input โดยจะอัพเดตค่าสำหรับ email หรือ password ที่เปลี่ยนแปลง ตามชื่อของฟิลด์ที่ถูกแก้ไข (โดยใช้ e.target.name เพื่อดึงชื่อของฟิลด์ที่เปลี่ยนแปลง)
   //setInput(prv => ({ ...prv, [e.target.name]: e.target.value })) หมายความว่า จะคัดลอกค่าปัจจุบันของ input แล้วแค่เปลี่ยนค่าของฟิลด์ที่ถูกแก้ไข
   const hdlChange = e => {
      setInput(prv => ({ ...prv, [e.target.name]: e.target.value }))
   }

   const hdlLogin = async e => {
      try {
         const { email, password } = input
         e.preventDefault()
         // validation
         if (!email.trim() || !password.trim()) {
            return toast.error('Please fill all inputs')
         }
         // let data = await login(input)
         let data = await actionLoginWithZustand(input)
         console.log(data)
         toast.success('Login successful')
         if (data.role === 'ADMIN') {
            navigate("/admin")
         } else
            navigate("/")
      } catch (err) {
         const errMsg = err.response?.data?.error || err.message
         console.log(err)
         toast.error(errMsg)
      }
   }

   return (
      <form onSubmit={hdlLogin} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-700'>
         <div className="inline-flex items-center gap-2 mb-2 mt-10">
            <p className='prata-regular text-3xl'>{currentState}</p>
            <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
         </div>
         <input type="email" className='w-full px-3 py-2 border border-gray-800'
            placeholder='Email' required name='email'
            value={input.email}
            onChange={hdlChange} />
         <input type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='Password' required
            name='password'
            value={input.password}
            onChange={hdlChange} />
         <div className="w-full flex justify-between text-sm mt-[-8px]">
            <p className="cursor-pointer">Forgot your password</p>
            <p onClick={() => navigate("/register")} className="cursor-pointer">Create account</p>
         </div>
         <button className='bg-black text-white font-light px-8 py-2 mt-4 hover:bg-slate-700'>Login</button>
      </form>
   )
}

export default Login
