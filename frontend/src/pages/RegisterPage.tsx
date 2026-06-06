import { useState } from 'react'
import { type SubmitEvent } from 'react'
import { useNavigate } from 'react-router-dom'

export default function RegisterPage() {
    const navigate = useNavigate();
    const [ message, setMessage ] = useState<string>();

    const handleRegister = async (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const payload = Object.fromEntries(formData);

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })

            if (response.ok) {
                const registerStatus = await response.json();
                if (registerStatus.error) {
                    setMessage(registerStatus.error);
                }
                else {
                    navigate('/login')
                }
            }
        } catch (error) {
            console.log('Submittion failed: ', error)
        }
    }

    return (
        <div>
            <p>Register!</p>
            <form onSubmit={ handleRegister }>
                <div className='px-4 py-5'>
                    <label>Name: </label>
                    <input
                        className='border'
                        type='text'
                        name='name'
                    />
                </div>
                <div className='px-4 py-5'>
                    <label>Username: </label>
                    <input
                        className='border'
                        type='text'
                        name='username'
                    />
                </div>
                <div className='px-4 py-5'>
                    <label>Password: </label>
                    <input
                        className='border'
                        type='password'
                        name='password'
                    />
                </div>
                <p className='text-sm px-4 py-5'>{ message }</p>
                <button type='submit' className='btn-main'>Submit</button>
            </form>
        </div>
    )
}