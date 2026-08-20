import { useEffect, useRef, useState } from 'react';
import type { SubmitEvent } from 'react'
import FormInput from './FormInput';
import type { Account } from '../types/account'

interface AddAccountModalProps {
    accounts: Account[];
    isOpen: boolean;
    onClose: ()=> void;
}

export default function AddAccountModal({accounts, isOpen, onClose}: AddAccountModalProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const [ errMessages, setErrMessages ] = useState<string[]>([]);

    const handleSubmit = async(event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const formData = new FormData(event.currentTarget);

        const payload = {
            accountName: formData.get('account name') as string,
            currentValue: Number(formData.get('balance') as string),
            tags: formData.get('tags') as string
        }
        const newAccount: Account = {
            userId: '',
            accountName: payload.accountName,
            currentValue: payload.currentValue,
            tags: payload.tags.split(',')
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
                accounts.push(newAccount)
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
        const form = formRef.current;
        if (!dialog || !form) return;

        if (isOpen) {
            dialog.showModal();
        }
        else {
            form.reset();
            dialog.close();
        }

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
            <form ref={ formRef } onSubmit={ handleSubmit } className='flex flex-col gap-4 py-3'>
                <FormInput label='Account Name' required/>
                <FormInput type='number' label='Balance' defaultValue={0} required/>
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