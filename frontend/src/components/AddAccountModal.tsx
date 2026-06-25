import { useEffect, useRef, useState } from 'react';
import type { SubmitEvent } from 'react'
import FormInput from './FormInput';

interface AddAccountModalProps {
    isOpen: boolean;
    onClose: ()=> void;
}

export default function AddAccountModal({isOpen, onClose}: AddAccountModalProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [ errMessages, setErrMessages ] = useState<string[]>([]);

    const handleSubmit = async(event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const formData = new FormData(event.currentTarget);
        // const payload = Object.fromEntries(formData);
        const payload = {
            accountName: formData.get('account name'),
            currentValue: formData.get('balance'),
            tags: formData.get('tags')
        }

        try {
            const response = await fetch('/api/accounts/create', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(payload)
            })
            console.log(response)

            if (response.ok) {
                onClose()
            }
            else {
                try {
                    const data = await response.json()
                    setErrMessages(data.error)
                }
                catch {
                    setErrMessages(['Failed to create account'])
                }
            }
        }
        catch (err) {
            setErrMessages(['Failed to contact server'])
        }
    }

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        isOpen ? dialog.showModal() : dialog.close();
    }, [isOpen])

    return (
        <dialog
            ref={ dialogRef }
            onClose={ onClose }
            className='rounded-sm m-auto w-lg bg-gray-300 backdrop:backdrop-blur-sm p-3'>
            <div className='rounded-sm bg-emerald-700 text-xl text-white flex flex-row shadow-xl/30'>
                <h2 className='pl-5 py-3 mr-auto my-auto'>New Account</h2>
                <button className='btn-main text-sm' title='exit' onClick={ onClose }><i className='fa fa-times'/></button>
            </div>
            <form onSubmit={ handleSubmit } className='flex flex-col gap-4 py-3'>
                <FormInput className='mx-auto' label='Account Name'/>
                <FormInput type='number' label='Balance'/>
                <FormInput label='Tags'/>
                {
                    errMessages.map((value, index) => (
                        <p className='text-sm text-red-700 text-left w-full text-wrap word-break px-4' key={ index }>*{ value }</p>
                    ))
                }
                <button type='submit' title='create account' className='btn-main mx-auto shadow-xl/30'>Create Account</button>
            </form>
        </dialog>
    )
}