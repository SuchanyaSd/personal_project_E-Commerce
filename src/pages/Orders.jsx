import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Title from '../components/Title';
import useAuthStore from '../store/auth-store';
import { useNavigate } from 'react-router';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const customerId = useAuthStore((state) => state.customerId); // ดึง customerId จาก zustand store
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            if (!customerId) {
                setLoading(false);
                return navigate("/login"); // ถ้าไม่มี customerId ไม่ต้อง fetch data
            }

            try {
                const response = await axios.get(`http://localhost:8008/api/user/cart/${customerId}`);
                setOrders(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [customerId]);

    if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
    if (error) return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>;
    if (!customerId) return <div className="flex justify-center items-center h-screen">Please login to view orders.</div>; // เพิ่มเงื่อนไขตรวจสอบ customerId

    return (
        <div className="border-t pt-16 px-4 md:px-8 lg:px-16">
            <div className="text-2xl mb-8">
                <Title text1={"MY"} text2={"ORDERS"} />
            </div>

            {orders.length === 0 ? (
                <p className="text-gray-600 mt-4 text-center">No orders found.</p>
            ) : (
                <div className="space-y-6">
                    {orders.map((order, index) => (
                        <div key={index} className="bg-white rounded-lg shadow p-6 border border-gray-200">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-800">Order #{order.id}</h2>
                                    <p className="text-sm text-gray-500">Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                                    <p className="text-sm text-gray-500">Totoal : {order.totalPrice} $</p>
                                    <p className={`text-sm font-semibold ${order.paymentStatus === 'Pai' ? 'text-green-500' : 'text-red-500'}`}>
                                        Payment: {order.paymentStatus === 'Pai' ? 'Paid' : 'Unpaid'}
                                    </p>
                                    {/* <p className="text-sm text-gray-500">{order.status}</p> */}
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className={`w-2 h-2 rounded-full ${order.paymentStatus === 'Pai' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                    <p className="text-sm text-gray-600">{order.paymentStatus === 'Pai' ? 'Paid' : 'Unpaid'}</p>
                                    {/* <div className='flex flex-col'>
                                        <p className="text-l text-gray-800">{order.paymentStatus}</p>
                                    </div> */}
                                </div>
                            </div>

                            <div className="space-y-4">
                                {order.orderItems.map((item, idx) => (
                                    <div key={idx} className="flex flex-col md:flex-row md:items-center md:justify-between border-t pt-4">
                                        <div className="flex items-start gap-6 text-sm">
                                            <img className='w-16 sm:w-20 rounded-md' src={item.products.AllImages[0]?.url} alt="Product" />
                                            <div>
                                                <p className="sm:text-base font-medium text-gray-800">{item.products.name}</p>
                                                <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                                                    <p className="text-lg font-semibold">${item.products.price}</p>
                                                    <p>Qty: {item.quantity}</p>
                                                    <p>Size: {item.size.size}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button onClick={() => (navigate("/payment"))} className="btn btn-outline btn-secondary mt-6 ml-[90%]">Payment</button>
                        </div>
                    ))}
                </div>
            )}
            {/* <Link to="/payment">payment</Link> */}
            {/* <button onClick={() => (navigate("/payment"))} className="btn btn-outline btn-secondary mt-6">Payment</button> */}
        </div>
    );
};

export default Orders;