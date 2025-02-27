import { Route, Routes } from 'react-router'
import Home from "../pages/Home"
import Collection from "../pages/Collection"
import About from "../pages/About"
import Contact from "../pages/Contact"
import Product from "../pages/Product"
import Cart from "../pages/Cart"
import Login from "../pages/Login"
import PlaceOrder from "../pages/PlaceOrder"
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SearchBar from '../components/SearchBar'
import { ToastContainer } from 'react-toastify';
import Orders from '../pages/Orders'
import Register from "../pages/Register"
import AdminPanel from '../pages/admin/Adver2'
import Additem from '../pages/admin/Additem'
import Listitem from '../pages/admin/Listitem'
import AdminOrders from '../pages/admin/AdminOrders'
import Admin from "../pages/admin/Admin"


const Approutes = () => {
   return (
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
         {/* <ToastContainer />
         <Navbar />
         <SearchBar /> */}
         <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/collection' element={<Collection />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/product/:productId' element={<Product />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/place-order' element={<PlaceOrder />} />
            {/* <Route path='/orders' element={<Orders />} /> */}
            <Route path='/orders' element={<Orders />} />
         </Routes>

         <Routes>
            <Route path='/admin' element={<Admin />} />
            {/* <Route path='/admin' element={<Admin />} /> */}
            <Route path='/admin1' element={<AdminPanel />} />
            <Route path='/add-items' element={<Additem />} />
            <Route path='/list-items' element={<Listitem />} />
            <Route path='/admin-orders' element={<AdminOrders />} />
         </Routes>
         {/* <Footer /> */}
      </div>
   )
}

export default Approutes
