import { NextApiRequest, NextApiResponse } from "next";

//razorpay.js
import Razorpay from "razorpay";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  const { taxAmt } = req.body;
  //console.log('taxAmt',taxAmt*100)
  if (req.method === "POST") {
    // Initialize razorpay object
    const razorpay = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID as string,
      key_secret: process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET,
    });
    // Create an order -> generate the OrderID -> Send it to the Front-end
    // Also, check the amount and currency on the backend (Security measure)
    const payment_capture = 1;
    const amount = taxAmt;
    const currency = "INR";
    const options = {
      amount: (amount * 100).toString(),
      currency,
      receipt: "receipt#1",
      payment_capture,
    };

    try {
      const response = await razorpay.orders.create(options);
      res.status(200).json({
        id: response.id,
        currency: response.currency,
        amount: response.amount,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  } else {
    // Handle any other HTTP method
  }
}