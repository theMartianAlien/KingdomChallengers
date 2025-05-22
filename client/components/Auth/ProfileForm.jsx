import { Form, useActionData, useLoaderData } from "react-router-dom";
import { useState } from 'react';

export default function ProfileForm() {
    let { account } = useLoaderData();
    const actionData = useActionData();
    if (actionData && actionData.account) {
        account = actionData.account;
    }
    const [formData, setFormData] = useState({
        display_name: account?.display_name,
        nickname: account?.nickname,
        username: account?.username,
        discord_handle: account?.discord_handle,
        profilePic: account?.image,
        hasPassword: account?.hasPassword
    });

    const [imageURL, setImageURL] = useState(account?.image || '');
    const [submittedURL, setSubmittedURL] = useState(formData?.profilePic);
    const [showPassword, setShowPasswordField] = useState(false);
    const [isClickable, setIsClickable] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!imageURL.trim()) return;

        const isValid = await checkImageURL(imageURL.trim());

        if (isValid) {
            setSubmittedURL(imageURL.trim());
            setError('');
            setIsClickable(true);
        } else {
            setError('Invalid image URL');
            setSubmittedURL(null);
            setIsClickable(true);
        }
    };

    function showPasswordFields(event) {
        setShowPasswordField(event.target.checked);
    }

    const checkImageURL = async (url) => {
        try {
            const response = await fetch(url, { method: 'HEAD' });
            const contentType = response.headers.get('Content-Type');
            return contentType && contentType.startsWith('image/');
        } catch (e) {
            return false; // In case of network error or invalid URL
        }
    };

    let passwordDiv;
    if (showPassword) {
        passwordDiv = (
            <>
                <div >
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                    <input
                        required
                        type="password"
                        id="password"
                        name="password"
                        autoComplete="off"
                        className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" placeholder="***********" />
                </div>
                <div >
                    <label htmlFor="repeat-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repeat password</label>
                    <input
                        required
                        type="password"
                        id="repeat-password"
                        name="repeat-password"
                        autoComplete="off"
                        className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" placeholder="***********" />
                </div>
            </>
        )
    }

    return (
        <section className="w-[30em] mx-auto py-10">
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 text-gray-900 dark:text-white">
                <h2 className="text-2xl font-semibold mb-4">Update Your Profile</h2>
                <Form className="space-y-6" action="/profile/edit" method="patch">
                    <div>
                        <label htmlFor="discord_handle" className="block text-sm font-medium">Discord Handle</label>
                        <input
                            type="text"
                            id="discord_handle"
                            name="discord_handle"
                            defaultValue={formData.discord_handle}
                            readOnly={true}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="display_name" className="block text-sm font-medium">Display Name</label>
                        <input
                            type="text"
                            id="display_name"
                            name="display_name"
                            defaultValue={formData.display_name}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="nickname" className="block text-sm font-medium">Nickname</label>
                        <input
                            type="text"
                            id="nickname"
                            name="nickname"
                            defaultValue={formData.nickname}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium">UserName</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            defaultValue={formData.username}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div className="flex flex-col items-start">
                        <div className="flex items-center">
                            <input
                                onChange={(event) => showPasswordFields(event)}
                                id="withPassword"
                                type="checkbox"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label
                                htmlFor="withPassword"
                                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                                {formData.hasPassword ? 'Update password' : 'Add a password'}
                            </label>
                        </div>

                        {!formData.hasPassword && (
                            <span className="mt-1 text-xs font-medium text-gray-800 dark:text-gray-300">
                                By adding a password, you will be able to login with your 
                                <span className="bg-blue-100 text-blue-800 font-semibold me-2 px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-2">username</span>
                                and
                                <span className="bg-blue-100 text-blue-800 font-semibold me-2 px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-2">password</span>
                            </span>
                        )}
                    </div>
                    {passwordDiv && (passwordDiv)}
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="user_avatar">Avatar</label>
                        <div className="flex items-center justify-start gap-2">
                            {submittedURL && (
                                <img
                                    src={submittedURL}
                                    alt="Preview"
                                    style={{ width: '200px', height: 'auto', objectFit: 'cover' }}
                                />
                            )}
                            <div>
                                <button
                                    disabled={isClickable}
                                    type="submit"
                                    className="block w-1/2 text-sm border border-gray-300 rounded-lg py-2"
                                >
                                    Upload
                                </button>
                                <input
                                    type="text"
                                    id="user_avatar"
                                    name="user_avatar"
                                    placeholder="Paste image URL here"
                                    value={imageURL}
                                    onChange={(e) => setImageURL(e.target.value)}
                                    className="w-full bg-blue-950 dark:bg-blue-700"
                                    style={{ width: '250px' }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button
                            // type="submit"
                            className="inline-flex justify-center py-2 px-4 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-800 rounded-md"
                        >
                            Save Changes
                        </button>
                    </div>
                </Form>
            </div>
        </section>
    );
}