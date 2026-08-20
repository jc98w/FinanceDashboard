import { useAccountCtx } from '../contexts/AccountContext'

export default function AccountTableView() {
    const { accounts, updateAccount, delAccount } = useAccountCtx();
    const accountFields = ['accountName', 'accountValue', 'tags'];

    const editAccount = async (index: number) => {
        console.log(`FIXME: Edit account, ${index}`)
        for (const field of accountFields) {
            const element = document.getElementById(`${field}${index}`);
            const elementEdit = document.getElementById(`${field}Edit${index}`);
            const editBtn = document.getElementById(`editBtn${index}`);
            const confirmBtnGroup = document.getElementById(`confirmBtnGroup${index}`);
            const revertBtn = document.getElementById(`revertBtn${index}`);
            if (element && elementEdit && editBtn && confirmBtnGroup && revertBtn) {
                element.hidden = !element.hidden;
                elementEdit.hidden = !elementEdit.hidden;
                editBtn.hidden = !editBtn.hidden;
                confirmBtnGroup.hidden = !confirmBtnGroup.hidden;
            }
        }
    }

    const confirmEdit = async (index: number) => {

    }

    const revertEdit = async (index: number) => {

    }

    const deleteAccount = async (index: number) => {
        const accountName = accounts[index].accountName;
        delAccount(accountName);
    }

    const handleEdit = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const { index } = event.target.dataset;
        console.log('editing index ', index)
        const confirmBtn = document.getElementById(`confirmBtn${index}`)
        if (!confirmBtn) return
        let hideConfirmBtn = true;
        for (const field of accountFields) {
            const currentValue = document.getElementById(`${field}${index}`)?.textContent;
            const inputValue = (document.getElementById(`${field}Edit${index}`) as HTMLInputElement)?.value;
            if (currentValue && inputValue) {
                if (currentValue != inputValue) {
                    if (+currentValue === +inputValue) {
                        continue
                    }
                    hideConfirmBtn = false;
                    break;
                }
            }
        }
        confirmBtn.hidden = hideConfirmBtn;
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
                                <p id={`accountName${index}`} hidden={false} className='whitespace-nowrap'>{ value.accountName }</p>
                                <input id={`accountNameEdit${index}`} data-index={index} hidden={true} type='text' onChange={handleEdit} defaultValue={ value.accountName } className='bg-gray-100 rounded-sm w-full pl-1'/>
                            </td>
                            <td className='inline-block'>
                                <p id={`accountValue${index}`} hidden={false} className='whitespace-nowrap'>{ value.currentValue.toFixed(2) }</p>
                                <input id={`accountValueEdit${index}`} data-index={index} hidden={true} type='number' onChange={handleEdit} defaultValue={ value.currentValue.toFixed(2) } className='bg-gray-100 rounded-sm w-full pl-1'/>
                            </td>
                            <td>
                                <p id={`tags${index}`} hidden={false} className='text-sm lowercase whitespace-nowrap'>{ value.tags.join(', ') }</p>
                                <input id={`tagsEdit${index}`} data-index={index} hidden={true} type='text' onChange={handleEdit} defaultValue={ value.tags } className='bg-gray-100 text-sm lowercase whitespace-nowrap rounded-sm w-full pl-1'/>
                            </td>
                            <td className='flex flex-row ml-auto'>
                                <div id={`confirmBtnGroup${index}`} hidden={true} className='bg-emerald-700 rounded-sm w-fit ml-auto'>
                                    <button id={`confirmBtn${index}`} hidden={true} className='btn-mini w-8' onClick={ () => {confirmEdit(index)}}><i className='fa fa-check'/></button>
                                    <button id={`revertBtn${index}`} className='btn-mini w-8' onClick={ () => {revertEdit(index)}}><i className='fa fa-undo' /></button>
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