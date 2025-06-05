export default function ErrorForms({ data }) {
    return (
        <div className='my-2'>
            <div className="text-sm text-red-700 bg-red-100 border border-red-300 rounded px-4 py-2">
                <span>{data.message}</span>
                <ul>
                    {Object.values(data.errors).map((err) => (
                        <li key={err}>
                            {err}
                        </li>))
                    }
                </ul>
            </div>
        </div>
    );
}