import { useDrawContext } from '@/context/DrawerContext';
import { Box, Button, Modal, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
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
    var prizeSubTotal: number = orders.reduce((acc, item) => acc + (item.Quantity * item.Prize), 0);

    const router = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { transactionStatus, updateStatus, total, updateTotal, updateSubTotal, subTotal, updateFinalOrder, finalOrder } = useDrawContext();
    const [quantity1, setquantity1] = useState(orders[0].Quantity);
    const [quantity2, setquantity2] = useState(orders[1].Quantity);
    const [quantity3, setquantity3] = useState(orders[2].Quantity);
    useEffect(() => {
        if (transactionStatus != "success") {
            updateTotal(prizeSubTotal + 50 + 12 - (prizeSubTotal / 10));
            updateSubTotal(prizeSubTotal)
            updateFinalOrder(orders)
        }
    }, [prizeSubTotal])
    return (
        <Box display="flex" flexDirection="column" p="10px">
            <Box display='flex' justifyContent="space-between">
                <Text>Your order</Text>
                <Box>
                    {transactionStatus != "success" &&
                        <Box onClick={() => { onOpen() }}>
                            <Text cursor="pointer" color="#E92F48" fontSize="16px" fontWeight="700">
                                Add items +
                            </Text>
                        </Box>
                    }
                    <Modal
                        isOpen={isOpen}
                        onClose={onClose}
                        isCentered
                        size={{ width: "400px", height: "100px" }}
                    >
                        <ModalOverlay bg="rgba(244, 242, 255, 0.5);" />
                        <ModalContent
                            background="var(--Base_surface, #02010F)"
                            color="white"
                            borderRadius="6px"
                            maxW="362px"
                            zIndex={1}
                            mt="14rem"
                            mx="auto"
                            className="modal-content"
                            padding="10px"
                        >
                            <ModalHeader fontSize="16px" fontWeight="800" mt="1rem" >
                                ADD ITEMS
                            </ModalHeader>
                            <Box display="flex" justifyContent="space-between">
                                <Text fontSize="14px">
                                    {quantity1}  Margertia A
                                </Text>
                                <Box display="flex" gap="1rem">
                                    <Text cursor="pointer" fontSize="14px" onClick={() => {
                                        setquantity1(quantity1 + 1)
                                        orders[0].Quantity++
                                    }}>
                                        Add +
                                    </Text>
                                    <Text cursor="pointer" fontSize="14px" onClick={() => {
                                        if (orders[0].Quantity > 0) {
                                            setquantity1(quantity1 - 1)
                                            orders[0].Quantity--
                                        }
                                    }}>
                                        Remove -
                                    </Text>
                                </Box>
                            </Box>
                            <Box display="flex" justifyContent="space-between">
                                <Text fontSize="14px">
                                    {quantity2}  Margertia B
                                </Text>
                                <Box display="flex" gap="1rem">
                                    <Text cursor="pointer" fontSize="14px" onClick={() => {
                                        setquantity2(quantity2 + 1)
                                        orders[1].Quantity++
                                    }}>
                                        Add +
                                    </Text>
                                    <Text cursor="pointer" fontSize="14px" onClick={() => {
                                        if (orders[1].Quantity > 0) {
                                            setquantity2(quantity2 - 1)
                                            orders[1].Quantity--
                                        }
                                    }}>
                                        Remove -
                                    </Text>
                                </Box>
                            </Box>
                            <Box display="flex" justifyContent="space-between">
                                <Text fontSize="14px">
                                    {quantity3}  Margertia C
                                </Text>
                                <Box display="flex" gap="1rem">
                                    <Text cursor="pointer" fontSize="14px" onClick={() => {
                                        setquantity3(quantity3 + 1)
                                        orders[2].Quantity++
                                    }}>
                                        Add +
                                    </Text>
                                    <Text cursor="pointer" fontSize="14px" onClick={() => {
                                        if (orders[2].Quantity > 0) {
                                            setquantity3(quantity3 - 1)
                                            orders[2].Quantity--
                                        }
                                    }}>
                                        Remove -
                                    </Text>
                                </Box>
                            </Box>
                            <Button onClick={() => { onClose() }} bg="#C4C4C4" boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)" border="1px solid #C4C4C4" width="100px" color="#000" fontWeight="700" cursor="pointer">
                                BACK
                            </Button>
                        </ModalContent>
                    </Modal>
                </Box>
            </Box>
            {transactionStatus == "success" &&
                <Box position="fixed" top="50%" left="50%" transform="translate(-50%,-50%)" zIndex="100" bg="#F2F2F2" padding="13px" borderRadius="6px">
                    <Text >
                        Order has been placed successfully. <br /> Confirmation message sent!
                    </Text>
                    <Text fontWeight="600">
                        Order Id: 3267
                    </Text>
                    <Text fontWeight="600">
                        Total : ₹{total.toFixed(2)}
                    </Text>
                    <Box width="100%" display="flex" justifyContent="flex-end">
                        <Button bg="#C4C4C4" boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)" border="1px solid #C4C4C4" width="100px" color="#000" fontWeight="700" cursor="pointer" onClick={() => { updateStatus(null) }}>
                            Back
                        </Button>
                    </Box>

                </Box>
            }


            {transactionStatus == "success" ? finalOrder.map((order: any, idx: number) => (
                <Box key={idx}>
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
            )) : orders.map((order, idx: number) => (
                <Box key={idx}>
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
            ))}
            <Box display="flex" flexDirection="column">
                <Text color="#424242" fontWeight="900" fontSize="20px" lineHeight="18px" width="85px" borderBottom="3px solid #E92F48" pb="2px" fontFamily="Mulish">
                    Summary
                </Text>
                <Box display="flex" justifyContent="space-between">
                    <Text color="#7E8389">Subtotal</Text>
                    <Text>₹{subTotal.toFixed(2)}</Text>
                </Box>
                <Box borderBottom="1px solid rgba(126, 131, 137, 0.20)"></Box>
                <Box display="flex" justifyContent="space-between">
                    <Text color="#7E8389">Discount</Text>
                    <Text color="#5A8CD7">- ₹{(subTotal / 10).toFixed(2)}</Text>
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
                <Button bg="black" borderRadius="8px" color="#FEFAFA" p="6px 4px 6px 4px" mt="1rem" cursor="pointer" onClick={() => { router.push("/payment") }}>
                    PLACE ORDER
                </Button>
            }

        </Box>
    )
}

export default Orders