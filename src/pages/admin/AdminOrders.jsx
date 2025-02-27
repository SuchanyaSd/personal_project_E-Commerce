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
            <div className="w-16 h-16 bg-gray-200 rounded mr-4"></div>
            <div>
              <p className="font-semibold">Men Round Neck Pure Cotton T-shirt x 3 M</p>
              <p className="text-sm text-gray-600">Great Stack</p>
              <p className="text-sm text-gray-600">Main Street, Demo City, Demo State, US, 123456</p>
              <p className="text-sm text-gray-600">9876543210</p>
            </div>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <div>
              <p className="text-sm">Items: 1</p>
              <p className="text-sm">Method: COD</p>
              <p className="text-sm">Payment: Pending</p>
              <p className="text-sm">Date: 7/10/2024</p>
            </div>
            <div>
              <span className="font-semibold">$250</span>
              <select className="border rounded p-1 ml-4">
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
            <div className="w-16 h-16 bg-gray-200 rounded mr-4"></div>
            <div>
              <p className="font-semibold">Men Round Neck Pure Cotton T-shirt x 1 M, Men Round Neck Pure Cotton T-shirt x 1 L, Men Tapered Fit Flat Front Trousers x 1 M</p>
              <p className="text-sm text-gray-600">Great Stack</p>
              <p className="text-sm text-gray-600">Main Street, Demo City, Demo State, US, 123456</p>
              <p className="text-sm text-gray-600">9876543210</p>
            </div>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <div>
              <p className="text-sm">Items: 3</p>
              <p className="text-sm">Method: COD</p>
              <p className="text-sm">Payment: Pending</p>
              <p className="text-sm">Date: 7/10/2024</p>
            </div>
            <div>
              <span className="font-semibold">$240</span>
              <select className="border rounded p-1 ml-4">
                <option>Delivered</option>
                <option>Packing</option>
                <option>Shipped</option>
              </select>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default AdminOrders
