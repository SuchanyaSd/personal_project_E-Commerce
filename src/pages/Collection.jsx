import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';
import { ChevronRight } from "lucide-react";
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

export default function Collection() {
   const { search, showSearch } = useContext(ShopContext);
   const [products, setProducts] = useState([]);
   const [filterProduct, setFilterProduct] = useState([]);
   const [category, setCategory] = useState([]);
   const [subCategory, setSubCategory] = useState([]);
   const [sortType, setSortType] = useState("relavent");
   const [showFilter, setShowFilter] = useState(false);

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

   const toggleCategory = (e) => {
      const value = e.target.value;
      console.log(e.target.value);
      setCategory((prev) =>
         prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
      );
   };

   // ฟังก์ชันกรองสินค้า
   useEffect(() => {
      let filtered = [...products];

      if (showSearch && search) {
         filtered = filtered.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
      }
      if (category.length > 0) {
         filtered = filtered.filter(item => category.includes(item.category));
      }
      if (subCategory.length > 0) {
         filtered = filtered.filter(item => subCategory.includes(item.subCategory));
      }

      setFilterProduct(filtered);
   }, [category, subCategory, search, showSearch, products]);

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
         {/* Filter option */}
         <div className="min-w-60">
            <p onClick={() => setShowFilter(!showFilter)} className="my-2 text-xl flex items-center cursor-pointer gap-2">FILTERS
               <ChevronRight className={`h-5 sm:hidden ${showFilter ? "rotate-90" : ""}`} />
            </p>
            {/* Category filter */}
            <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block`}>
               <p className="mb-3 text-sm font-medium">CATEGORIES</p>
               <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                  <label className="flex gap-2">
                     <input type="checkbox" value="Men" onChange={toggleCategory} />Men
                  </label>
                  <label className="flex gap-2">
                     <input type="checkbox" value="Women" onChange={toggleCategory} />Women
                  </label>
                  <label className="flex gap-2">
                     <input type="checkbox" value="Kids" onChange={toggleCategory} />Kids
                  </label>
               </div>
            </div>
         </div>

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
