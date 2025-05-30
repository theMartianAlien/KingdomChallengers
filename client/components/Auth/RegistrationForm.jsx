import { Form, useActionData } from 'react-router-dom';
import ErrorForms from '../UI/ErrorForms';
import InputField from '../UI/Fields/InputField';

export default function RegistrationForm() {
    const data = useActionData();
    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-full lg:h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Register for battle!
                            </h1>
                            {data && data.errors && (
                                <ErrorForms data={data} />
                            )}
                            <Form method="post" className="max-w-sm mx-auto">
                                <InputField
                                    elementName="register-username"
                                    labelClass="block mb-2 text-sm font-medium !text-gray-900 dark:text-white"
                                    label="Username"
                                    className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
                                    placeholder="Username"
                                    required
                                />
                                <InputField
                                    type='password'
                                    elementName="register-password"
                                    labelClass="block mb-2 text-sm font-medium !text-gray-900 dark:text-white"
                                    label="Password"
                                    className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
                                    placeholder="***********"
                                    required
                                />
                                <InputField
                                    type='password'
                                    elementName="repeat-password"
                                    labelClass="block mb-2 text-sm font-medium !text-gray-900 dark:text-white"
                                    label="Repeat password"
                                    className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
                                    placeholder="***********"
                                    required
                                />
                                <InputField
                                    elementName="register-discord_handle"
                                    labelClass="block mb-2 text-sm font-medium !text-gray-900 dark:text-white"
                                    label="Discord handle"
                                    className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
                                    placeholder="Your Discord username"
                                    required
                                />
                                <InputField
                                    type="password"
                                    elementName="register-user_key"
                                    labelClass="block mb-2 text-sm font-medium !text-gray-900 dark:text-white"
                                    label="User Key"
                                    className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
                                    placeholder="***********"
                                    required
                                />
                                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Enlist me</button>
                            </Form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}