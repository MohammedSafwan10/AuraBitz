"use client";

import { useEffect } from "react";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error("Critical application error:", error);
    }, [error]);

    return (
        <html lang="en">
            <body className="bg-black text-white antialiased">
                <div className="flex flex-col items-center justify-center min-h-screen gap-6 text-center px-4">
                    <h1 className="text-4xl font-black uppercase tracking-tighter">System Failure</h1>
                    <p className="text-white/60 font-mono text-sm max-w-lg">
                        A critical error occurred that could not be recovered by local boundaries. Please stand by while we attempt a hard reset of the UI core.
                    </p>
                    <button
                        onClick={() => reset()}
                        className="bg-white text-black font-mono text-sm px-6 py-3 uppercase font-bold tracking-widest hover:bg-[#00e5ff] transition-colors"
                    >
                        Hard Reset
                    </button>
                </div>
            </body>
        </html>
    );
}
