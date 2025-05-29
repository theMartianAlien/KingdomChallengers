import { Datepicker } from "flowbite-react";
import { useState } from "react";

const customTheme = {
    views: {
        days: {
            items: {
                item: {
                    disabled: "dark:text-gray-500 text-gray-500"
                }
            }
        }
    }
};

export function CustomDatePicker({ name, title, minDate, maxDate, defaultValue, readOnly,
    divClass = "mb-5",
    labelClass = "block mb-2 text-sm font-medium text-white dark:text-gray-300",
}) {
    const [selectedDate, setSelectedDate] = useState(defaultValue || null);

    return (
        <div className={divClass}>
            <label htmlFor={name} className={labelClass}>{title}</label>
            <Datepicker
                // className="text-white dark:text-gray-900"
                theme={customTheme}
                name={name}
                showTodayButton={true}
                showClearButton={true}
                autoHide={true}
                value={selectedDate}
                onChange={setSelectedDate}
                title={title}
                minDate={minDate}
                maxDate={maxDate}
                disabled={readOnly}
            />
        </div>
    )
}