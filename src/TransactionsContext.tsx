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

// interface TransactionInpunt {
//     title: string;
//     amount: number;
//     type:string;
//     category: string;  
// }

type TransactionInput = Omit<Transaction, 'id' | 'createAt'>;

interface TraansactionsProviderProps {
    children: ReactNode;
}
interface TransactionsContextData{
    transactions: Transaction[];
    createTransaction: (transaction:TransactionInput) => void;
    
}



export const TransactionsContext = createContext<TransactionsContextData>(
    {} as  TransactionsContextData
    );

export function TransactionsProvider({ children }: TraansactionsProviderProps){
    const [transactions, setTransactions]= useState<Transaction[]>([]);


    useEffect(()=> {
        api.get('transactions')
        .then(response => setTransactions(response.data.transactions))
    },[]);
    function createTransaction(transaction: TransactionInput){

          api.post('/transactions',)
    }
  
    return (
        <TransactionsContext.Provider value={{ transactions, createTransaction }}>
            { children }
        </TransactionsContext.Provider> 

    )
}