import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from './AuthContext'
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
    const { isAuthenticated } = useAuth();
    const [ accounts, setAccounts ] = useState<Account[]>([]);

    const addAccount = async (newAccount: Account) => {
        try {
            const response = await fetch('/api/accounts/create', {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(newAccount)
            })

            if (response.ok) {
                toast.success(`${newAccount.accountName} created`)
                setAccounts((currAccounts) => [...currAccounts, newAccount]);
            }
            else {
                toast.error('Failed to create account')
            }
        }
        catch {
            toast.error('Error occurred')
        }
    }

    const updateAccount = async (accountName: string, changes: Partial<Account>) => {
        try {
            const response = await fetch('/api/accounts/update',
                {
                    method: 'PUT',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                        targetAccountName: accountName,
                        updates: { ...changes }
                    })
                }
            )
            if (response.ok) {
                setAccounts((currAccounts) => 
                    currAccounts.map((account) => {
                        if (account.accountName !== accountName) return account;
                        return { ...account, ...changes }
                    })
                );
                toast.success('Account updated');
            }
            else {
                throw new Error()
            }
            
        }
        catch {
            console.error(changes)
            toast.error('Unable to update account')
        }
        
    }

    const delAccount = async (accountName: string) => {
                const response = await fetch('/api/accounts/',
            {
                method: "DELETE",
                headers: {
                    'Content-type': "application/json"
                },
                body: JSON.stringify({ "accountName": accountName })
            }
        );

        if (response.ok) {
            toast.success(`${accountName} deleted`)
        }
        else {
            toast.error(`Something went wrong. Failed to delete ${accountName}`)
        }
        setAccounts((currAccounts) => currAccounts.filter(account => account.accountName !== accountName));
    }

    // Refresh user's accounts from backend
    useEffect(() => {
        if (!isAuthenticated) return;

        const fetchAccounts = async () => {
            const response = await fetch('/api/accounts/me', {
                method: "GET",
            });

            if (!response.ok) {
                throw new Error('Failed to fetch accounts')
            }
            const data = await response.json();
            setAccounts(data.accounts);
        }

        fetchAccounts();
    }, [isAuthenticated])

    return (
        <AccountContext.Provider value={{ accounts, addAccount, updateAccount, delAccount}}>
            { children }
        </AccountContext.Provider>
    )
}

export const useAccountCtx = () => {
    const context = useContext(AccountContext);
    if (!context) throw new Error('Unable to retreive AccountContext');
    return context;
}