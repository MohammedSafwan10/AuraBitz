"use client";

export function WebGLLoader() {
    return (
        <div className="absolute inset-0 z-0 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-4">
                {/* Animated ring */}
                <div className="relative w-12 h-12">
                    <div
                        className="absolute inset-0 rounded-full border-2 border-white/5"
                    />
                    <div
                        className="absolute inset-0 rounded-full border-2 border-t-white/40 border-r-transparent border-b-transparent border-l-transparent animate-spin"
                    />
                </div>
                <span className="text-[10px] font-mono tracking-[0.25em] text-white/30 uppercase">
                    Initializing WebGL
                </span>
            </div>
        </div>
    );
}
