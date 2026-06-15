import { useState } from 'react'
import { type SubmitEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthLayout } from '../layouts/AuthLayout'

export default function RegisterPage() {
    const navigate = useNavigate();
    const [ errMessages, setErrMessages ] = useState<Array<string>>(Array());

    const handleRegister = async (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("%cHandleRegister", "color: blue")

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
            const registerStatus = await response.json();

            console.log("%cRegister form submitted", "color: blue")
            if (response.ok) {
                console.log("%cResponse ok", "color: green")
                navigate(`/welcome/?name=${payload.name}`)
            }
            else {
                console.log(registerStatus.error)
                setErrMessages(registerStatus.error)
            }
        } catch (error) {
            setErrMessages(["Server error, unable to process request"])
        }
    }

    return (
        <AuthLayout title='Register' submitHandler={ handleRegister } errMessages={ errMessages } inputs={['Name', 'Username', 'Password']}/>
    )
}
