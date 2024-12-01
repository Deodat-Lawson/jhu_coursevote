'use client';

import { useEffect } from 'react';

export default function GlobalError({
                                        error,
                                        reset,
                                    }: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <html>
        <body>
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
                <h2 className="text-2xl font-bold text-red-600 mb-4">
                    Something went wrong!
                </h2>
                <p className="text-gray-600 mb-4">
                    An unexpected error has occurred. We have been notified and are working to fix the issue.
                </p>
                <button
                    onClick={reset}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-200"
                >
                    Try again
                </button>
            </div>
        </div>
        </body>
        </html>
    );
}