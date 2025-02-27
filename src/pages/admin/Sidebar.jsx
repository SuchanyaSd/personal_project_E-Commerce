import React from 'react'

const Sidebar = () => {
   return (
      <>
         <aside className="w-64 p-4 border-r">
            <button onClick={() => handleNavigate('/add-items')} className="flex items-center w-full p-2 rounded hover:bg-gray-100">
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
            <button onClick={() => handleNavigate('/list-items')} className="flex items-center w-full p-2 rounded hover:bg-gray-100">
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
            <button onClick={() => handleNavigate('/admin-orders')} className="flex items-center w-full p-2 rounded bg-pink-100">
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
      </>
   )
}

export default Sidebar
