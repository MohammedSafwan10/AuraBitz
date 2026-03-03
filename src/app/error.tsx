"use client";

import { useEffect } from "react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error("Application error:", error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-6 text-center px-4">
            <h2 className="text-2xl font-bold tracking-tight">Something went wrong!</h2>
            <p className="text-white/60 font-mono text-sm max-w-md">
                An unexpected error occurred in this section. Our engines are attempting to recover the state.
            </p>
            <button
                onClick={() => reset()}
                className="bg-white text-black font-mono text-sm px-6 py-3 uppercase font-bold tracking-widest hover:bg-[#00e5ff] transition-colors"
            >
                Try again
            </button>
        </div>
    );
}
