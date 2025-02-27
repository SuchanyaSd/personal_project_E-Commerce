import { useState } from "react";
import { Plus, List, ShoppingCart } from "lucide-react";

export default function AdminDashboard() {
   const [activeTab, setActiveTab] = useState("list");

   return (
      <div className="p-12 w-full mx-auto flex flex-col">
         <button
            className="absolute top-4 right-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
            Log Out
         </button>
         <div className="flex w-full">
            <div className="w-1/4 pr-4">
               <div>
                  <p className="text-2xl font-bold mb-4">Admin Dashboard</p>
               </div>
               <div className="flex flex-col gap-4">
                  <button
                     className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                     onClick={() => setActiveTab("add")}>
                     <Plus className="mr-2" /> Add Item
                  </button>
                  <button
                     className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                     onClick={() => setActiveTab("list")}>
                     <List className="mr-2" /> List Item
                  </button>
                  <button
                     className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                     onClick={() => setActiveTab("orders")}>
                     <ShoppingCart className="mr-2" /> Orders
                  </button>
               </div>
            </div>
            <div className="w-3/4">
               <div className="border p-4 rounded shadow">
                  {activeTab === "add" && <p>Add New Item Form</p>}
                  {activeTab === "list" && <p>List of Items</p>}
                  {activeTab === "orders" && <p>Orders List</p>}
               </div>
            </div>
         </div>
      </div>
   );
}
