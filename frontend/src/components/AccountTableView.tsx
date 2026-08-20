import { useAccountCtx } from '../contexts/AccountContext'
import type { Account } from '../types/account';

type AccountField = 'accountName' | 'currentValue' | 'tags';

interface FieldGroup {
    element: HTMLElement,
    editElement: HTMLInputElement,
}

interface RowElements {
    editBtn: HTMLElement,
    confirmBtnGroup: HTMLElement,
    confirmBtn: HTMLElement,
    revertBtn: HTMLElement,
    accountName: FieldGroup,
    currentValue: FieldGroup,
    tags: FieldGroup
}

export default function AccountTableView() {
    const { accounts, updateAccount, delAccount } = useAccountCtx();
    const accountFields: AccountField[] = ['accountName', 'currentValue', 'tags'];

    const getRow = (index: number): RowElements | null => {
        const row = {
            editBtn: document.getElementById(`editBtn${index}`),
            confirmBtnGroup: document.getElementById(`confirmBtnGroup${index}`),
            confirmBtn: document.getElementById(`confirmBtn${index}`),
            revertBtn: document.getElementById(`revertBtn${index}`),
            accountName: {
                element: document.getElementById(`accountName${index}`),
                editElement: document.getElementById(`accountNameEdit${index}`) as HTMLInputElement
            },
            currentValue: {
                element: document.getElementById(`currentValue${index}`),
                editElement: document.getElementById(`currentValueEdit${index}`) as HTMLInputElement
            },
            tags: {
                element: document.getElementById(`tags${index}`),
                editElement: document.getElementById(`tagsEdit${index}`) as HTMLInputElement
            }
        }
        try {
            return row as unknown as RowElements;
        }
        catch {
            return null;
        }
    }

    const editAccount = async (index: number) => {
        console.log(`FIXME: Edit account, ${index}`)
        const row = getRow(index);
        if (!row) {
            console.error('Could not find requested row');
            return;
        }

        row.editBtn.hidden = true;
        row.confirmBtnGroup.hidden = false;
        row.revertBtn.hidden = false;

        for (const field of accountFields) {
            row[field].element.hidden = true;
            row[field].editElement.hidden = false;
        }
    }

    const confirmEdit = async (index: number) => {
        const row = getRow(index);
        if (!row) {
            console.error('Could not find requested row');
            return;
        }

        const updates = {
                accountName: row.accountName.editElement.value,
                currentValue: row.currentValue.editElement.value as unknown as number,
                tags: row.tags.editElement.value.split(',')
            }
        updateAccount(row.accountName.element.textContent, updates)

        revertEdit(index, updates);
    }

    const revertEdit = async (index: number, override?: Partial<Account>) => {
        const row = getRow(index);
        const source = override ?? accounts[index]

        if (!row) {
            console.error('Could not find requested row');
            return;
        }

        row.editBtn.hidden = false;
        row.confirmBtnGroup.hidden = true;
        row.revertBtn.hidden = true;

        for (const field of accountFields) {
            row[field].element.hidden = false;
            row[field].editElement.hidden = true;
            // revert edits back to current account values
            row[field].editElement.value = source[field] as string
        }
    }

    const deleteAccount = async (index: number) => {
        const accountName = accounts[index].accountName;
        delAccount(accountName);
        revertEdit(index);
    }

    const handleEdit = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const index = event.target.dataset.index as unknown as number;
            const row = getRow(index);
            if (!row) throw Error();

            let hideConfirmBtn = true;
            for (const field of accountFields) {
                const currentValue = row[field].element.textContent;
                const inputValue = row[field].editElement.value;
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
            row.confirmBtn.hidden = hideConfirmBtn;
        }
        catch {
            console.error('Error: Unable to detect edits on desired row');
            return;
        }
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
                    accounts.map((value, index) => {
                        return (
                        <tr key={ index } className='bg-gray-300 text-gray-900 border-b border-gray-400 [&>td]:py-3 [&>td]:pl-2'>
                            <td>
                                <p id={`accountName${index}`} hidden={false} className='whitespace-nowrap'>{ value.accountName }</p>
                                <input id={`accountNameEdit${index}`} data-index={index} hidden={true} type='text' onChange={handleEdit} defaultValue={ value.accountName } className='bg-gray-100 rounded-sm w-full pl-1'/>
                            </td>
                            <td className='inline-block'>
                                <p id={`currentValue${index}`} hidden={false} className='whitespace-nowrap'>{ Number(value.currentValue).toFixed(2) }</p>
                                <input id={`currentValueEdit${index}`} data-index={index} hidden={true} type='number' onChange={handleEdit} defaultValue={ Number(value.currentValue).toFixed(2) } className='bg-gray-100 rounded-sm w-full pl-1'/>
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
                    )})
                }
                </tbody>
            </table>
        </div>
    )
}