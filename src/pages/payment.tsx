import DialogueBox from '@/components/DialogueBox'
import { Box, Button, useRadio } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import banner from "../assets/Banner.png"
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useDrawContext } from '@/context/DrawerContext'
import Orders from '@/components/Orders'
const Payment = () => {
  const router = useRouter();
  const {updateStatus,total} =useDrawContext()
  const makePayment = async () => {
    //console.log("here...");
    const res = await initializeRazorpay();
    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }
    // Make API call to the serverless API
    const data = await fetch("/api/razorpay",
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          taxAmt: total
        })
      }
    )
      .then((t) =>
        t.json()
      );
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      name: "TSX Pizzerias",
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      description: "Understanding RazorPay Integration",
      // image: logoBase64,
      handler: async function (response: any) {
        // if (response.length==0) return <Loading/>;
        console.log(response,"res");

        const data = await fetch("/api/paymentverify", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          }),
        });
        const res = await data.json();

        console.log("response verify==", res)

        if (res?.message == "success") {
          updateStatus('success')
          router.push('/')
          console.log("redirected.......")
          // router.push("/paymentsuccess?paymentid="+response.razorpay_payment_id)

        }

        // Validate payment at server - using webhooks is a better idea.
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature);
      },
      prefill: {
        name: "TSX Pizzerias",
        email: "tsx@gmail.com",
        contact: "8544780700",
      },
    };

    const paymentObject: any = new (window as any).Razorpay(options);
    paymentObject.open();
    paymentObject.on("payment.failed", function (response: any) {
      console.log(response, "res")
    });
    paymentObject.on("payment.success", function (response: any) {
      console.log(response, "res sucess")
    });
  };

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      // document.body.appendChild(script);

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  }
  return (
    <Box  display='flex' flexDirection="column" alignItems="center">
      <Box bgImage="url('/assets/Banner.png')" bgPosition="center"
        bgRepeat="no-repeat">
      </Box>
        <DialogueBox />
      <Button bg="black" color="#FEFAFA" p="4px 4px 4px 4px" width="400px" mt="5rem" borderRadius="8px" cursor="pointer" onClick={() => { makePayment() }}>
        PROCEED TO PAY
      </Button>
    </Box>
  )
}

export default Payment