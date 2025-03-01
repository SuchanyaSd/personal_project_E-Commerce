import axios from "axios";

export const actionRegister = async (value) => {
   return await axios.post("http://localhost:8008/api/user/register", value);
};

export const actionLogin = async (value) => {
   return await axios.post("http://localhost:8008/api/user/login", value);
};

export const actionCurrentUser = async (token) => {
   return await axios.get("http://localhost:8008/api/user/current-user", {
      headers: {
         Authorization: `Bearer ${token}`,
      },
   });
};
