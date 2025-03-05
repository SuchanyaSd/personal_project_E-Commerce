import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

export default function Collection() {
   const [products, setProducts] = useState([]);
   const [filterProduct, setFilterProduct] = useState([]);
   const [category, setCategory] = useState([]);
   const [sortType, setSortType] = useState("relavent");
   const [search, setSearch] = useState("")
   const [showSearch, setShowSearch] = useState(false)

   // ดึงข้อมูลจาก backend
   useEffect(() => {
      const fetchProducts = async () => {
         try {
            const res = await axios.get("http://localhost:8008/api/product/allproducts"); // เปลี่ยน URL ตาม backend ของคุณ
            const fetchedProducts = res.data.map(item => ({
               id: item.id,
               name: item.name,
               price: item.price,
               category: item.category, // ต้องมี field นี้ใน backend
               subCategory: item.subCategory, // ต้องมี field นี้ใน backend
               image: item.AllImages.length > 0 ? item.AllImages.map(img => img.url) : [],
            }));
            setProducts(fetchedProducts);
            setFilterProduct(fetchedProducts);
         } catch (error) {
            console.error("Error fetching products:", error);
         }
      };

      fetchProducts();
   }, []);

   // ฟังก์ชันกรองสินค้า
   useEffect(() => {
      let filtered = [...products];

      if (showSearch && search) {
         filtered = filtered.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
      }
      if (category.length > 0) {
         filtered = filtered.filter(item => category.includes(item.category));
      }

      setFilterProduct(filtered);
   }, [category, search, showSearch, products]);

   // ฟังก์ชันเรียงสินค้า
   useEffect(() => {
      let sortedProducts = [...filterProduct];

      switch (sortType) {
         case "low-high":
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
         case "high-low":
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
         default:
            break;
      }

      setFilterProduct(sortedProducts);
   }, [sortType]);

   return (
      <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
         {/* Right side */}
         <div className="flex-1">
            <div className="flex justify-between text-base sm:text-2xl mb-4">
               <Title text1={"ALL"} text2={"COLLECTION"} />
               <select onChange={(e) => setSortType(e.target.value)} className="border-2 rounded-md border-gray-300 text-sm px-2">
                  <option value="relavent">Sort by: Relevant</option>
                  <option value="low-high">Sort by: Low to High</option>
                  <option value="high-low">Sort by: High to Low</option>
               </select>
            </div>

            {/* Map Product */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
               {filterProduct.map((item, index) => (
                  <ProductItem key={index} name={item.name} id={item.id} price={item.price} image={item.image[0]} />
               ))}
            </div>
         </div>
      </div>
   );
}
