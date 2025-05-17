import { Datepicker } from "flowbite-react";
import { useState } from "react";

const customTheme = {
    views: {
        days: {
            items:{
                item:{
                    disabled: "dark:text-gray-500 text-gray-500"
                }
            }
        }
    }
};

export function CustomDatePicker({ name, title, minDate, maxDate, defaultValue, readOnly }) {
    const [selectedDate, setSelectedDate] = useState(defaultValue || null);

    return <Datepicker
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
}