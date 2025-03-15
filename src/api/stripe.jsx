import axios from "axios";

export const payment = async (token) => {
  return await axios.post(
    "http://localhost:8008/api/payment/user/create-payment-intent",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const saveOrder = async (token, payload) => {
  return await axios.post(
    "http://localhost:8008/api/user/users/order",
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
