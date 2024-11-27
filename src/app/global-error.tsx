'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
    useEffect(() => {
        // Log the error to Sentry
        Sentry.captureException(error);
        console.error(error);
    }, [error]);

    return (
        <html>
        <body>
        <h2>Something went wrong!</h2>
        <p>{error.message}</p>
        <button onClick={() => reset()}>Try again</button>
        </body>
        </html>
    );
}
