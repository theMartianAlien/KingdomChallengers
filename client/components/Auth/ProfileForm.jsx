import { useLoaderData } from "react-router-dom";
import { useState } from 'react';

export default function ProfileForm() {
    const { account } = useLoaderData();
    console.log(account);
    const [formData, setFormData] = useState({
        display_name: account?.display_name,
        nickname: account?.nickname,
        username: account?.username,
        discord_handle: account?.discord_handle,
        password: '',
        confirmPassword: '',
        profilePic: null,
        notifications: false,
        darkMode: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [display_name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleFileChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            profilePic: e.target.files[0],
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted:', formData);
    };

    return (
        <section className="w-[30em] mx-auto py-10">
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 text-gray-900 dark:text-white">
                <h2 className="text-2xl font-semibold mb-4">Update Your Profile</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="discord_handle" className="block text-sm font-medium">Discord Handle</label>
                        <input
                            type="text"
                            id="discord_handle"
                            name="discord_handle"
                            value={formData.discord_handle}
                            onChange={handleChange}
                            disabled={true}
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
                            value={formData.display_name}
                            onChange={handleChange}
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
                            value={formData.nickname}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium">UserName</label>
                        <input
                            type="email"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="user_avatar">Avatar</label>
                        <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                        aria-describedby="user_avatar_help"
                         id="user_avatar" 
                         type="file"
                          accept="image/*" />
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="inline-flex justify-center py-2 px-4 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-800 rounded-md"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}