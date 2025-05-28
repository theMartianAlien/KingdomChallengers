import { Form, Link, useActionData } from 'react-router-dom';
import ErrorForms from '../UI/ErrorForms';
import { FaDiscord } from 'react-icons/fa';
const discord = import.meta.env.VITE_DISCORD_ENDPOINT

export default function LoginForm() {
    const data = useActionData();
    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Enter battlefield!
                            </h1>
                            {data && data.errors && (
                                <ErrorForms data={data} />
                            )}
                            <Form className="space-y-4 md:space-y-6" method="post">
                                <div>
                                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                                    <input type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username" required />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                </div>
                                <button type="submit"
                                    className="
                                    cursor-pointer
                                    border w-full
                                    dark:text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300
                                    text-black
                                    font-medium
                                    rounded-lg 
                                    text-sm 
                                    px-5 py-2.5 
                                    text-center
                                    dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Login</button>
                                <div className="flex items-center justify-center bg-discord-gray text-white py-2 gap-2">
                                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                        Don’t have an account yet? <Link to="/register" className="underline font-medium text-primary-600 hover:underline dark:text-primary-500">Register</Link>
                                    </p>
                                    <Link id="discord_login" to={discord}
                                        className="gap-1 bg-discord-blue text-m text-black dark:text-white px-2 py-1 rounded-md font-bold flex items-center space-x-4 hover:bg-gray-600 transition duration-75 border">
                                        <FaDiscord className="w-5 h-5 mr-1" />
                                        <span>Discord Login</span>
                                    </Link>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}