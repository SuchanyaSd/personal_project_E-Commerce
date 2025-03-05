import React from 'react';
import { Link } from 'react-router';

const ProductItem = ({ id, image, name, price, onClick }) => { // เพิ่ม onClick prop
  return (
    <div onClick={onClick}> {/* เพิ่ม onClick handler */}
      <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
        <div className="overflow-hidden">
          <img className='hover:scale-110 transition ease-in-out' src={image} alt="image" />
        </div>
        <p className="pt-3 pb-1 text-sm">{name}</p>
        <p className="text-sm font-medium">${price}</p>
      </Link>
    </div>
  );
};

export default ProductItem;