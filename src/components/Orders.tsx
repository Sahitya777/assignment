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
            <Button bg="black" color="#FEFAFA" p="4px 4px 4px 4px" cursor="pointer">
                PLACE ORDER
            </Button>
        </Box>
    )
}

export default Orders