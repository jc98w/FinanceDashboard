import type { Account } from '../types/account'

interface ViewProps {
    accounts: Account[]
}

export default function AccountTableView({ accounts }: ViewProps) {
    return (
        <div className='bg-gray-300 rounded-sm overflow-x-auto shadow-xl/30'>
            <table className='text-left table-auto w-full'>
                <thead>
                    <tr className='bg-emerald-700 [&>th]:pl-2 [&>th]:py-3 [&>th]:font-normal'>
                        <th className='whitespace-nowrap'>Name</th>
                        <th className='whitespace-nowrap'>Balance</th>
                        <th className='whitespace-nowrap'>Tags</th>
                    </tr>
                </thead>
                
                <tbody>
                {
                    accounts.map((value, index) => (
                        <tr key={ index } className='text-gray-900 border-b border-gray-400 [&>td]:py-3 [&>td]:pl-2'>
                            <td className='whitespace-nowrap'>{ value.accountName }</td>
                            <td className='whitespace-nowrap'>${ value.currentValue.toFixed(2) }</td>
                            <td className='text-sm lowercase whitespace-nowrap'>{ value.tags.join(', ') }</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    )
}