import clsx from 'clsx';

export default function CustomButton({
    onClick,
    type = 'button',
    disabled = false,
    children,
    className = '',
}) {

    function buttonClicked(){
        onClick?.();
    }

    return (
        <button
            type={type}
            disabled={disabled}
            className={clsx(
                "text-sm text-white font-medium px-5 py-2.5 text-center rounded-lg border cursor-pointer focus:outline-none focus:ring-4",
                className,
                {
                    "!bg-gray-500 !cursor-not-allowed pointer-events-none line-through": disabled,
                }
            )}
            onClick={buttonClicked}
        >
            {children}
        </button>
    );
}