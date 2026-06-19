import axios from 'axios'
import React from 'react'

const Payment = () => {

const handlepayment=async()=>{
    try{
        const res=await axios.post("http://localhost:3000/apis/payment")
            if(res.data.success){
                const order=res.data.order

                const option={
                    key:"rzp_test_T3ScY5ACZiRU07",
                    amount:order.amount,
                    currency:order.currency,
                    name:"Slot Booking",
                    description:"Test payment",
                    order_id:order.id,
                
                handler:async function(response:any){
                    try{
                        const ress=await axios.post("http://localhost:3000/apis/verifypay",{
                            razorpay_order_id: response.razorpay_order_id,
                           razorpay_payment_id: response.razorpay_payment_id,
                           razorpay_signature: response.razorpay_signature,
                        })
                        if(ress.data.success){
                            alert("Payment Verified and Successful! Slot Booked!");
                        }
                    }catch(err){
                        console.error("Verification failed:", err);
            alert("Payment completed, but verification failed on the server.");
                    }
                },
                // theme: {
                //     color: "#3399cc", 
                //   },
                };
                const raz=new (window as any).Razorpay(option);
                raz.on('payment.failed', function (response: any) {
                    console.error(response.error);
                    alert("Payment Failed! Reason: " + response.error.description);
                  });
                  raz.open();
            }
    }catch(err){
        console.error("Error creating order:", err);
      alert("Failed to initiate payment. Is the backend running?");
    }
}


  return (
    <div>
      <button onClick={handlepayment}>Pay</button>
    </div>
  )
}

export default Payment
