import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductItem from './ProductItem';

const ProductList = () => {
   const [products, setProducts] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
      const fetchProducts = async () => {
         setLoading(true);
         setError(null);
         try {
            const response = await axios.get("http://localhost:8008/api/product/allproducts"); // เปลี่ยน endpoint ตาม backend ของคุณ
            setProducts(response.data);
         } catch (err) {
            setError(err.message);
         } finally {
            setLoading(false);
         }
      };

      fetchProducts();
   }, []);

   if (loading) {
      return <div>Loading...</div>;
   }

   if (error) {
      return <div>Error: {error}</div>;
   }

   return (
      <div>
         {products.map((product) => (
            <ProductItem
               key={product.id}
               id={product.id}
               image={product.AllImages[0]?.url}
               name={product.name}
               price={product.price}
            />
         ))}
      </div>
   );
};

export default ProductList;