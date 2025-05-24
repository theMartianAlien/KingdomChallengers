export default function CheckField({
    elementName,
    label,
    defaultChecked,
    required,
    divClass = "flex items-center mb-5",
    labelClass = "ms-2 text-sm font-medium text-gray-900 dark:text-gray-300",
    inputClass = "w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
}) {
    return (
        <div className={divClass}>
            <div className="flex items-center h-5">
                <input
                    required={required ?? undefined}
                    type="checkbox"
                    defaultChecked={defaultChecked}
                    id={elementName}
                    name={elementName}
                    className={inputClass}
                />
            </div>
            <label
                htmlFor={elementName}
                className={labelClass}>
                {label}
            </label>
        </div>
    );
}