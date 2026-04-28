export default function LandingPage() {
    return(
        <div>
            <p>Sign In!</p>
            <form>
                <div className='px-4 py-5'>
                    <label>Username: </label>
                    <input
                        className='border'
                        type='text'
                        name='username_entry'

                    />
                </div>
                <div className='px-4 py-5'>
                    <label>Password: </label>
                    <input
                        className='border'
                        type='password'
                        name='password_entry'

                    />
                </div>
                <button type='submit' className='btn-main'>Submit</button>
            </form>
        </div>
    )
}