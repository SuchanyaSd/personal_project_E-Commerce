// import { Outlet, Route, Routes } from 'react-router'
// import Home from "../pages/Home"
// import Collection from "../pages/Collection"
// import About from "../pages/About"
// import Contact from "../pages/Contact"
// import Product from "../pages/Product"
// import Cart from "../pages/Cart"
// import Login from "../pages/Login"
// import PlaceOrder from "../pages/PlaceOrder"
// import Navbar from '../components/Navbar'
// import Footer from '../components/Footer'
// // import SearchBar from '../components/SearchBar'
// import { ToastContainer } from 'react-toastify';
// import Orders from '../pages/Orders'
// import Register from "../pages/Register"
// import Additem from '../pages/admin/Additem'
// import Listitem from '../pages/admin/Listitem'
// import AdminOrders from '../pages/admin/AdminOrders'
// import Admin from "../pages/admin/Admin"
// import AdminLayout from '../pages/AdminLayout'
// import ProtectRoute from './ProtectRoute'
// import ProfileForm from '../pages/EditProfile'
// import EditeItem from '../pages/admin/EditItem'
// import ProductEdite from '../pages/admin/ProductEdite'
// import EditProfileAdmim from '../pages/admin/EditProfileAdmin'
// import EditProfileUser from '../pages/EditProfile'


// const MainLayout = () => {
//    return (
//       <>
//          <ToastContainer />
//          <Navbar />
//          {/* <SearchBar /> */}
//          <Outlet />
//          <Footer />
//       </>
//    );
// };

// const Approutes = () => {
//    return (
//       <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
//          <Routes>
//             {/* Regular user routes with full layout */}
//             <Route element={<MainLayout />}>
//                <Route path='/' element={<Home />} />
//                <Route path='collection' element={<Collection />} />
//                <Route path='about' element={<About />} />
//                <Route path='contact' element={<Contact />} />
//                <Route path='product/:productId' element={<Product />} />
//                <Route path='cart' element={<Cart />} />
//                <Route path='login' element={<Login />} />
//                <Route path='register' element={<Register />} />
//                {/* <Route path='profile' element={<ProfileForm />} /> */}
//             </Route>

//             {/* Protected user routes */}
//             <Route element={<ProtectRoute el={<MainLayout />} allows={["USER"]} />}>
//                <Route path='place-order' element={<PlaceOrder />} />
//                <Route path='orders' element={<Orders />} />
//                <Route path='profile' element={<EditProfileUser />} />
//             </Route>

//             {/* Admin routes with minimal layout */}
//             <Route path='admin' element={<ProtectRoute el={<AdminLayout />} allows={["ADMIN"]} />}>
//                <Route index element={<Admin />} />
//                <Route path='add-items' element={<Additem />} />
//                <Route path='list-items' element={<Listitem />} />
//                <Route path='admin-orders' element={<AdminOrders />} />
//                {/* <Route path='edit-item' element={<EditeItem />} /> */}
//                {/* <Route path='product-edit' element={<ProductEdite />} /> */}
//                <Route path="edit-product/:productId" element={<ProductEdite />} />
//                <Route path="profile-admin" element={<EditProfileAdmim />} />
//             </Route>
//          </Routes>
//       </div>
//    );
// }


// export default Approutes




import { Outlet, Route, Routes } from 'react-router'
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
// import SearchBar from '../components/SearchBar'
import { ToastContainer } from 'react-toastify';
import Orders from '../pages/Orders'
import Register from "../pages/Register"
import Additem from '../pages/admin/Additem'
import Listitem from '../pages/admin/Listitem'
import AdminOrders from '../pages/admin/AdminOrders'
import Admin from "../pages/admin/Admin"
import AdminLayout from '../pages/AdminLayout'
import ProtectRoute from './ProtectRoute'
import ProfileForm from '../pages/EditProfile'
import EditeItem from '../pages/admin/EditItem'
import ProductEdite from '../pages/admin/ProductEdite'
import EditProfileAdmim from '../pages/admin/EditProfileAdmin'
import EditProfileUser from '../pages/EditProfile'
import Payment from '../pages/Payment'


const MainLayout = () => {
   return (
      <>
         {/* <ToastContainer /> */}
         <Navbar />
         {/* <SearchBar /> */}
         <Outlet />
         <Footer />
      </>
   );
};

const Approutes = () => {
   return (
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
         <Routes>
            {/* Regular user routes with full layout */}
            <Route element={<MainLayout />}>
               <Route path='/' element={<Home />} />
               <Route path='collection' element={<Collection />} />
               <Route path='about' element={<About />} />
               <Route path='contact' element={<Contact />} />
               <Route path='product/:productId' element={<Product />} />
               <Route path='cart' element={<Cart />} />
               <Route path='login' element={<Login />} />
               <Route path='register' element={<Register />} />
            </Route>

            {/* Protected user routes */}
            <Route element={<ProtectRoute el={<MainLayout />} allows={["USER"]} />}>
               <Route path='place-order' element={<PlaceOrder />} />
               <Route path='orders' element={<Orders />} />
               <Route path='profile' element={<EditProfileUser />} />
               <Route path='payment' element={<Payment />} />
            </Route>

            {/* Admin routes with minimal layout */}
            <Route path='admin' element={<ProtectRoute el={<AdminLayout />} allows={["ADMIN"]} />}>
               <Route index element={<Admin />} />
               <Route path='add-items' element={<Additem />} />
               <Route path='list-items' element={<Listitem />} />
               <Route path='admin-orders' element={<AdminOrders />} />
               {/* <Route path='edit-item' element={<EditeItem />} /> */}
               {/* <Route path='product-edit' element={<ProductEdite />} /> */}
               <Route path="edit-product/:productId" element={<ProductEdite />} />
               <Route path="profile-admin" element={<EditProfileAdmim />} />
            </Route>
         </Routes>
      </div>
   );
}


export default Approutes