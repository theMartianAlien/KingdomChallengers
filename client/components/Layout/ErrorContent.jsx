export default function ErrorContent({ title, statusCode, children }) {
    return (
        <div className="flex justify-center flex-col items-center">
            <h1 className="font-medium text-4xl">{title} - <span className="underline text-blue-500">{statusCode}</span></h1>
            {children}
        </div>
    );
}