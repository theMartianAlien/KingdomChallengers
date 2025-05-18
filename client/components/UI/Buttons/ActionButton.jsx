import { useSubmit } from "react-router-dom";

export default function ActionButton({ _id }) {
    const submit = useSubmit();

    function startDeleteHandler(id) {
        const proceed = window.confirm('Are you sure you want to delete?');

        if (proceed) {
            const formData = new FormData();
            formData.append("id", id);
            submit(formData, { method: 'delete' });
        }
    }

    return (
        <button
            className="
            w-1/2
            
            text-white
            font-medium 

            bg-orange-900 
            hover:bg-orange-700 
            focus:ring-4 
            focus:outline-none 
            focus:ring-orange-300 
            rounded-lg
            text-sm
            
            border
            px-5 
            py-2.5
            
            text-center 
            
            dark:bg-orange-900 
            dark:hover:bg-orange-700
            dark:focus:ring-orange-800"
            onClick={() => startDeleteHandler(_id)}>
            Delete
        </button>
    );
}