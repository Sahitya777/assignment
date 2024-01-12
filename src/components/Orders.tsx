import { Box, Button, Text } from '@chakra-ui/react'
import React, { useState } from 'react'

const Orders = () => {
    const [orders, setOrders] = useState([
        {
            "Name": "Margarita A",
            "Desc": "crab & cucumber",
            "Quantity": 2,
            "Prize": 206
        },
        {
            "Name": "Margarita B",
            "Desc": "tuna & cucumber",
            "Quantity": 1,
            "Prize": 112
        },
        {
            "Name": "Margarita C",
            "Desc": "smoked salmon over rice with extra sauce to check if this line works",
            "Quantity": 3,
            "Prize": 1236
        }
    ])
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
                taxAmt:100
             })
         }
        )
        .then((t) =>
          t.json()
        );
        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            name: "mmantratech",
            currency: data.currency,
            amount: data.amount,
            order_id: data.id,
            description: "Understanding RazorPay Integration",
            // image: logoBase64,
            handler: async function (response:any) {
              // if (response.length==0) return <Loading/>;
              console.log(response);
      
              const data = await fetch("/api/paymentverify", {
                method: "POST",
                // headers: {
                //   // Authorization: 'YOUR_AUTH_HERE'
                // },
                body: JSON.stringify({
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_signature: response.razorpay_signature,
                }),
              });
      
      
      
              const res = await data.json();
      
              console.log("response verify==",res)
      
              if(res?.message=="success")
              {
      
      
                console.log("redirected.......")
                // router.push("/paymentsuccess?paymentid="+response.razorpay_payment_id)
      
              }
      
              // Validate payment at server - using webhooks is a better idea.
              // alert(response.razorpay_payment_id);
              // alert(response.razorpay_order_id);
              // alert(response.razorpay_signature);
            },
            prefill: {
              name: "mmantratech",
              email: "mmantratech@gmail.com",
              contact: "9354536067",
            },
          };

        const paymentObject:any = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed", function (response: any) {
            console.log(response,"res")
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
        <Box display="flex" flexDirection="column" width="25%">
            <Box display='flex' justifyContent="space-between">
                <Text>Your order</Text>
                <Box>
                    <Text cursor="pointer" color="#E92F48" fontSize="16px" fontWeight="500">
                        Add items +
                    </Text>
                </Box>
            </Box>
            {orders.map((order, idx: number) => {
                return (
                    <Box>
                    <Box display="flex" justifyContent="space-between">
                            <Box display="flex" flexDirection="column" >
                                <Box display="flex" gap="6" flexDirection="row">
                                    <Text bg="#E92F48" p="1px 5px 1px 5px" color="white" borderRadius="4px">
                                        {order.Quantity}
                                    </Text>
                                    <Box display="flex" flexDirection="column" justifyContent="center">
                                    <Text p="0" m="0">
                                        {order.Name}
                                    </Text>
                                    <Text p="0" m="0">
                                    {order.Desc}
                                </Text>
                                    </Box>
                                </Box>
                            </Box>
                            <Text>
                                ₹{order.Prize.toFixed(2)}
                            </Text>
                    </Box>
                    <Box  borderBottom="1px solid rgba(126, 131, 137, 0.20)"></Box>
                    </Box>
                )
            })}
            <Box display="flex" flexDirection="column">
                <Text>
                    Summary
                </Text>
                <Box display="flex" justifyContent="space-between">
                    <Text>Subtotal</Text>
                    <Text>₹1760.00</Text>
                </Box>
                <Box  borderBottom="1px solid rgba(126, 131, 137, 0.20)"></Box>
                <Box display="flex" justifyContent="space-between">
                    <Text>Discount</Text>
                    <Text>- ₹760.00</Text>
                </Box>
                <Box  borderBottom="1px solid rgba(126, 131, 137, 0.20)"></Box>
                <Box display="flex" justifyContent="space-between">
                    <Text>Delivery Fee</Text>
                    <Text>₹12.00</Text>
                </Box>
                <Box  borderBottom="1px solid rgba(126, 131, 137, 0.20)"></Box>
                <Box display="flex" justifyContent="space-between">
                    <Text>Taxes</Text>
                    <Text>₹46.15</Text>
                </Box>
                <Box  borderBottom="1px solid rgba(126, 131, 137, 0.20)"></Box>
                <Box display="flex" justifyContent="space-between">
                    <Text>Total</Text>
                    <Text>₹1058.15</Text>
                </Box>
            </Box>
            <Button bg="black" color="#FEFAFA" p="4px 4px 4px 4px" cursor="pointer" onClick={()=>{makePayment()}}>
                PLACE ORDER
            </Button>
        </Box>
    )
}

export default Orders