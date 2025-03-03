import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { ShopContext } from '../context/ShopContext'
// import { assets } from '../assets/frontend_assets/assets'
import RelatedProducts from '../components/RelatedProducts'

export default function Product() {

  const { productId } = useParams()
  const { products, currency, addToCart } = useContext(ShopContext)
  const [productData, setProductData] = useState(false)
  const [image, setImage] = useState("")
  const [size, setSize] = useState("")

  const fetchProductData = async () => {
    products.map((item) => {
      // console.log(item.id, +productId)
      if (item.id === +productId) {
        setProductData(item)
        setImage(item.image)
        // console.log(item)
        return null
      }
    })
  }

  useEffect(() => {
    fetchProductData()
  }, [productId, products])

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* Product Data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product Images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {
              productData.image.map((item, index) => {
                return <img onClick={() => setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' />
              })
            }
          </div>

          <div className="w-full sm:w-[80%]">
            <img className='w-[50vw] h-auto' src={image[0]} />
          </div>
        </div>

        {/* Product info */}
        <div className="flex-1">
          <h1 className="font-medium text-4xl mt-2">{productData.name}</h1>
          {/* <div className="flex items-center gap-1 mt-2">
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_icon} alt="" className="w-3 5" />
              <img src={assets.star_dull_icon} alt="" className="w-3 5" />
              <p className="pl-2">(122)</p>
            </div> */}
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className="mt-5 text-xl text-gray-600 md:w-4/5">{productData.description}</p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button onClick={() => setSize(item)} className={`border py-2 px-4 bg-gray-100 ${item === size ? "bg-pink-300" : ""}`} key={index}>{item}</button>
              ))}
            </div>
          </div>
          <button onClick={() => addToCart(productData.id, size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Description & Review section */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Review (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel consequuntur non fugit, inventore ipsam tenetur. Nulla, veniam eum. Optio deserunt deleniti modi distinctio voluptatibus pariatur et, dolorum magni aliquam nihil quidem non quia eveniet quae aut natus consequuntur voluptatem facere. Optio velit ut, molestias reprehenderit autem iusto corrupti. Eius alias autem fugiat libero unde hic eligendi. Maiores tempore vero, nihil quas ipsum repudiandae quos libero rerum ut dolores, iste modi quia ratione nisi obcaecati, recusandae accusantium non. Deleniti eveniet provident aliquam tenetur quae voluptas facilis optio quis aspernatur. Doloremque dolor aut ipsam dignissimos iste officiis eos impedit, totam eaque pariatur!</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat ipsam maiores, libero cum quo beatae distinctio ipsa dolores atque, asperiores eligendi natus veniam laudantium eaque ex molestiae, id sed mollitia.</p>
        </div>
      </div>

      {/* Display rekated products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />

    </div>

  ) : <div className="opacity-0"></div>
}






import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import RelatedProducts from '../components/RelatedProducts';

export default function Product() {
  const { productId } = useParams();
  const { currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null); // เปลี่ยนเป็น null เริ่มต้น
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`http://localhost:8008/api/product/list/${productId}`); // ดึงข้อมูลจาก API
        setProductData(response.data);
        setImage(response.data.AllImages[0]?.url); // ตั้งค่ารูปภาพเริ่มต้น
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [productId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* Product Data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product Images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
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

        {/* Product info */}
        <div className="flex-1">
          <h1 className="font-medium text-4xl mt-2">{productData.name}</h1>
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className="mt-5 text-xl text-gray-600 md:w-4/5">{productData.description}</p>
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
          <button onClick={() => addToCart(productData.id, size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Description & Review section */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Review (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel consequuntur non fugit, inventore ipsam tenetur. Nulla, veniam eum. Optio deserunt deleniti modi distinctio voluptatibus pariatur et, dolorum magni aliquam nihil quidem non quia eveniet quae aut natus consequuntur voluptatem facere. Optio velit ut, molestias reprehenderit autem iusto corrupti. Eius alias autem fugiat libero unde hic eligendi. Maiores tempore vero, nihil quas ipsum repudiandae quos libero rerum ut dolores, iste modi quia ratione nisi obcaecati, recusandae accusantium non. Deleniti eveniet provident aliquam tenetur quae voluptas facilis optio quis aspernatur. Doloremque dolor aut ipsam dignissimos iste officiis eos impedit, totam eaque pariatur!</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat ipsam maiores, libero cum quo beatae distinctio ipsa dolores atque, asperiores eligendi natus veniam laudantium eaque ex molestiae, id sed mollitia.</p>
        </div>
      </div>

      {/* Display rekated products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
}