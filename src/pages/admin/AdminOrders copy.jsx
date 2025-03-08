import React from 'react'

const AdminOrders = () => {
  return (
    <>
      {/* Order Page Content */}
      <main className="flex-1 p-4">
        <h2 className="text-lg font-semibold mb-4">Order Page</h2>

        {/* Order Item 1 */}
        <div className="border rounded p-4 mb-4">
          <div className="flex items-start">
            {/* <div className="w-16 h-16 bg-gray-200 rounded mr-4"></div> */}
            <img src="" alt="" className="w-16 h-16 bg-gray-200 rounded mr-4" />
            <div>
              <p className="font-semibold">Men Round Neck Pure Cotton T-shirt x 3 M</p>
              {/* <p className="text-sm text-gray-600">Great Stack</p>
              <p className="text-sm text-gray-600">Main Street, Demo City, Demo State, US, 123456</p>
              <p className="text-sm text-gray-600">9876543210</p> */}
              <p className="text-sm text-gray-600">address</p>
            </div>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <div>
              <p className="text-sm">quantity</p>
              <p className="text-sm">totalPrice</p>
              <p className="text-sm">paymentMethod</p>
              <p className="text-sm">paymentStatus</p>
              <p className="text-sm">orderDate</p>
            </div>
            <div>
              <span className="font-semibold">price</span>
              <select className="border rounded p-1 ml-4">
                <option>pending</option>
                <option>Packing</option>
                <option>Shipped</option>
                <option>Delivered</option>
              </select>
            </div>
          </div>
        </div>

        {/* Order Item 2 */}
        <div className="border rounded p-4 mb-4">
          <div className="flex items-start">
            {/* <div className="w-16 h-16 bg-gray-200 rounded mr-4"></div> */}
            <img src="" alt="" className="w-16 h-16 bg-gray-200 rounded mr-4" />
            <div>
              <p className="font-semibold">Men Round Neck Pure Cotton T-shirt x 3 M</p>
              {/* <p className="text-sm text-gray-600">Great Stack</p>
              <p className="text-sm text-gray-600">Main Street, Demo City, Demo State, US, 123456</p>
              <p className="text-sm text-gray-600">9876543210</p> */}
              <p className="text-sm text-gray-600">address</p>
            </div>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <div>
              <p className="text-sm">quantity</p>
              <p className="text-sm">totalPrice</p>
              <p className="text-sm">paymentMethod</p>
              <p className="text-sm">paymentStatus</p>
              <p className="text-sm">orderDate</p>
            </div>
            <div>
              <span className="font-semibold">price</span>
              <select className="border rounded p-1 ml-4">
                <option>pending</option>
                <option>Packing</option>
                <option>Shipped</option>
                <option>Delivered</option>
              </select>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default AdminOrders
