import { useDrawContext } from '@/context/DrawerContext';
import { Box, Button, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

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
            "Prize": 412
        }
    ])
    var prizeSubTotal = orders.reduce((acc, item) => acc + (item.Quantity * item.Prize), 0);
    useEffect(()=>{
        updateTotal(prizeSubTotal+50+12-(prizeSubTotal/10));
    },[])
    const router = useRouter();
    const { transactionStatus,updateStatus,total,updateTotal } = useDrawContext();
    return (
        <Box display="flex" flexDirection="column" p="10px">
            <Box display='flex' justifyContent="space-between">
                <Text>Your order</Text>
                <Box>
                    {transactionStatus != "success" &&
                    <Box>
                        <Text cursor="pointer" color="#E92F48" fontSize="16px" fontWeight="700">
                            Add items +
                        </Text>
                    </Box>
                    }
                </Box>
            </Box>
            {transactionStatus=="success" &&
            <Box position="fixed" top="50%" left="50%" transform="translate(-50%,-50%)"  zIndex="100" bg="#F2F2F2" padding="13px" borderRadius="6px">
            <Text >
                Order has been placed successfully. <br/> Confirmation message sent!
            </Text>
            <Text fontWeight="600">
                Order Id: 3267
            </Text>
            <Text fontWeight="600">
                Total : ₹{total.toFixed(2)}
            </Text>
            <Box width="100%" display="flex" justifyContent="flex-end">
                <Button bg="#C4C4C4" boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)" border="1px solid #C4C4C4" width="100px" color="#000" fontWeight="700" cursor="pointer" onClick={()=>{updateStatus(null)}}>
                    Back
                </Button>
            </Box>
             
        </Box>            
            }

            {orders.map((order, idx: number) => {
                return (
                    <Box>
                        <Box display="flex" justifyContent="space-between">
                            <Box display="flex" flexDirection="column" >
                                <Box display="flex" gap="8" flexDirection="row">
                                    <Text bg="#E92F48" p="1px 5px 1px 5px" color="white" borderRadius="4px">
                                        {order.Quantity}
                                    </Text>
                                    <Box display="flex" flexDirection="column" justifyContent="center">
                                        <Text p="0" m="0">
                                            {order.Name}
                                        </Text>
                                        <Text p="0" m="0" color="#7E8389">
                                            {order.Desc}
                                        </Text>
                                    </Box>
                                </Box>
                            </Box>
                            <Text>
                                ₹{((order.Prize) * (order.Quantity)).toFixed(2)}
                            </Text>
                        </Box>
                        <Box borderBottom="1px solid rgba(126, 131, 137, 0.20)"></Box>
                    </Box>
                )
            })}
            <Box display="flex" flexDirection="column">
                <Text color="#424242" fontWeight="900" fontSize="20px" lineHeight="18px" width="85px" borderBottom="3px solid #E92F48"pb="2px" fontFamily="Mulish">
                    Summary
                </Text>
                <Box display="flex" justifyContent="space-between">
                    <Text color="#7E8389">Subtotal</Text>
                    <Text>₹{prizeSubTotal.toFixed(2)}</Text>
                </Box>
                <Box borderBottom="1px solid rgba(126, 131, 137, 0.20)"></Box>
                <Box display="flex" justifyContent="space-between">
                    <Text color="#7E8389">Discount</Text>
                    <Text color="#5A8CD7">- ₹{(prizeSubTotal/10).toFixed(2)}</Text>
                </Box>
                <Box borderBottom="1px solid rgba(126, 131, 137, 0.20)"></Box>
                <Box display="flex" justifyContent="space-between">
                    <Text color="#7E8389">Delivery Fee</Text>
                    <Text>₹12.00</Text>
                </Box>
                <Box borderBottom="1px solid rgba(126, 131, 137, 0.20)"></Box>
                <Box display="flex" justifyContent="space-between">
                    <Text color="#7E8389">Taxes</Text>
                    <Text>₹50.00</Text>
                </Box>
                <Box borderBottom="1px solid rgba(126, 131, 137, 0.20)"></Box>
                <Box display="flex" justifyContent="space-between">
                    <Text fontWeight="900" fontSize="18px">Total</Text>
                    <Text fontWeight="900" fontSize="18px">₹{total.toFixed(2)}</Text>
                </Box>
            </Box>
            {transactionStatus != "success" &&
                <Button bg="black" borderRadius="8px" color="#FEFAFA" p="4px 4px 4px 4px" mt="1rem" cursor="pointer" onClick={() => { router.push("/payment") }}>
                    PLACE ORDER
                </Button>
            }

        </Box>
    )
}

export default Orders