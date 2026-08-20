import { createContext, useState } from 'react';
import type { PropsWithChildren } from 'react';
import type { Account } from '../types/account';

interface AccountContextType {
    accounts: Account[],
    addAccount: (account: Account) => void,
    updateAccount: (accountName: string, changes: Partial<Account>) => void,
    delAccount: (accountName: string) => void
}

const AccountContext = createContext<AccountContextType | undefined>(undefined);

export const AccountProvider = ({ children }: PropsWithChildren) => {
    const [ accounts, setAccounts ] = useState<Account[]>([]);

    const addAccount = async (newAccount: Account) => {
        setAccounts((currAccounts) => [...currAccounts, newAccount]);
    }

    const updateAccount = async (accountName: string, changes: Partial<Account>) => {
        setAccounts((currAccounts) => 
            currAccounts.map((account) => {
                if (account.accountName !== accountName) return account;
                return { ...account, ...changes }
            })
        );
    }

    const delAccount = async (accountName: string) => {
        setAccounts((currAccounts) => currAccounts.filter(account => account.accountName !== accountName));
    }

    return (
        <AccountContext.Provider value={{ accounts, addAccount, updateAccount, delAccount}}>
            { children }
        </AccountContext.Provider>
    )
}