import { Datepicker } from "flowbite-react";

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

export function CustomDatePicker({ name, title, minDate, maxDate, value }) {
    return <Datepicker
        theme={customTheme}
        name={name}
        showTodayButton={true}
        showClearButton={true}
        autoHide={true}
        defaultValue={value}
        title={title}
        minDate={minDate}
        maxDate={maxDate} />;
}