import { Box, Tab, Tabs, Text } from '@chakra-ui/react'
import React from 'react'

const DialogueBox = () => {
    return (
        <Box display="flex" flexDirection="column" width="300px" alignItems="center" justifyContent="center" boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)">
            <Text color="#000" fontSize="16px" fontWeight="800" fontFamily="Mulish">
                TSX PIZZERIAS
            </Text>
            <input type="checkbox" id="toggle" className="toggleCheckbox" />
            <label htmlFor="toggle" className='toggleContainer'>
                <Box>DELIVERY</Box>
                <Box>PICK UP</Box>
            </label>
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