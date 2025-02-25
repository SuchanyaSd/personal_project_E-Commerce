import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'

const Cart = () => {

  const { products, currency, cartItems } = useContext(ShopContext)
  const [cartData, setCartData] = useState([])

  useEffect(() => {
    // console.log(cartItems)
    const tempData = []
    for (const items of Object.keys(cartItems)) {
      for (const item of Object.keys(cartItems[items])) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            id: items,
            size: item,
            quantity: cartItems[items][item]
          })
        }
      }
    }
    setCartData(tempData)
  }, [cartItems])

  return (
    <div className='border-t pt-14'>
      <div className="text-2xl mb-3">
        <Title text1={"YOUR"} text2={"CART"}/>
      </div>

      <div>
        {
          cartData.map((item, index) => {
            const productData = products.find((product) => String(product.id) === String(item.id))
            // console.log(productData)
            return (
              <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr-2fr-0.5fr] items-center gap-4'>
                <div className="flex items-start gap-6">
                  <img className='w-16 sm:w-20' src={productData.image[0]}/>
                  <div>
                    <p className="text-xs sm:text-lg font-medium">{productData.name}</p>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Cart
