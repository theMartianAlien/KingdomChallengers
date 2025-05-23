export default function CustomButton({
    onClick,
    type = 'button',
    disabled = false,
    children,
    className = '',
}) {
    return (
        <button
            onClick={onClick}
            type={type}
            disabled={disabled}
            className={className}
        // className="
        // w-1/2

        // text-white
        // font-medium 

        // bg-orange-900 
        // hover:bg-orange-700 
        // focus:ring-4 
        // focus:outline-none 
        // focus:ring-orange-300 
        // rounded-lg
        // text-sm

        // border
        // px-5 
        // py-2.5

        // text-center 

        // dark:bg-orange-900 
        // dark:hover:bg-orange-700
        // dark:focus:ring-orange-800"
        >
            {children}
        </button>
    );
}