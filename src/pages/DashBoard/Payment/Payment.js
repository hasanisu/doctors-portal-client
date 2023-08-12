import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useContext } from "react";
import { useLoaderData, useNavigation } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";
import { AuthContext } from "../../../context/AuthProvider";
import Loading from "../../Shared/Loading/Loading";

// TODO : provide publishable key
const stripePromise = loadStripe('pk_test_51NZ5M9LXBmpMMNAndiOaCcjODIb50skZgyFLP98AyiylaKQUt8rMxofyem7VP1SJfr6PIJ6Qqy6LKN8DIlJvb80B0027OCYOy3');
console.log("stripe", stripePromise);

const Payment = () => {
  const booking = useLoaderData();
  // const navigation = useNavigation();
  // if(navigation.state === 'loading'){
  //   return <Loading></Loading>
  // }
  const { treatment, price, appointmentDate, slot } = booking;
  // const {loading} = useContext(AuthContext)
 
 
 
  return (
    <div className="pl-16">

      <h2>Payment for {treatment}</h2>
      <p className="text-xl">
        please pay <strong>${price}</strong> for your appointment{" "}
        {appointmentDate} at {slot}
      </p>

      <div className="w-96 my-12">
        <Elements stripe={stripePromise}>
          <CheckoutForm booking={booking}/>
        </Elements>
      </div>
     
    </div>
  );
};

export default Payment;
