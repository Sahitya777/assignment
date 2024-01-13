import React, { createContext, useContext, useState } from 'react';

const DrawerContext = createContext();

export const DrawerContextProvider = ({ children }) => {
  const [transactionStatus, setTransactionStatus] = useState(null);
  const [activeTransactions, setActiveTransactions] = useState([])
  const [total, setTotal] = useState(1062)
  const [transactionHash, setTransactionHash] = useState("")

  const updateTotal=(newTotal)=>{
    setTotal(newTotal)
  }
  const updateStatus = (newStatus) => {
    setTransactionStatus(newStatus);
  };
  const pushToActiveTransactions = (data) => {
    setActiveTransactions((prevTransactions) => [...prevTransactions, data]);
  };

  return (
    <DrawerContext.Provider value={{ transactionStatus, updateStatus,total,updateTotal, pushToActiveTransactions,activeTransactions }}>
      {children}
    </DrawerContext.Provider>
  );
};

export const useDrawContext = () => useContext(DrawerContext);
