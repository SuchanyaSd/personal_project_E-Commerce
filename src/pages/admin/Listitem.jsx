import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Listitem = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8008/api/product/allproducts');
        const formattedProducts = response.data.map(product => ({
          id: product.id,
          image: product.AllImages.length > 0 ? product.AllImages[0].url : 'path/to/default-image.jpg',
          name: product.name,
          category: product.bestseller ? 'Bestseller' : 'General',
          price: `$${product.price}`,
        }));
        setProducts(formattedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:8008/api/product/delete/${id}`); // แก้ไขตรงนี้
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">All Products List</h2>
      <table className="w-full text-left table-auto">
        <thead>
          <tr>
            <th className="py-2 px-4">Image</th>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Category</th>
            <th className="py-2 px-4">Price</th>
            <th className="py-2 px-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-t">
              <td className="py-2 px-4">
                <img src={product.image} alt={product.name} className="w-12 h-12 object-cover rounded-md" />
              </td>
              <td className="py-2 px-4">{product.name}</td>
              <td className="py-2 px-4">{product.category}</td>
              <td className="py-2 px-4">{product.price}</td>
              <td className="py-2 px-4">
                <button
                  className="text-red-500 font-semibold"
                  onClick={() => deleteProduct(product.id)}
                >
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Listitem;
