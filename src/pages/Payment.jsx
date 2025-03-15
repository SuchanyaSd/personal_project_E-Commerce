import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { payment } from "../api/stripe";
// import UserStore from '../store/UserStore'
import CheckoutForm from "../components/CheckoutForm";
import useAuthStore from "../store/auth-store";

const stripePromise = loadStripe("pk_test_51R0e3MCaAnIpzJiqIGpHuamh9TM4720tTuTAxhvqUGjnMoOgRdkv5IovC3Q2rv3sz83gCRxkxcaD5CBic7r8vsHx004ix9Nkb5");

function Payment() {
   const token = useAuthStore(s => s.token)
   // console.log(token)
   const [clientSecret, setClientSecret] = useState("");


   useEffect(() => {
      payment(token)
         .then((res) => {
            console.log(res);
            setClientSecret(res.data.clientSecret);
         })
         .catch((err) => {
            console.log(err);
         });
   }, []);


   const appearance = {
      theme: "stripe",
   };
   // Enable the skeleton loader UI for optimal loading.
   const loader = "auto";



   return (
      <div>
         {clientSecret && (
            <Elements
               options={{ clientSecret, appearance, loader }}
               stripe={stripePromise}
            >
               <CheckoutForm />
            </Elements>
         )}
      </div>
   );
};


export default Payment