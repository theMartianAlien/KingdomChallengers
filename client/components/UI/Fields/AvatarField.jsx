import { useState } from 'react';

export default function AvatarField() {

    const [imageURL, setImageURL] = useState('');
    const [submittedURL, setSubmittedURL] = useState(null);
    const [isClickable, setIsClickable] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!imageURL.trim()) return;

        const isValid = await checkImageURL(imageURL.trim());

        if (isValid) {
            setSubmittedURL(imageURL.trim());
            setError('');
            setIsClickable(true);
        } else {
            setError('Invalid image URL');
            setSubmittedURL(null);
            setIsClickable(true);
        }
    };

    const checkImageURL = async (url) => {
        try {
            const response = await fetch(url, { method: 'HEAD' });
            const contentType = response.headers.get('Content-Type');
            return contentType && contentType.startsWith('image/');
        } catch (e) {
            return false; // In case of network error or invalid URL
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            {submittedURL && (
                <img
                    src={submittedURL}
                    alt="Preview"
                    style={{ width: '200px', height: 'auto', objectFit: 'cover' }}
                />
            )}
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="flex items-center justify-start gap-2">
                        <button
                            disabled={isClickable}
                            type="submit"
                            className="block w-1/2 text-sm text-gray-900 border border-gray-300 rounded-lg py-2"
                        >
                            Upload
                        </button>
                        <input
                            type="text"
                            placeholder="Paste image URL here"
                            value={imageURL}
                            onChange={(e) => setImageURL(e.target.value)}
                            className="w-full bg-blue-950 dark:bg-blue-700"
                            style={{ width: '250px' }}
                        />
                    </div>
                </form>

            </div>
        </div>
    );
}