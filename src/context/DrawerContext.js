import React, { createContext, useContext, useState } from 'react';

const DrawerContext = createContext();

export const DrawerContextProvider = ({ children }) => {
  const [transactionStatus, setTransactionStatus] = useState(null);
  const [total, setTotal] = useState(1062)
  const [subTotal, setSubTotal] = useState(1760)
  const [finalOrder, setFinalOrder] = useState([
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
  const updateTotal=(newTotal)=>{
    setTotal(newTotal)
  }
  const updateSubTotal=(newTotal)=>{
    setSubTotal(newTotal)
  }
  const updateStatus = (newStatus) => {
    setTransactionStatus(newStatus);
  };
  const updateFinalOrder = (newStatus) => {
    setFinalOrder(newStatus);
  };
  return (
    <DrawerContext.Provider value={{ transactionStatus, updateStatus,total,updateTotal,updateSubTotal,subTotal,updateFinalOrder,finalOrder}}>
      {children}
    </DrawerContext.Provider>
  );
};

export const useDrawContext = () => useContext(DrawerContext);
