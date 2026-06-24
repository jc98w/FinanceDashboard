import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountCard from '../components/AccountCard';
import { useAuth } from '../contexts/AuthContext';

interface Account {
    userId: string;
    accountName: string;
    tags?: string[];
    curretValue?: number;
}

export default function AccountsPage() {
    const { isLoading, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [ accounts, setAccounts ] = useState<Account[]>([]);

    // Redirect user if not logged in
    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            navigate('/login', { replace: true });
        }
    }, [isAuthenticated, isLoading, navigate])

    // Fetch user's accounts
    useEffect(() => {
        if (!isAuthenticated) return;

        const fetchAccounts = async () => {
            const response = await fetch('/api/accounts/me', {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch accounts')
            }
            console.log(response);
            const data = await response.json();
            console.log(data)
            setAccounts(data.accounts);
        }

        fetchAccounts();
    }, [isAuthenticated])

    if (!isAuthenticated) {
        return null;
    }

    return(
        <div className='p-10'>
            <div className='flex flex-row gap-10'>
                {
                    accounts.map((value, index) => (
                        <AccountCard key={ index } accountName={ value.accountName } tags={ value.tags } currentValue={ value.curretValue }/>
                    ))
                }
            </div>
        </div>
    )
}