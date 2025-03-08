import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditeItem from './EditItem';
import { useNavigate } from 'react-router';

export default function Admin() {
   const [products, setProducts] = useState([]);
   const [filterProduct, setFilterProduct] = useState([]);
   const [category, setCategory] = useState([]);
   const [sortType, setSortType] = useState("relavent");
   const [search, setSearch] = useState("");
   const [showSearch, setShowSearch] = useState(false);
   const navigate = useNavigate(); // เพิ่ม useNavigate

   useEffect(() => {
      const fetchProducts = async () => {
         try {
            const res = await axios.get("http://localhost:8008/api/product/allproducts");
            const fetchedProducts = res.data.map(item => ({
               id: item.id,
               name: item.name,
               price: item.price,
               category: item.category,
               subCategory: item.subCategory,
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

   return (
      <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
         <div className="flex-1">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
               {filterProduct.map((item, index) => (
                  <EditeItem key={index} name={item.name} id={item.id} price={item.price} image={item.image[0]} />
               ))}
            </div>
         </div>
      </div>
   );
}