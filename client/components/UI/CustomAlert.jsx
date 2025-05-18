import { useEffect, useState } from 'react';

export default function CustomAlert({ message }) {

    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setVisible(false); // Hide the div after 3 seconds
        }, 3000);

        return () => clearTimeout(timeout); // Clean up on unmount
    }, []);

    return (
        <div>
            {visible && (
                <div className="bg-orange-100 text-orange-800 p-4 rounded">
                    <span className='font-medium'>{message}</span>
                </div>
            )}
        </div>
    );
}