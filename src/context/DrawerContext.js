import React, { createContext, useContext, useState } from 'react';

const DrawerContext = createContext();

export const DrawerContextProvider = ({ children }) => {
  const [transactionStatus, setTransactionStatus] = useState(null);
  const [total, setTotal] = useState(1062)

  const updateTotal=(newTotal)=>{
    setTotal(newTotal)
  }
  const updateStatus = (newStatus) => {
    setTransactionStatus(newStatus);
  };
  return (
    <DrawerContext.Provider value={{ transactionStatus, updateStatus,total,updateTotal,}}>
      {children}
    </DrawerContext.Provider>
  );
};

export const useDrawContext = () => useContext(DrawerContext);
