import { clsx } from 'clsx';
import RadioField from './RadioField';
import { useState } from 'react';

export default function RadioGroupField({
    elementName,
    disabled,
    data,
    label,
    defaultValue,
    required,
    rows = 10,
    divClass,
    labelClass = "block ms-2 text-m font-medium text-white dark:text-gray-300",
    inputClass = "block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
    onChange
}) {

    const [checkedValue, setCheckedValue] = useState(defaultValue);
    function OnChangeChallengeType(e) {
        setCheckedValue(e.target.value);
        onChange?.(e.target.value);
    }
    return (
        <div className={clsx(
            "mb-5",
            divClass
        )}>
            <fieldset>
                <div className="flex items-center mb-4">
                    <label htmlFor={elementName} className={labelClass}>{label}</label>
                </div>
                {data.map((e) => (
                    <RadioField
                        key={e.value}
                        value={e.value}
                        label={e.label}
                        groupName={elementName}
                        checked={checkedValue === e.value}
                        elementName={e.elementName + "_radio"}
                        onChange={(e) => OnChangeChallengeType(e)}
                        disabled={disabled ?? undefined}
                    />
                ))}
            </fieldset>
        </div>
    )
}