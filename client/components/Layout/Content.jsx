export default function Content({ className = "flex flex-col items-center justify-center min-h-32 p-5", children }) {
    return (
        <section className={className}>
            {children}
        </section>
    );
}