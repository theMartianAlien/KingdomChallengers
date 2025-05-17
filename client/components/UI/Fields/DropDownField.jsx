import { useState } from "react";

export default function DropDownField({
    multiple = false,
    size = 5,
    divClass = "mb-5",
    elementName,
    inputClass = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
    defaultValue,
    options,
    onChange,
    label,
    labelClass = "block mb-2 text-sm font-medium text-gray-900 dark:text-white",
    optionClass = "py-1 "
}) {

    const [selectedOptions, setSelectedOptions] = useState(defaultValue);

    function handleSelectionChange(event) {
        // const { options } = event.target;
        // const selectedValues = [];

        // for (let i = 0; i < options.length; i++) {
        //     if (options[i].selected) {
        //         selectedValues.push(options[i].value);
        //     }
        // }
        const value = event.target.value;
        setSelectedOptions((prevSelected) => {
            if(prevSelected.includes(value)) {
                return prevSelected.filter((item) => item!==value );
            } else {
                return [...prevSelected, value];
            }
        }) 
        
        // Update the selected options state
    }

    return (
        <div className={divClass}>
            <label
                htmlFor={elementName}
                className={labelClass}>
                {label}
            </label>
            <select
                multiple={multiple}
                size={multiple ? size : undefined}
                className={inputClass}
                name={elementName}
                id={elementName}
                onClick={handleSelectionChange}
                value={selectedOptions} >
                {options.map(option =>
                    <option
                        key={option.value}
                        value={option.value}
                        className={`${optionClass} ${selectedOptions.includes(option.value) ? 'bg-blue-500 text-white' : ''}`}
                    >
                        {option.text}
                    </option>
                )}
            </select>
        </div>
    );
}