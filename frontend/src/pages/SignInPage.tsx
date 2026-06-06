import { useState } from 'react';
import { type SubmitEvent } from 'react';
import { useAuth } from '../contexts/AuthContext.tsx';

export default function SignInPage() {
    const { login } = useAuth();
    const [ message, setMessage ] = useState<string>();
    
    const handleLogin = async (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const payload = Object.fromEntries(formData);

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })

            if (response.ok) {
                const data = await response.json();
                if (data.error) {
                    setMessage(data.error);
                }
                else {
                    login(data.token);
                }
            }
        } catch (error) {
            console.log('Submittion failed: ', error)
        }
    }

    return(
        <div>
            <p>Sign In!</p>
            <form onSubmit={handleLogin}>
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