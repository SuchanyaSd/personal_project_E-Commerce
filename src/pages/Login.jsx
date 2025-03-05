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
   const [input, setInput] = useState({
      email: '',
      password: ''
   })


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
