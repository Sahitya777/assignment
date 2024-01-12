import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import crypto from "crypto";
import { NextApiRequest, NextApiResponse } from "next";
const instance = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID as string,
    key_secret: process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET,
  });

export default async function POST(req:NextApiRequest,res:NextApiResponse) {

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
  await req.body();
   const body = razorpay_order_id + "|" + razorpay_payment_id;
console.log("id==",body)

 const expectedSignature = crypto
   .createHmac("sha256", process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET as string)
   .update(body.toString())
   .digest("hex");

const isAuthentic = expectedSignature === razorpay_signature;




return NextResponse.json({
    message: "success"
  }, {
    status: 200,
  })
}