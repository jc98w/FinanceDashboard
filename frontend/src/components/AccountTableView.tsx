import type { Account } from '../types/account'

interface ViewProps {
    accounts: Account[]
}

export default function AccountTableView({ accounts }: ViewProps) {
    return (
        <div className='bg-gray-300 rounded-sm shadow-xl/30'>
            <table className='text-left table-fixed border-separate'>
                <thead>
                    <tr className='bg-emerald-700 [&>th]:pl-2'>
                        <th className='w-lg'>NAME</th>
                        <th className='w-sm'>BALANCE</th>
                        <th className='w-3xl'>TAGS</th>
                    </tr>
                </thead>
                
                <tbody>
                {
                    accounts.map((value, index) => (
                        <tr key={ index } className='text-gray-900 [&>td]:border [&>td]:border-gray-800 [&>td]:pr-10 [&>td]:pl-2'>
                            <td>{ value.accountName }</td>
                            <td>${ value.currentValue.toFixed(2) }</td>
                            <td className='text-sm lowercase'>{ value.tags.join(', ') }</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    )
}