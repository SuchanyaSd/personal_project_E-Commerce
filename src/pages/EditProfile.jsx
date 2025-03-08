import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useAuthStore from '../store/auth-store';
import { toast } from 'react-toastify';

function EditProfileUser() {
   const { customerId, firstname, lastname, address, token, fetchCustomerId } = useAuthStore();
   const [profile, setProfile] = useState({
      firstname: firstname || '',
      lastname: lastname || '',
      address: address || '',
      email: '',
   });

   useEffect(() => {
      fetchCustomerId();

      const fetchUserProfile = async () => {
         if (!customerId) return;

         try {
            const res = await axios.get(`http://localhost:8008/api/user/users/${customerId}`, {
               headers: { Authorization: `Bearer ${token}` },
            });

            setProfile({
               firstname: res.data.firstname || '',
               lastname: res.data.lastname || '',
               address: res.data.address || '',
               email: res.data.email || '',
            });
            console.log(profile);
         } catch (error) {
            console.error('Error fetching user profile:', error);
         }
      };

      fetchUserProfile();
   }, [customerId, token, fetchCustomerId]);

   const handleChange = (e) => {
      setProfile({ ...profile, [e.target.name]: e.target.value });
   };

   const handleSave = async () => {
      try {
         await axios.put(`http://localhost:8008/api/user/users/${customerId}`, profile, {
            headers: { Authorization: `Bearer ${token}` },
         });

         toast.apply('Profile updated successfully!');
         fetchCustomerId(); // โหลดข้อมูลใหม่หลังจากอัปเดตสำเร็จ
      } catch (error) {
         // console.error('Error updating profile:', error);
         toast.error('Failed to update profile.');
      }
   };


   return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
         <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
               <h2 className="text-2xl font-semibold">Edit your Profile</h2>
            </div>

            <div className="mb-4">
               <div className="mt-1 flex items-center">
                  <div className="h-24 w-24 rounded-full bg-gray-300 flex items-center justify-center text-2xl font-bold text-white ">
                     {profile.firstname.charAt(0)}{profile.lastname.charAt(0)}
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
               <div>
                  <label className="block text-sm font-medium text-gray-700">First Name:</label>
                  <input
                     type="text"
                     name="firstname"
                     value={profile.firstname}
                     onChange={handleChange}
                     className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
               </div>
               <div>
                  <label className="block text-sm font-medium text-gray-700">Last Name:</label>
                  <input
                     type="text"
                     name="lastname"
                     value={profile.lastname}
                     onChange={handleChange}
                     className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
               </div>
               <div>
                  <label className="block text-sm font-medium text-gray-700">Email:</label>
                  <input
                     type="text"
                     name="email"
                     value={profile.email}
                     onChange={handleChange}
                     className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
               </div>
               <div>
                  <label className="block text-sm font-medium text-gray-700">Address:</label>
                  <input
                     type="text"
                     name="address"
                     value={profile.address}
                     onChange={handleChange}
                     className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
               </div>
            </div>

            <div className="mt-6 flex justify-end">
               <button onClick={handleSave} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Save
               </button>
            </div>
         </div>
      </div>
   );
}

export default EditProfileUser;