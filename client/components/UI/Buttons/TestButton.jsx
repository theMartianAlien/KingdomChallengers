export default function TestButton({ _id, label, onClick, className }) {
    function onClickHandler() {
        onClick(_id);
    }

    return (
        <button
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

                            cursor-pointer
            
            ${className}
            `}
            onClick={onClickHandler}>
            {label}
        </button>
    );
}