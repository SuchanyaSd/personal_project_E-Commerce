// import React, { useEffect, useState } from 'react';
// import axios from 'axios'; // Import Axios
// import Title from './Title';
// import ProductItem from './ProductItem';

// function LatestCollection() {
//    const [latestProducts, setLatestProducts] = useState([]);
//    const [loading, setLoading] = useState(true);
//    const [error, setError] = useState(null);

//    useEffect(() => {
//       const fetchProducts = async () => {
//          setLoading(true);
//          setError(null);
//          try {
//             const response = await axios.get("http://localhost:8008/api/product/allproducts"); // ใช้ Axios get
//             setLatestProducts(response.data.slice(0, 10)); // เข้าถึงข้อมูลจาก response.data
//          } catch (err) {
//             setError(err.message);
//          } finally {
//             setLoading(false);
//          }
//       };

//       fetchProducts();
//    }, []);

//    if (loading) {
//       return <div>Loading...</div>; // แสดง loading indicator
//    }

//    if (error) {
//       return <div>Error: {error}</div>; // แสดง error message
//    }

//    return (
//       <div className='my-10'>
//          <div className="text-center py-8 text-3xl">
//             <Title text1={"LATEST"} text2={"COLLECTIONS"} />
//             <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
//                Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro commodi obcaecati cumque animi optio recusandae. Earum
//             </p>
//          </div>

//          {/* Rendering product */}
//          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
//             {latestProducts.map((item, index) => (
//                <ProductItem
//                   key={index}
//                   id={item.id}
//                   image={item.AllImages[0]?.url}
//                   name={item.name}
//                   price={item.price}
//                />
//             ))}
//          </div>
//       </div>
//    );
// }

// export default LatestCollection;







import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Title from './Title';
import ProductItem from './ProductItem';

function LatestCollection() {
   const [latestProducts, setLatestProducts] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const [selectedProduct, setSelectedProduct] = useState(null); // เพิ่ม state

   useEffect(() => {
      const fetchProducts = async () => {
         setLoading(true);
         setError(null);
         try {
            const response = await axios.get("http://localhost:8008/api/product/allproducts");
            setLatestProducts(response.data.slice(0, 10));
         } catch (err) {
            setError(err.message);
         } finally {
            setLoading(false);
         }
      };

      fetchProducts();
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
         <div className="text-center py-8 text-3xl">
            <Title text1={"LATEST"} text2={"COLLECTIONS"} />
            <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
               Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro commodi obcaecati cumque animi optio recusandae. Earum
            </p>
         </div>

         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
            {latestProducts.map((item, index) => (
               <ProductItem
                  key={index}
                  id={item.id}
                  image={item.AllImages[0]?.url}
                  name={item.name}
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
}

export default LatestCollection;