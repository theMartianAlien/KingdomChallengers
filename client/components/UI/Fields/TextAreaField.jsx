export default function TextAreaField({
    elementName,
    label,
    defaultValue,
    placeholder,
    required,
    rows = 10,
    divClass = "mb-5",
    labelClass = "block mb-2 text-sm font-medium text-white dark:text-gray-300",
    inputClass = "block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
}) {
    return (
        <div className={divClass}>
            <label
                htmlFor={elementName}
                className={labelClass}>
                {label}
            </label>
            <textarea
                rows={rows}
                required={required ?? undefined}
                defaultValue={defaultValue}
                id={elementName}
                name={elementName}
                className={inputClass}
                placeholder={placeholder}
            />
        </div>
    );
}