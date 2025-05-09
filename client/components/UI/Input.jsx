export default function Input({ label, textarea, className = "form-group", ...props }) {
    return (
        <>
            <div className={className}>
                <label htmlFor={props.name}>{label}</label>
                {textarea ? <textarea {...props} /> : <input {...props} />}
            </div>
        </>
    );
}