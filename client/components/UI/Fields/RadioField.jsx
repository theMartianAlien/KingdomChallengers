export default function RadioField({
    divClass = "flex items-center mb-4",
    elementName,
    defaultChecked,
    checked,
    groupName,
    value,
    disabled,
    label,
    labelClass = "block ms-2 text-sm font-medium text-gray-900 dark:text-gray-300",
    inputClass = "w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600",
    onChange
}) {
    return (
        <div className={divClass}>
            <input
                type="radio"
                id={elementName}
                disabled={disabled}
                checked={checked} 
                defaultChecked={defaultChecked}
                name={groupName}
                value={value}
                className={inputClass}
                onChange={onChange} />
            <label
                htmlFor={elementName}
                className={labelClass}>
                {label}
            </label>
        </div>
    );
}