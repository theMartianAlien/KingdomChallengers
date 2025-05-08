import { Form } from 'react-router-dom';

export default function LoginForm() {
    return (
        <>
            <div>
                <h1>LOGIN</h1>
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
                        <button>Login</button>
                    </p>
                </Form>
            </div>
        </>
    );
}