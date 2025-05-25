export default function Content({ children }) {
    return (
        <section className="flex flex-col items-center justify-center min-h-32 p-5">
            {children}
        </section>
    );
}