import React from 'react';
import { useNavigate } from 'react-router';

const EditeItem = ({ id, image, name, price }) => {
   const navigate = useNavigate();

   const handleClick = () => {
      navigate(`/admin/edit-product/${id}`);
   };

   return (
      <div onClick={handleClick} className="text-gray-700 cursor-pointer">
         <div className="overflow-hidden">
            <img className="hover:scale-110 transition ease-in-out" src={image} alt="image" />
         </div>
         <p className="pt-3 pb-1 text-sm">{name}</p>
         <p className="text-sm font-medium">${price}</p>
      </div>
   );
};

export default EditeItem;