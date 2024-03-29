import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import DialogueBox from '@/components/DialogueBox'
import { Box } from '@chakra-ui/react'
import Orders from '@/components/Orders'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
        <Script src="https://checkout.razorpay.com/v1/checkout.js"
          />
      <Head>
        <title>TSX Pizzerias</title>
        <meta name="description" content="TSX Pizzas order to get best discounts and pizzas" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" fontFamily="Mulish">
        <DialogueBox/>
        <Orders/>
      </Box>
    </>
  )
}
