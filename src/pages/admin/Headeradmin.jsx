import React from 'react'

const Headeradmin = () => {
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
      </>
   )
}

export default Headeradmin
