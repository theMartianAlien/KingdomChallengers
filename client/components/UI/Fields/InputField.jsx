import { clsx } from "clsx";
export default function InputField({
    elementName,
    label,
    defaultValue,
    placeholder="",
    required,
    readOnly,
    type="text",
    divClass = "mb-5",
    labelClass,
    inputClass = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
}) {
    return (
        <div className={divClass}>
            <label
                htmlFor={elementName}
                className={
                    clsx("block mb-2 text-sm font-medium text-white dark:text-gray-300",
                        labelClass
                    )}>
                {label}
            </label>
            <input
                required={required ?? undefined}
                type={type}
                defaultValue={defaultValue}
                id={elementName}
                name={elementName}
                className={inputClass}
                placeholder={placeholder}
                readOnly={readOnly}
                autoComplete="off"
            />
        </div>
    );
}