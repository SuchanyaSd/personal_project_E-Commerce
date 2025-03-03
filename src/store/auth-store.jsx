import axios from "axios";
import { create } from "zustand";
import { actionLogin } from "../api/auth";
import { persist } from "zustand/middleware";

const authStore = (set, get) => ({
   user: [],
   token: null,
   customerId: null, // เพิ่ม customerId state

   actionLoginWithZustand: async (value) => {
      try {
         const res = await actionLogin(value);
         const { payload, token } = res.data;
         set({ user: payload, token: token, customerId: payload.id });

         return { success: true, role: payload.role, customerId: payload.id };
      } catch (error) {
         return { success: false, error: error.response.data.message };
      }
   },

   fetchCustomerId: async () => {
      try {
         const token = get().token;
         if (!token) return;

         const res = await axios.get("http://localhost:8008/user/customer-id", {
            headers: { Authorization: `Bearer ${token}` },
         });

         set({ customerId: res.data.customerId });
      } catch (error) {
         console.error("Error fetching customerId:", error);
      }
   },

   actionLogout: () => {
      set({ user: [], token: null, customerId: null });
   },
});

const useAuthStore = create(persist(authStore, { name: "auth-store" }));
export default useAuthStore;
