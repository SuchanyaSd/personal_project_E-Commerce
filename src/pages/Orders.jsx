import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Title from '../components/Title';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const customerId = 2; // เปลี่ยนเป็นค่าจริงของ user ที่ login (ถ้ามีระบบ auth)

    useEffect(() => {
        const fetchOrders = async () => {
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
                                    <p className={`text-sm font-semibold ${order.paymentStatus === 'Pai' ? 'text-green-500' : 'text-red-500'}`}>
                                        Payment: {order.paymentStatus === 'Pai' ? 'Paid' : 'Unpaid'}
                                    </p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className={`w-2 h-2 rounded-full ${order.paymentStatus === 'Pai' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                    <span className="text-sm text-gray-600">{order.paymentStatus === 'Pai' ? 'Paid' : 'Unpaid'}</span>
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
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Orders;