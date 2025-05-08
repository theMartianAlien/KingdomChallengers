import { Form } from 'react-router-dom';

export default function RegistrationForm() {
    return (
        <>
            <div>
                <h1>Registration</h1>
                <Form method="post" className='form'>
                    <p className='form-group'>
                        <label htmlFor="username">Username</label>
                        <input id="username" type="text" name="username" required />
                    </p>
                    <p className='form-group'>
                        <label htmlFor="password">Password</label>
                        <input id="password" type="password" name="password" required />
                    </p>
                    <p className='form-group'>
                        <label htmlFor="discord_handle">Discord handle</label>
                        <input id="discord_handle" type="text" name="discord_handle" required />
                    </p>
                    <p className='form-group'>
                        <label htmlFor="user_key">User Key</label>
                        <input id="user_key" type="password" name="user_key" required />
                    </p>
                    <p className='form-group'>
                        <button>Login</button>
                    </p>
                </Form>
            </div>
        </>
    );
}