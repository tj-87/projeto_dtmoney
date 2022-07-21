import { createContext, ReactNode, useEffect, useState } from 'react'
import { api } from './services/api';

interface Transaction {
    id: number;
    title: string;
    amount: number;
    type:string;
    category: string;
    createAt: string;
}

interface TraansactionsProviderProps {
    children: ReactNode;
}



export const TransactionsContext = createContext<Transaction[]>([]);

export function TransactionsProvider({ children }: TraansactionsProviderProps){
    const [transactions, setTransactions]= useState<Transaction[]>([]);


    useEffect(()=> {
        api.get('transactions')
        .then(response => setTransactions(response.data.transactions))
    },[]);
  
    return (
        <TransactionsContext.Provider value={transactions}>
            { children }
        </TransactionsContext.Provider> 

    )
}