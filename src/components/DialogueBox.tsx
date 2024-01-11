import { Box, Tab, Tabs, Text } from '@chakra-ui/react'
import React from 'react'

const DialogueBox = () => {
    return (
        <Box display="flex" flexDirection="column" bg="pink" alignItems="center" justifyContent="center" width="25%" boxShadow="initial">
            <Text color="#000" fontSize="16px" fontWeight="800" fontFamily="Mulish">
                TSX PIZZERIAS
            </Text>
            <Tabs variant="unstyled" display="flex">
                <Tab
                    py="5"
                    px="20"
                    color="white"
                    bg="black"
                    fontSize="12px"
                    border="1px solid var(--stroke-of-30, rgba(103, 109, 154, 0.30))"
                    borderRadius="10px"
                    fontWeight="600"
                    fontStyle="normal"
                    _selected={{
                        color: "white",
                        bg: "black",
                        border: "none",
                    }}
                    cursor="pointer"
                // isDisabled={unstakeTransactionStarted == true}
                // onClick={() => {
                //   setmarketSelected("ETH");
                // }}
                >
                    DELIVERY
                </Tab>
                <Tab
                    py="5"
                    px="20"
                    color="black"
                    bg="#E5E5E5"
                    fontSize="12px"
                    border="1px solid var(--stroke-of-30, #4F4F4F)"
                    borderLeft="0px solid"
                    borderRightRadius="6px"
                    fontWeight="600"
                    fontStyle="normal"
                    _selected={{
                        color: "white",
                        bg: "black",
                        border: "none",
                    }}
                // _selected={{
                //   color: "white",
                //   bg: "#4D59E8",
                //   border: "none",
                // }}
                // isDisabled={transactionStarted == true}
                // onClick={() => {
                //   setmarketSelected("USDT");
                // }}
                >
                    PICK UP
                </Tab>
            </Tabs>
            <Box display="flex" justifyContent="space-between" gap="1rem" color="#121212" fontWeight="500">
                <Text>25 mins</Text>
                <Text>₹ 20</Text>
                <Text>Discounts</Text>
            </Box>
            <Text lineHeight="12px" fontSize="14px" fontWeight="600">Menu Hours: 10:00 AM to 11:00 PM</Text>
        </Box>
    )
}

export default DialogueBox