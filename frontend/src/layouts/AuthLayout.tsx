import type { SubmitEventHandler } from 'react'
import FormInput from '../components/FormInput'

interface AuthLayoutProps {
    title: string,
    submitHandler: SubmitEventHandler<HTMLFormElement>,
    errMessages: Array<string>,
    inputs?: Array<string>,
    children?: React.ReactNode
}

export const AuthLayout = ({title, submitHandler, errMessages, inputs = [], children}: AuthLayoutProps) => (
    <div>
        <form onSubmit={ submitHandler }>
            <div className='bg-gray-300 rounded-sm flex flex-col w-full max-w-md mt-5 mx-auto gap-5 p-3 shadow-xl/30'>
                <p className='bg-emerald-700 rounded-sm text-xl text-left px-5 py-3 shadow-lg/30'>{ title }</p>
                <div className='flex flex-col gap-4 px-5'>
                    {
                        inputs.map((value, index) => (
                            <FormInput key={ index } label={ value } type={ value.toLowerCase() === 'password' ? 'password' : 'text' } required/>
                        ))
                    }
                </div>

                
                {errMessages.map((msg, index) => (
                    <p className='text-sm text-red-700 text-left w-full text-wrap word-break px-4' key={index}>*{msg}</p>
                ))}

                <button type='submit' className='btn-main mx-auto shadow-lg/30'>Submit</button>

            </div>

        </form>
        { children }
    </div>
)