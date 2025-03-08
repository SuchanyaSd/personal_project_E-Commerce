import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function ProductEdite() {
   const { productId } = useParams();
   const navigate = useNavigate();
   const [productData, setProductData] = useState({
      name: '',
      description: '',
      price: 0,
      bestseller: false,
      images: [], // เพิ่ม state สำหรับเก็บรูปภาพ
   });
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
      const fetchProductData = async () => {
         setLoading(true);
         setError(null);
         try {
            const response = await axios.get(`http://localhost:8008/api/product/list/${productId}`);
            setProductData({
               name: response.data.name,
               description: response.data.description,
               price: response.data.price,
               bestseller: response.data.bestseller,
               images: response.data.AllImages.map((img) => img.url), // ดึง URL ของรูปภาพ
            });
         } catch (err) {
            setError(err.message);
         } finally {
            setLoading(false);
         }
      };
      fetchProductData();
   }, [productId]);

   const handleChange = (e) => {
      const { name, value, type, checked } = e.target;

      setProductData((prevData) => ({
         ...prevData,
         [name]: type === 'checkbox' ? checked : name === 'price' ? Number(value) : value,
      }));
   };


   const handleSubmit = async (e) => {
      e.preventDefault();

      const updatedData = {
         ...productData,
         price: Number(productData.price), // แปลง price เป็นตัวเลขก่อนส่ง
      };

      try {
         await axios.patch(`http://localhost:8008/api/product/edit/${productId}`, updatedData);
         toast.success('Product updated successfully!');
         navigate('/admin/list-items');
      } catch (err) {
         toast.error('Failed to update product.');
         console.error('Error updating product:', err);
      }
   };


   if (loading) return <div>Loading...</div>;
   if (error) return <div>Error: {error}</div>;

   return (
      <div className="border-t-2 pt-10">
         <div className="max-w-md mx-auto p-4 bg-white rounded shadow">
            <h2 className="text-2xl font-semibold mb-4">Edit Product</h2>
            <form onSubmit={handleSubmit}>
               {/* แสดงรูปภาพ */}
               <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Images</label>
                  <div className="flex flex-wrap gap-2">
                     {productData.images.map((image, index) => (
                        <img
                           key={index}
                           src={image}
                           alt={`Product Image ${index}`}
                           className="w-20 h-20 object-cover rounded"
                        />
                     ))}
                  </div>
               </div>
               <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                     Name
                  </label>
                  <input
                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                     id="name"
                     name="name"
                     type="text"
                     value={productData.name}
                     onChange={handleChange}
                  />
               </div>
               <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                     Description
                  </label>
                  <textarea
                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                     id="description"
                     name="description"
                     value={productData.description}
                     onChange={handleChange}
                  />
               </div>
               <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                     Price
                  </label>
                  <input
                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                     id="price"
                     name="price"
                     type="number"
                     value={productData.price}
                     onChange={handleChange}
                  />
               </div>
               <div className="mb-4">
                  <label className="inline-flex items-center">
                     <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-pink-600"
                        name="bestseller"
                        checked={productData.bestseller}
                        onChange={handleChange}
                     />
                     <span className="ml-2 text-gray-700">Bestseller</span>
                  </label>
               </div>
               <div className="flex items-center justify-between">
                  <button
                     className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                     type="submit"
                  >
                     Update Product
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
}