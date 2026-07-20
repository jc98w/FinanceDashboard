import type { Account } from '../types/account'

interface ViewProps {
    accounts: Account[]
}

export default function AccountTableView({ accounts }: ViewProps) {
    const editAccount = async (index: number) => {
        console.log(`FIXME: Edit account, ${index}`)
        const columns = ['accountName', 'accountValue', 'tags'];
        for (const col of columns) {
            const element = document.getElementById(`${col}${index}`);
            const elementEdit = document.getElementById(`${col}Edit${index}`);
            const editBtn = document.getElementById(`editBtn${index}`);
            const confirmBtn = document.getElementById(`confirmBtn${index}`);
            const revertBtn = document.getElementById(`revertBtn${index}`);
            if (element && elementEdit && editBtn && confirmBtn && revertBtn) {
                element.hidden = !element.hidden;
                elementEdit.hidden = !elementEdit.hidden;
                editBtn.hidden = !editBtn.hidden;
                confirmBtn.hidden = !confirmBtn.hidden;
                revertBtn.hidden = !revertBtn.hidden;
            }
        }
    }

    const deleteAccount = async (index: number) => {
        console.log(`FIXME: Delete account ${index}`)
    }

    return (
        <div className='bg-gray-300 rounded-sm overflow-x-auto shadow-xl/30'>
            <table className='bg-emerald-700 text-left table-fixed w-full'>
                <thead>
                    <tr className='[&>th]:pl-2 [&>th]:py-3 [&>th]:font-normal'>
                        <th className='whitespace-nowrap'>Name</th>
                        <th className='whitespace-nowrap'>Balance</th>
                        <th className='whitespace-nowrap'>Tags</th>
                    </tr>
                </thead>
                
                <tbody>
                {
                    accounts.map((value, index) => (
                        <tr key={ index } className='bg-gray-300 text-gray-900 border-b border-gray-400 [&>td]:py-3 [&>td]:pl-2'>
                            <td>
                                <p id={`accountName${index}`} hidden={false} className='whitespace-nowrap'>{ value.accountName } </p>
                                <input id={`accountNameEdit${index}`} hidden={true} type='text' defaultValue={ value.accountName } className='bg-gray-100 rounded-sm w-full pl-1'/>
                            </td>
                            <td>
                                <p id={`accountValue${index}`} hidden={false} className='whitespace-nowrap'>${ value.currentValue.toFixed(2) }</p>
                                <input id={`accountValueEdit${index}`} hidden={true} type='number' defaultValue={ value.currentValue.toFixed(2) } className='bg-gray-100 rounded-sm w-full pl-1'/>
                            </td>
                            <td>
                                <p id={`tags${index}`} hidden={false} className='text-sm lowercase whitespace-nowrap'>{ value.tags.join(', ') }</p>
                                <input id={`tagsEdit${index}`} hidden={true} type='text' defaultValue={ value.tags } className='bg-gray-100 text-sm lowercase whitespace-nowrap rounded-sm w-full pl-1'/>
                            </td>
                            <td className='flex flex-row ml-auto'>
                                <div className='bg-emerald-700 rounded-sm w-fit ml-auto'>
                                    <button id={`confirmBtn${index}`} hidden={true} className='btn-mini w-8'><i className='fa fa-check'/></button>
                                    <button id={`revertBtn${index}`} hidden={true} className='btn-mini w-8'><i className='fa fa-undo' /></button>
                                </div>
                                <div className='bg-emerald-700 rounded-sm w-fit mx-auto'>
                                    <button id={`editBtn${index}`} hidden={false} className='btn-mini w-8' onClick={ () => {editAccount(index)} }><i className='fa fa-edit'/></button>
                                    <button id={`delBtn${index}`} hidden={false} className='btn-mini w-8' onClick={ () => {deleteAccount(index)} }><i className='fa fa-trash'/></button>
                                </div>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    )
}