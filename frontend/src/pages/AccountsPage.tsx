import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useAccountCtx } from '../contexts/AccountContext';
import AccountCardView from '../components/AccountCardView'
import AccountTableView from '../components/AccountTableView'
import AddAccountModal from '../components/AddAccountModal';

type AccountViewType = 'table' | 'card';
const ViewMap = {
    card: AccountCardView,
    table: AccountTableView
}

export default function AccountsPage() {
    const { isLoading, isAuthenticated } = useAuth();
    const { accounts } = useAccountCtx();
    const navigate = useNavigate();
    const [ isModalOpen, setIsModalOpen ] = useState<boolean>(false);
    const [ viewMode, setViewMode ] = useState<AccountViewType>('table');
    const ActiveView = ViewMap[viewMode]

    // Redirect user if not logged in
    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            navigate('/login', { replace: true });
        }
    }, [isAuthenticated, isLoading, navigate])

    if (!isAuthenticated) {
        return null;
    }

    return(
        <div className='p-10'>
            <div className='flex flex-row flex-wrap align-center'>
                <h1 className='text-xl text-left mr-auto'>ACCOUNTS</h1>
                <div className='bg-emerald-700 rounded-sm'>
                    <button className='btn-mini text-xs w-8' title='table view' onClick={(event)=>{event.preventDefault(); setViewMode('table')}}><i className='fa fa-table'/></button>
                    <button className='btn-mini text-xs w-8' title='card view' onClick={(event)=>{event.preventDefault(); setViewMode('card')}}><i className='fa fa-arrows-h'/></button>
                </div>
                <button className='btn-mini text-xs w-8 ml-2' title='add account' onClick={ () => {setIsModalOpen(true) } }><i className='fa fa-plus'/></button>
            </div>
            <div className='mt-2'>
                {
                    accounts.length === 0 ? (
                        <p>No Accounts Found</p>
                    ) : (
                        <ActiveView/>
                    )
                }
            </div>
            <AddAccountModal isOpen={ isModalOpen } onClose={ () => setIsModalOpen(false) } />
        </div>
    )
}