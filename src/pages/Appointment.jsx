import React from "react";
import Hero from "../components/Hero";
import AppointmentForm from "../components/AppointmentForm";
import axios from "axios";
import { catchAsyncErrors } from "../../../backend/middlewares/catchAsyncErrors";
import { toast } from "react-toastify";
const Appointment = () => {
  const checkoutHandler=catchAsyncErrors(async(amount)=>{
     const {data:{ order }} = await axios.post("https://hms-backend-deployment-alpj.onrender.com/api/v1/payment/checkout", {amount})
    const { data: { key } } = await axios.get("https://hms-backend-deployment-alpj.onrender.com/api/v1/getkey");
        

        const options = {
            key,
            amount: order.amount,
            currency: "INR",
            name: "ZEE CARE HOSPITAL",
            description: "Tutorial of RazorPay",
            image: "https://media.licdn.com/dms/image/D4D03AQGlUHCEO0wzGw/profile-displayphoto-shrink_800_800/0/1685522093760?e=1721260800&v=beta&t=Eae8yN46rwM4C_OhVcV9sQ72rAHMI1Sp5MElf8kHn6c",
            order_id: order.id,
            callback_url: "https://hms-backend-deployment-alpj.onrender.com/api/v1/payment/paymentverification",
            prefill: {
                name: "Gaurav Kumar",
                email: "gaurav.kumar@example.com",
                contact: "9999999999"
            },
            notes: {
                "address": "Razorpay Corporate Office"
            },
            theme: {
                "color": "#121212"
            }
        };
        const razor = new window.Razorpay(options);
        razor.open();
  })
  return (
    <>
      <Hero
        title={"Schedule Your Appointment | ZeeCare Medical Institute"}
        imageUrl={"/signin.png"}
      />
      <AppointmentForm amount={500}  checkoutHandler={checkoutHandler}/>
    </>
  );
};

export default Appointment;