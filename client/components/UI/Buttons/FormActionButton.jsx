import { Form } from "react-router-dom";
import TestButton from "./TestButton";

export default function FormActionButton({ action, method, label, id }) {
    return (
        <Form action={action} method={method}>
            <TestButton
            _id={id}
            label={label}
            className={`
                inline-flex
                items-center
                justify-center
                
                text-sm
                text-white
                font-medium
                
                bg-red-900
                hover:bg-red-700
                focus:ring-4
                focus:outline-none
                focus:ring-orange-300

                dark:bg-orange-900
                dark:hover:bg-orange-700
                dark:focus:ring-orange-800

                rounded-lg
                border
                px-5
                py-2.5
                text-center

                cursor-pointer`} />
        </Form>
    );
}