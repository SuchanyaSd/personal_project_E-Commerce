import React from 'react';
import { useNavigate, Outlet } from 'react-router';

const AdminLayout = () => {
   const navigate = useNavigate();

   const handleNavigate = (path) => {
      navigate(path);
   };

   return (
      <>
         <header className="flex justify-between items-center p-4 border-b">
            <div className="flex items-center">
               <span className="text-2xl font-bold mr-2">FOREVER.</span>
               <span className="text-sm text-gray-500">ADMIN PANEL</span>
            </div>
            <button className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded">
               Logout
            </button>
         </header>

         <div className="flex">
            {/* Sidebar */}
            <aside className="w-64 p-4 border-r">
               <button onClick={() => handleNavigate('/admin/add-items')} className="flex items-center w-full p-2 rounded hover:bg-gray-100">
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
               <button onClick={() => handleNavigate('/admin/list-items')} className="flex items-center w-full p-2 rounded hover:bg-gray-100">
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
               <button onClick={() => handleNavigate('/admin/admin-orders')} className="flex items-center w-full p-2 rounded bg-pink-100">
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