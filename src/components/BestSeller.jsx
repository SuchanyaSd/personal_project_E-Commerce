// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Title from './Title';
// import ProductItem from './ProductItem';

// const BestSeller = () => {
//    const [bestSeller, setBestSeller] = useState([]);
//    const [loading, setLoading] = useState(true);
//    const [error, setError] = useState(null);

//    useEffect(() => {
//       const fetchBestSellers = async () => {
//          setLoading(true);
//          setError(null);
//          try {
//             const response = await axios.get("http://localhost:8008/api/product/allproducts"); // ดึงข้อมูลจาก API
//             const bestProducts = response.data.filter((item) => item.bestseller); // กรอง bestseller
//             setBestSeller(bestProducts.slice(0, 10)); // รับ 10 สินค้าแรก
//          } catch (err) {
//             setError(err.message);
//          } finally {
//             setLoading(false);
//          }
//       };

//       fetchBestSellers();
//    }, []);

//    if (loading) {
//       return <div>Loading...</div>;
//    }

//    if (error) {
//       return <div>Error: {error}</div>;
//    }

//    return (
//       <div className='my-10'>
//          <div className="text-center text-3xl py-8">
//             <Title text1={"BEST"} text2={"SELLERS"} />
//             <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
//                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur modi inventore dicta quibusdam rerum vero, eaque voluptatem esse maiores facilis expedita et neque harum dignissimos labore dolores, porro illo quasi.
//             </p>
//          </div>

//          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
//             {bestSeller.map((item, index) => (
//                <ProductItem
//                   key={index}
//                   id={item.id}
//                   name={item.name}
//                   image={item.AllImages[0]?.url} // ดึง URL จาก AllImages
//                   price={item.price}
//                />
//             ))}
//          </div>
//       </div>
//    );
// };

// export default BestSeller;





import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
   const [bestSeller, setBestSeller] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const [selectedProduct, setSelectedProduct] = useState(null); // เพิ่ม state

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

   const handleImageClick = async (productId) => {
      try {
         const response = await axios.get(`http://localhost:8008/api/product/list/${productId}`); // ดึงข้อมูล product จาก productId
         setSelectedProduct(response.data);
      } catch (err) {
         setError(err.message);
      }
   };

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
                  onClick={() => handleImageClick(item.id)} // เพิ่ม onClick handler
               />
            ))}
         </div>

         {/* แสดงข้อมูล selectedProduct */}
         {selectedProduct && (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
               <div className="bg-white p-8 rounded-lg">
                  <h2>{selectedProduct.name}</h2>
                  <p>{selectedProduct.description}</p>
                  <p>Price: ${selectedProduct.price}</p>
                  <button onClick={() => setSelectedProduct(null)}>Close</button>
               </div>
            </div>
         )}
      </div>
   );
};

export default BestSeller;