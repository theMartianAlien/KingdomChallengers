export default function InputField({
    elementName,
    label,
    defaultValue,
    placeholder,
    required,
    divClass = "mb-5",
    labelClass = "block mb-2 text-sm font-medium text-gray-900 dark:text-white",
    inputClass = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
}) {
    return (
        <div className={divClass}>
            <label
                htmlFor={elementName}
                className={labelClass}>
                {label}
            </label>
            <input
                required={required ?? undefined}
                type="text"
                defaultValue={defaultValue}
                id={elementName}
                name={elementName}
                className={inputClass}
                placeholder={placeholder}
            />
        </div>
    );
}