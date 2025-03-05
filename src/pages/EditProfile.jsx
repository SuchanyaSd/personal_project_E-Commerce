import React from 'react';

function ProfileForm() {
   return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
         <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
               Profile
               <button className="ml-auto text-blue-500 hover:underline">
                  ← back
               </button>
            </h2>

            <div className="mb-4">
               <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name<span className="text-red-500">*</span>
               </label>
               <input
                  type="text"
                  id="name"
                  placeholder="your name"
                  className="mt-1 p-2 w-full border rounded-md"
               />
            </div>

            <div className="mb-4">
               <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address<span className="text-red-500">*</span>
               </label>
               <input
                  type="email"
                  id="email"
                  placeholder="admin@admin.com"
                  className="mt-1 p-2 w-full border rounded-md"
               />
            </div>

            <div className="mb-6">
               <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  New password
               </label>
               <input
                  type="password"
                  id="password"
                  className="mt-1 p-2 w-full border rounded-md"
               />
            </div>

            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded">
               Save changes
            </button>
         </div>
      </div>
   );
}

export default ProfileForm;