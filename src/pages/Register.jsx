import React, { useState } from 'react'
import { createAlert } from '../utils/createAlert';
import axios from 'axios';
import { useNavigate } from 'react-router';

const Register = () => {

   const [currentState, setCurrentState] = useState("Register")
   const navigate = useNavigate()

   const [value, setValue] = useState({
      email: "",
      firstname: "",
      lastname: "",
      password: "",
   });
   const hdlOnChange = (e) => {
      // code body
      setValue({
         ...value,
         [e.target.name]: e.target.value,
      });
   };

   const hdlSubmit = async (e) => {
      e.preventDefault();
      try {
         const res = await axios.post("http://localhost:8008/api/user/register", value);
         console.log(res);

         createAlert("success", "Register Success");
         navigate("/login")
      } catch (error) {
         // console.log("!!!!!!!!", error)
         createAlert("info", error?.response?.data.message);
         // console.log(error.response.data.message);
      }
   };

   return (
      <form onSubmit={hdlSubmit} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-700'>
         <div className="inline-flex items-center gap-2 mb-2 mt-10">
            <p className='prata-regular text-3xl'>{currentState}</p>
            <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
         </div>
         <input type="text" className='w-full px-3 py-2 border border-gray-800'
            placeholder='First name' required
            name='firstname'
            onChange={hdlOnChange}
         />

         <input type="text" className='w-full px-3 py-2 border border-gray-800'
            placeholder='Last name' required
            name='lastname'
            onChange={hdlOnChange}
         />

         <input type="email" className='w-full px-3 py-2 border border-gray-800'
            placeholder='Email' required
            name='email'
            onChange={hdlOnChange}
         />

         <input type="password" className='w-full px-3 py-2 border border-gray-800'
            placeholder='Password' required
            name='password'
            onChange={hdlOnChange}
         />

         <div className="w-full flex justify-between text-sm mt-[-8px]">
            <p onClick={()=>navigate("/login")} className="cursor-pointer">Login Herer</p>
         </div>
         <button className='bg-black text-white font-light px-8 py-2 mt-4 hover:bg-slate-600'>Sing up</button>
      </form>
   )
}

export default Register
