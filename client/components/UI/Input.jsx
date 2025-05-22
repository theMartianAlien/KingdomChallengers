export default function Input({ label, textarea, className = "form-group", ...props }) {
    return (
        <>
            <div className={className +  ' gap-2'}>
                <label htmlFor={props.name} className="gap-1 m-3">{label}</label>
                {textarea ? <textarea {...props} className={`... base classes ... dark:bg-gray-800 dark:text-gray-100 w-full`}/> : <input {...props} className={`... base classes ... dark:bg-gray-800 dark:text-gray-100 w-full`}/>}
            </div>
        </>
    );
}