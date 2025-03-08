import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Additem = () => {
   const [productData, setProductData] = useState({
      name: '',
      description: '',
      price: '',
      category: '',
      subcategory: '',
      bestseller: false,
   });
   const [selectedSizes, setSelectedSizes] = useState([]);
   const [images, setImages] = useState([]);
   const [imagePreviews, setImagePreviews] = useState([]);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setProductData({ ...productData, [name]: value });
   };

   const handleSizeSelection = (size) => {
      setSelectedSizes((prev) =>
         prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
      );
   };

   const handleImageUpload = (e) => {
      const files = Array.from(e.target.files);
      setImages(files);
      setImagePreviews(files.map(file => URL.createObjectURL(file)));
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('name', productData.name);
      formData.append('description', productData.description);
      formData.append('price', productData.price);
      formData.append('category', productData.category);
      selectedSizes.forEach((size) => formData.append('sizes', size));
      images.forEach((img) => formData.append('images', img));

      try {
         const response = await axios.post('http://localhost:8008/api/product/add', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
         });
         toast('Product added successfully!');
         console.log(response.data);
      } catch (error) {
         toast.error('Failed to add product.');
         console.error('Error adding product:', error);
      }
   };

   return (
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg mx-auto">
         <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Upload Image</h2>
            <input type="file" multiple onChange={handleImageUpload} className="mb-2 border-1 rounded-md" />
            <div className="flex space-x-2 mt-2">
               {imagePreviews.map((src, index) => (
                  <img key={index} src={src} alt={`Preview ${index}`} className="w-20 h-20 object-cover border rounded-md" />
               ))}
            </div>
         </div>

         <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Product name</label>
            <input type="text" name="name" value={productData.name} onChange={handleChange} className="mt-1 p-2 border rounded-md w-full" placeholder="Men's T-Shirt Test" required />
         </div>

         <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Product description</label>
            <textarea name="description" value={productData.description} onChange={handleChange} className="mt-1 p-2 border rounded-md w-full" placeholder="Description" rows="3"></textarea>
         </div>

         <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
               <label className="block text-sm font-medium text-gray-700">Product category</label>
               <select name="category" value={productData.category} onChange={handleChange} className="mt-1 p-2 border rounded-md w-full">
                  <option>Men</option>
                  <option>Women</option>
                  <option>Kids</option>
               </select>
            </div>
            <div>
               <label className="block text-sm font-medium text-gray-700">Sub category</label>
               <select name="subcategory" value={productData.subcategory} onChange={handleChange} className="mt-1 p-2 border rounded-md w-full">
                  <option>Topwear</option>
                  <option>Bottomwear</option>
                  <option>Accessories</option>
               </select>
            </div>
            <div>
               <label className="block text-sm font-medium text-gray-700">Product Price</label>
               <input type="number" name="price" value={productData.price} onChange={handleChange} className="mt-1 p-2 border rounded-md w-full" placeholder="80" required />
            </div>
         </div>

         <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Product Sizes</label>
            <div className="flex space-x-2 mt-2">
               {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                  <button type="button" key={size} onClick={() => handleSizeSelection(size)}
                     className={`px-4 py-2 border rounded-md ${selectedSizes.includes(size) ? 'bg-pink-500 text-white' : ''}`}>
                     {size}
                  </button>
               ))}
            </div>
         </div>

         <div className="mb-6">
            <label className="inline-flex items-center">
               <input type="checkbox" name="bestseller" checked={productData.bestseller} onChange={() => setProductData({ ...productData, bestseller: !productData.bestseller })} className="form-checkbox h-5 w-5 text-indigo-600" />
               <span className="ml-2 text-sm text-gray-700">Add to bestseller</span>
            </label>
         </div>

         <button type="submit" className="w-full bg-black text-white py-2 rounded-md hover:bg-pink-600">ADD</button>
      </form>
   );
}

export default Additem;
