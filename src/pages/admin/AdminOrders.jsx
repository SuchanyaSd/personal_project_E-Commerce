// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const AdminOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await axios.get('http://localhost:8008/api/order/orders'); // เปลี่ยน path ตาม route ที่คุณตั้งไว้
//         setOrders(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <>
//       {/* Order Page Content */}
//       <main className="flex-1 p-4">
//         <h2 className="text-lg font-semibold mb-4">Order Page</h2>

//         {orders.map((order) => (
//           <div key={order.id} className="border rounded p-4 mb-4">
//             <div className="flex items-start">
//               {order.orderItems.length > 0 && (
//                 <img
//                   src={order.orderItems[0].products?.AllImages?.[0]?.url || ''} // ดึงรูปภาพแรกจาก orderItems
//                   alt={order.orderItems[0].products?.name || 'Product'}
//                   className="w-16 h-16 bg-gray-200 rounded mr-4"
//                 />
//               )}
//               <div>
//                 <p className="font-semibold">{order.orderItems[0]?.products?.name || 'Product Name'}</p>
//                 <p className="text-sm text-gray-600">{order.address || 'Address'}</p>
//               </div>
//             </div>
//             <div className="mt-4 flex justify-between items-center">
//               <div>
//                 <p className="text-sm">Quantity: {order.orderItems.reduce((acc, item) => acc + item.quantity, 0)}</p>
//                 <p className="text-sm">Total Price: ${order.totalPrice}</p>
//                 <p className="text-sm">Payment Method: {order.paymentMethod}</p>
//                 <p className="text-sm">Payment Status: {order.paymentStatus}</p>
//                 <p className="text-sm">Order Date: {new Date(order.orderDate).toLocaleDateString()}</p>
//               </div>
//               <div>
//                 <span className="font-semibold">${order.totalPrice}</span>
//                 <select className="border rounded p-1 ml-4">
//                   <option>pending</option>
//                   <option>Packing</option>
//                   <option>Shipped</option>
//                   <option>Delivered</option>
//                 </select>
//               </div>
//             </div>
//           </div>
//         ))}
//       </main>
//     </>
//   );
// };

// export default AdminOrders;




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BoxIcon } from '../../icon/icon';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8008/api/order/orders');
        setOrders(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, status) => {
    try {
      await axios.put(`http://localhost:8008/api/order/orders/${orderId}`, { paymentStatus: status });
      setOrders(orders.map(order => order.id === orderId ? { ...order, paymentStatus: status } : order));
      alert('Order status updated successfully!');
    } catch (err) {
      console.log(err);
      setError(err.message);
      alert('Failed to update order status.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <main className="flex-1 p-4">
        <h2 className="text-lg font-semibold mb-4">Order Page</h2>

        {orders.map((order) => (
          <div key={order.id} className="border rounded p-4 mb-4">
            <div className="flex items-start">
              {order.orderItems.length > 0 && (
                // <img
                //   src={order.orderItems[0].products?.AllImages?.[0]?.url || ''}
                //   alt={order.orderItems[0].products?.name || 'Product'}
                //   className="w-16 h-16 bg-gray-200 rounded mr-4"
                // />
                <BoxIcon className="w-16 h-16 rounded mr-4" />
              )}
              <div>
                {/* <p className="font-semibold">{order.orderItems[0]?.products?.name || 'Product Name'}</p> */}
                <p className="font-semibold">Order ID : {order.id || 'Product Name'}</p>
                <p className="text-sm text-gray-600">{order.address || 'Address'}</p>
              </div>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <div>
                <p className="text-sm">Quantity: {order.orderItems.reduce((acc, item) => acc + item.quantity, 0)}</p>
                <p className="text-sm">Total Price: ${order.totalPrice}</p>
                <p className="text-sm">Payment Method: {order.paymentMethod}</p>
                <p className="text-sm">Payment Status: {order.paymentStatus}</p>
                <p className="text-sm">Order Date: {new Date(order.orderDate).toLocaleDateString()}</p>
              </div>
              <div>
                <span className="font-semibold">${order.totalPrice}</span>
                <select
                  className="border rounded p-1 ml-4"
                  value={order.paymentStatus} // ตั้งค่า value ของ select เป็น paymentStatus ของ order
                  onChange={e => handleStatusChange(order.id, e.target.value)}
                >
                  <option value="pending">pending</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </main>
    </>
  );
};

export default AdminOrders;