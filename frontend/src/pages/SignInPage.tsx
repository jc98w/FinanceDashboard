import { useState } from 'react'
import type { SubmitEvent } from 'react'
import { AuthLayout } from '../layouts/AuthLayout'
import { useAuth } from '../contexts/AuthContext'

export default function SignInPage() {
    const { login } = useAuth();
    const [ errMessages, setErrMessages ] = useState<Array<string>>([]);

    const handleLogin = async (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const formData = new FormData(event.currentTarget);
        const payload = Object.fromEntries(formData);

        try {
            const response = await fetch('/api/auth/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            })

            if (response.ok) {
                const data = await response.json();
                if (data.error) {
                    setErrMessages([data.error]);
                }
                else {
                    login(data.token);
                }
            }
        }
        catch (error) {
            console.log("Submission failed: ", error);
        }
    }

    return (
        <AuthLayout title='Sign In' submitHandler={ handleLogin } errMessages={ errMessages } inputs={['Username', 'Password']}/>
    )
}