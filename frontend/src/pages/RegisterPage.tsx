import { useState } from 'react'
import { type SubmitEvent } from 'react'
import { useNavigate } from 'react-router-dom'

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
        <div>
            <p>Register!</p>
            <form onSubmit={ handleRegister }>
                <div className='px-4 py-5'>
                    <label>Name: </label>
                    <input
                        className='border'
                        type='text'
                        name='name'
                        autoComplete='name'
                        required
                    />
                </div>
                <div className='px-4 py-5'>
                    <label>Username: </label>
                    <input
                        className='border'
                        type='text'
                        name='username'
                        autoComplete='username'
                        required
                    />
                </div>
                <div className='px-4 py-5'>
                    <label>Password: </label>
                    <input
                        className='border'
                        type='password'
                        name='password'
                        autoComplete='password'
                        required
                    />
                </div>
                    { errMessages.map((msg,  index) => (
                        <p className='text-sm text-red-700 text-left px-4' key={ index }>*{ msg }</p>
                    ))}
                <button type='submit' className='btn-main'>Submit</button>
            </form>
        </div>
    )
}