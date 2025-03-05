// import React, { useContext, useEffect, useState } from 'react';
// import { useParams } from 'react-router';
// import { ShopContext } from '../context/ShopContext';
// import axios from 'axios';
// import RelatedProducts from '../components/RelatedProducts';

// export default function Product() {
//   const { productId } = useParams();
//   const { currency } = useContext(ShopContext);

//   const [productData, setProductData] = useState(null);
//   const [image, setImage] = useState("");
//   const [size, setSize] = useState("");
//   const [quantity, setQuantity] = useState(1);
//   const [customerId, setCustomerId] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchProductData = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await axios.get(`http://localhost:8008/api/product/list/${productId}`);
//         setProductData(response.data);
//         setImage(response.data.AllImages[0]?.url);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     const fetchCustomerId = async () => {
//       try {
//         const token = localStorage.getItem("token"); // ดึง token จาก localStorage
//         if (!token) return;

//         const response = await axios.get("http://localhost:8008/api/user/customerId", {
//           headers: { Authorization: `Bearer ${token}` }
//         });

//         setCustomerId(response.data.customerId);
//       } catch (err) {
//         console.error("Error fetching customer ID:", err);
//       }
//     };

//     fetchProductData();
//     fetchCustomerId();
//   }, [productId]);

//   const handleAddToCart = async () => {
//     if (!size) {
//       alert("Please select a size.");
//       return;
//     }
//     if (!customerId) {
//       alert("Please log in to add items to your cart.");
//       return;
//     }

//     try {
//       await axios.post("http://localhost:8008/api/cart/add", {
//         customerId,
//         productId,
//         quantity
//       });

//       alert("Added to cart successfully!");
//     } catch (err) {
//       console.error("Error adding to cart:", err);
//       alert("Failed to add to cart.");
//     }
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return productData ? (
//     <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
//       <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
//         {/* Product Images */}
//         <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
//           <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
//             {productData.AllImages.map((item, index) => (
//               <img
//                 onClick={() => setImage(item.url)}
//                 src={item.url}
//                 key={index}
//                 className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'
//               />
//             ))}
//           </div>
//           <div className="w-full sm:w-[80%]">
//             <img className='w-[50vw] h-auto' src={image} alt={productData.name} />
//           </div>
//         </div>

//         {/* Product Info */}
//         <div className="flex-1">
//           <h1 className="font-medium text-4xl mt-2">{productData.name}</h1>
//           <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
//           <p className="mt-5 text-xl text-gray-600 md:w-4/5">{productData.description}</p>

//           {/* Select Size */}
//           <div className="flex flex-col gap-4 my-8">
//             <p>Select Size</p>
//             <div className="flex gap-2">
//               {productData.sizes.map((item, index) => (
//                 <button
//                   onClick={() => setSize(item.size.size)}
//                   className={`border py-2 px-4 bg-gray-100 ${item.size.size === size ? "bg-pink-300" : ""}`}
//                   key={index}
//                 >
//                   {item.size.size}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Select Quantity */}
//           <div className="flex items-center gap-4 my-4">
//             <p>Quantity:</p>
//             <button
//               onClick={() => setQuantity(prev => (prev > 1 ? prev - 1 : 1))}
//               className="border px-3 py-1 bg-gray-100"
//             >-</button>
//             <span className="text-lg">{quantity}</span>
//             <button
//               onClick={() => setQuantity(prev => prev + 1)}
//               className="border px-3 py-1 bg-gray-100"
//             >+</button>
//           </div>

//           <button onClick={handleAddToCart} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>
//             ADD TO CART
//           </button>

//           <hr className="mt-8 sm:w-4/5" />

//           <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
//             <p>100% Original product.</p>
//             <p>Cash on delivery is available on this product.</p>
//             <p>Easy return and exchange policy within 7 days.</p>
//           </div>
//         </div>
//       </div>

//       {/* Related Products */}
//       <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
//     </div>
//   ) : (
//     <div className="opacity-0"></div>
//   );
// }



import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { toast } from 'react-toastify';
import RelatedProducts from '../components/RelatedProducts';
import useCartStore from '../store/order_store';

export default function Product() {
  const { productId } = useParams();
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { cart, addToCart } = useCartStore();
  console.log(cart)

  useEffect(() => {
    const fetchProductData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`http://localhost:8008/api/product/list/${productId}`);
        setProductData(response.data);
        setImage(response.data.AllImages[0]?.url);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProductData();
  }, [productId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return productData ? (
    <div className='border-t-2 pt-10'>
      <div className="flex flex-col sm:flex-row gap-12">
        {/* Product Images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll sm:w-[18.7%] w-full">
            {productData.AllImages.map((item, index) => (
              <img
                onClick={() => setImage(item.url)}
                src={item.url}
                key={index}
                className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img className='w-[50vw] h-auto' src={image} alt={productData.name} />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h1 className="font-medium text-4xl mt-2">{productData.name}</h1>
          <p className='mt-5 text-3xl font-medium'>{productData.price} THB</p>
          <p className="mt-5 text-xl text-gray-600 md:w-4/5">{productData.description}</p>

          {/* Select Size */}
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item.size.size)}
                  className={`border py-2 px-4 bg-gray-100 ${item.size.size === size ? "bg-pink-300" : ""}`}
                  key={index}
                >
                  {item.size.size}
                </button>
              ))}
            </div>
          </div>

          {/* Select Quantity */}
          <div className="flex items-center gap-4 my-4">
            <p>Quantity:</p>
            <button onClick={() => setQuantity(prev => (prev > 1 ? prev - 1 : 1))} className="border px-3 py-1 bg-gray-100">-</button>
            <span className="text-lg">{quantity}</span>
            <button onClick={() => setQuantity(prev => prev + 1)} className="border px-3 py-1 bg-gray-100">+</button>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => {
              if (!size) {
                toast.error("Please select a size before adding to cart!");
                return; // ถ้ายังไม่เลือก size หยุดทำงาน
              }

              if (cart.length === 0) {
                addToCart({
                  id: productId,
                  size: size,
                  image: image,
                  quantity: quantity,
                  price: productData.price,
                  name: productData.name
                });
              } else {
                let found = false; // ใช้ตัวแปรเช็คว่ามีสินค้าอยู่แล้วหรือไม่

                cart.forEach((item) => {
                  if (item.id === productId && item.size === size) {
                    item.quantity += quantity;
                    found = true; // ถ้าเจอสินค้าแล้ว ให้เปลี่ยนค่าเป็น true
                  }
                });

                if (!found) {
                  // ถ้าไม่เจอสินค้า ให้เพิ่มสินค้าใหม่
                  addToCart({
                    id: productId,
                    size: size,
                    image: image,
                    quantity: quantity,
                    price: productData.price,
                    name: productData.name
                  });
                }
              }
              toast.success("Added to cart!");
            }}
            disabled={size === ""} // ปิดปุ่มถ้ายังไม่ได้เลือกไซส์
            className={`px-8 py-3 text-sm text-white ${size === "" ? "bg-gray-400 cursor-not-allowed" : "bg-black active:bg-gray-700"}`}
          >
            ADD TO CART
          </button>


          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {/* <RelatedProducts category={productData.category} subCategory={productData.subCategory} /> */}
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
}