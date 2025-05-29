import { Form, useActionData, useLoaderData } from "react-router-dom";
import { useState } from 'react';
import InputField from "../UI/Fields/InputField";
import CheckField from "../UI/Fields/CheckField";
import ImageField from "../UI/Fields/ImageField";

export default function ProfileForm() {
    let data = useLoaderData();
    let actionReceivedData = useActionData();
    let account, message, errors;
    if(data) {
        account = data.account;
        message = data.message;
    }
    if(actionReceivedData) {
        message = actionReceivedData.message;
        errors = actionReceivedData.errors;
    }
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

    const [showPassword, setShowPasswordField] = useState(false);

    function showPasswordFields(event) {
        setShowPasswordField(event.target.checked);
    }

    let passwordDiv;
    if (showPassword) {
        passwordDiv = (
            <>
                <InputField
                    type="password"
                    elementName="password"
                    labelClass="block mb-2 text-sm font-medium !text-black dark:text-white"
                    label="Your Password"
                    placeholder="***********"
                    inputClass="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
                />
                <InputField
                    type="password"
                    elementName="repeat-password"
                    labelClass="block mb-2 text-sm font-medium !text-black dark:text-white"
                    label="Repeat password"
                    placeholder="***********"
                    inputClass="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
                />
            </>
        )
    }

    return (
        <section className="w-[30em] mx-auto py-10">
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 text-gray-900 dark:text-white">
                <h2 className="text-2xl font-semibold mb-4">Update Your Profile</h2>
                <Form className="space-y-6" action="/profile/edit" method="patch">
                    <InputField
                        elementName="discord_handle"
                        label="Discord Handle"
                        labelClass="!text-black"
                        defaultValue={formData.discord_handle}
                        readOnly={true}
                    />
                    <InputField
                        elementName="display_name"
                        label="Display Name"
                        labelClass="!text-black"
                        defaultValue={formData.display_name}
                        inputClass="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                    <InputField
                        elementName="nickname"
                        label="Nickname"
                        labelClass="!text-black"
                        defaultValue={formData.nickname}
                        inputClass="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                    <InputField
                        elementName="username"
                        label="UserName"
                        labelClass="!text-black"
                        defaultValue={formData.username}
                        inputClass="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                    <div className="flex flex-col items-start">
                        <CheckField
                            elementName="withPassword"
                            divClass="flex items-center"
                            onChange={(event) => showPasswordFields(event)}
                            inputClass="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            labelClass="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            label={formData.hasPassword ? 'Update password' : 'Add a password'}
                        />
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
                    <ImageField
                        elementName="user_avatar"
                        defaultImage={formData?.profilePic}
                    />
                    <div className="flex justify-end">
                        <button
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