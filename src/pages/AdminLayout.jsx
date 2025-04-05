import React, { useState } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router';
import useAuthStore from '../store/auth-store';
import { EditProduct, EditProfile, TapeeIcon } from '../icon/icon';

const AdminLayout = () => {
   const navigate = useNavigate();
   const location = useLocation();
   const [activePath, setActivePath] = useState(location.pathname); // เก็บ path ปัจจุบัน
   const { actionLogout } = useAuthStore(); // เรียกใช้งาน actionLogout จาก store

   const handleNavigate = (path) => {
      navigate(path);
      setActivePath(path); // อัปเดต path ปัจจุบัน
   };

   const handleLogout = () => {
      actionLogout();
      navigate('/');
      // เพิ่ม code สำหรับ redirect ไปหน้า login หรือหน้าอื่น ๆ ที่ต้องการ
   };

   return (
      <>
         <header className="flex justify-between items-center p-4 border-b">
            {/* <div className="flex items-center">
               <span className="text-2xl font-bold mr-2">FOREVER.</span>
               <span className="text-sm text-gray-500">ADMIN PANEL</span>
            </div> */}
            <div onClick={()=> navigate("/")} className='flex justify-center items-center cursor-pointer'>
               <TapeeIcon className="w-12" />
               <p className='text-[30px]'>ShopStore</p>
            </div>
            <button onClick={handleLogout} className="bg-gray-300 hover:bg-pink-500 hover:text-white px-4 py-2 rounded">
               Logout
            </button>
         </header>

         <div className="flex">
            {/* Sidebar */}
            <aside className="w-64 p-4 border-r">
               <button
                  onClick={() => handleNavigate('/admin/profile-admin')}
                  className={`flex items-center w-full p-2 rounded ${activePath === '/admin/profile-admin' ? 'bg-pink-100' : 'hover:bg-gray-100'
                     }`}
               >
                  {/* <svg
                     xmlns="http://www.w3.org/2000/svg"
                     className="h-5 w-5 mr-2"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                     />
                  </svg> */}
                  <EditProfile className="w-6 h-6 mr-1.5" />
                  Edit Profile
               </button>
               <button
                  onClick={() => handleNavigate('/admin')}
                  className={`flex items-center w-full p-2 rounded ${activePath === '/admin' ? 'bg-pink-100' : 'hover:bg-gray-100'
                     }`}
               >
                  {/* <svg
                     xmlns="http://www.w3.org/2000/svg"
                     className="h-5 w-5 mr-2"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                     />
                  </svg> */}
                  <EditProduct className="w-5 h-5 mr-2.5" />
                  Edit Product
               </button>
               <button
                  onClick={() => handleNavigate('/admin/add-items')}
                  className={`flex items-center w-full p-2 rounded ${activePath === '/admin/add-items' ? 'bg-pink-100' : 'hover:bg-gray-100'
                     }`}
               >
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     className="h-5 w-5 mr-2"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                     />
                  </svg>
                  Add Items
               </button>
               <button
                  onClick={() => handleNavigate('/admin/list-items')}
                  className={`flex items-center w-full p-2 rounded ${activePath === '/admin/list-items' ? 'bg-pink-100' : 'hover:bg-gray-100'
                     }`}
               >
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     className="h-5 w-5 mr-2"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                     />
                  </svg>
                  List Items
               </button>
               <button
                  onClick={() => handleNavigate('/admin/admin-orders')}
                  className={`flex items-center w-full p-2 rounded ${activePath === '/admin/admin-orders' ? 'bg-pink-100' : 'hover:bg-gray-100'
                     }`}
               >
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     className="h-5 w-5 mr-2"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                     />
                  </svg>
                  Orders
               </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-4">
               <Outlet /> {/* แสดงเนื้อหาของ nested routes */}
            </main>
         </div>
      </>
   );
};

export default AdminLayout;