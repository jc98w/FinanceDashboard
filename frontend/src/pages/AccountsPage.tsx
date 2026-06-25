import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AccountCardView from '../components/AccountCardView'
import AccountTableView from '../components/AccountTableView'
import AddAccountModal from '../components/AddAccountModal';
import type { Account } from '../types/account'

type AccountView = 'table' | 'card';
const ViewMap = {
    card: AccountCardView,
    table: AccountTableView
}

export default function AccountsPage() {
    const { isLoading, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [ accounts, setAccounts ] = useState<Account[]>([]);
    const [ isModalOpen, setIsModalOpen ] = useState<boolean>(false);
    const [ viewMode, setViewMode ] = useState<AccountView>('table');
    const ActiveView = ViewMap[viewMode]

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
            const data = await response.json();
            setAccounts(data.accounts);
        }

        fetchAccounts();
    }, [isAuthenticated])

    if (!isAuthenticated) {
        return null;
    }

    return(
        <div className='p-10'>
            <div className='flex flex-row flex-wrap align-center'>
                <h1 className='text-xl text-left mr-auto'>ACCOUNTS</h1>
                <div className='bg-emerald-700 rounded-sm'>
                    <button className='btn-main text-xs p-2' title='table view' onClick={(event)=>{event.preventDefault(); setViewMode('table')}}><i className='fa fa-table'/></button>
                    <button className='btn-main text-xs p-2' title='card view' onClick={(event)=>{event.preventDefault(); setViewMode('card')}}><i className='fa fa-arrows-h'/></button>
                </div>
                <button className='btn-main text-xs p-2 ml-2' title='add account' onClick={ () => {setIsModalOpen(true) } }><i className='fa fa-plus'/></button>
            </div>
            <div className='mt-2'>
                {
                    accounts.length === 0 ? (
                        <p>No Accounts Found</p>
                    ) : (
                        <ActiveView accounts={ accounts }/>
                    )
                }
            </div>
            <AddAccountModal isOpen={ isModalOpen } onClose={ () => setIsModalOpen(false) } />
        </div>
    )
}