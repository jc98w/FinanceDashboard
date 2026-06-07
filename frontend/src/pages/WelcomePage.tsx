import { Link } from 'react-router-dom';

export default function WelcomePage() {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');

    let welcomeMessage = 'Welcome'
    name ? welcomeMessage += `, ${ name }!` : welcomeMessage += '!';

    return (
        <div className='space-y-8'>
            <h1 className='text-2xl'>{ welcomeMessage }</h1>
            <p>You have been successfully registered!</p>
            <Link to='/login' className='btn-main mt-8'>Sign In</Link>
        </div>
    )
}