// import React, { useContext, useEffect, useState } from 'react'
// import { ShopContext } from '../context/ShopContext'
// import Title from './Title'
// import ProductItem from './ProductItem'

// const BestSeller = () => {

//    const { products } = useContext(ShopContext)
//    const [bestSeller, setBestSeller] = useState([])

//    useEffect(() => {
//       const bestProduct = products.filter((item) => (item.bestseller))
//       setBestSeller(bestProduct.slice(0, 10))
//    }, [])
//    return (
//       <div className='my-10'>
//          <div className="text-center text-3xl py-8">
//             <Title text1={"BEST"} text2={"SELLERS"} />
//             <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
//                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur modi inventore dicta quibusdam rerum vero, eaque voluptatem esse maiores facilis expedita et neque harum dignissimos labore dolores, porro illo quasi.
//             </p>
//          </div>

//          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
//             {
//                bestSeller.map((item, index)=>(
//                   <ProductItem key={index} id={item.id} name={item.name} image={item.image[0]} price={item.price}/>
//                ))
//             }
//          </div>

//       </div>
//    )
// }

// export default BestSeller



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
   const [bestSeller, setBestSeller] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
      const fetchBestSellers = async () => {
         setLoading(true);
         setError(null);
         try {
            const response = await axios.get("http://localhost:8008/api/product/allproducts");
            const bestProducts = response.data.filter((item) => item.bestseller);
            setBestSeller(bestProducts.slice(0, 10));
         } catch (err) {
            setError(err.message);
         } finally {
            setLoading(false);
         }
      };

      fetchBestSellers();
   }, []);

   if (loading) {
      return <div>Loading...</div>;
   }

   if (error) {
      return <div>Error: {error}</div>;
   }

   return (
      <div className='my-10'>
         <div className="text-center text-3xl py-8">
            <Title text1={"BEST"} text2={"SELLERS"} />
            <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
               Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur modi inventore dicta quibusdam rerum vero, eaque voluptatem esse maiores facilis expedita et neque harum dignissimos labore dolores, porro illo quasi.
            </p>
         </div>

         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
            {bestSeller.map((item, index) => (
               <ProductItem
                  key={index}
                  id={item.id}
                  name={item.name}
                  image={item.AllImages[0]?.url}
                  price={item.price}
               />
            ))}
         </div>
      </div>
   );
};

export default BestSeller;