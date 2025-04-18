import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { actionCurrentUser } from "../api/auth";
import useAuthStore from "../store/auth-store";
import { toast } from "react-toastify";

function ProtectRoute({ el, allows }) {
   const [ok, setOk] = useState(null);
   const navigate = useNavigate();
   const token = useAuthStore((state) => state.token);

   useEffect(() => {
      if (!token) {
         setOk(false);
         toast.warn("Please login to view this page.");
         navigate("/login"); // ถ้าไม่มี token ให้ไปหน้า login ทันที
         return;
      }
      checkPermission();
   }, [token]);

   const checkPermission = async () => {
      try {
         const res = await actionCurrentUser(token);
         const role = res?.data?.result?.role;
         setOk(allows.includes(role));
      } catch (error) {
         console.error("Error checking permission:", error);
         setOk(false);
         navigate("/login"); // ถ้าเช็คสิทธิ์ไม่ได้ ให้ไปหน้า login
      }
   };

   if (ok === null) {
      return <h1>Loading...</h1>;
   }
   if (!ok) {
      return <h1>Unauthorized!!!</h1>;
   }

   return el;
}
export default ProtectRoute;
