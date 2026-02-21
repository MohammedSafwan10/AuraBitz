export const metadata = {
    title: "Testimonials - AuraBitz Blocks",
    description: "Minimalist testimonial and social proof blocks.",
};

export default function TestimonialsPage() {
    return (
        <div className="max-w-5xl pb-20">
            <div className="relative mb-10">
                <div className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-white/[0.03] blur-[100px] rounded-full pointer-events-none" />
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-white/60 border border-white/10 rounded-full bg-white/[0.02]">
                            Landing Page Blocks
                        </div>
                    </div>
                    <h1 className="grad-text text-4xl md:text-5xl font-extrabold tracking-tighter mb-5">Testimonials</h1>
                    <p className="text-white/50 text-lg leading-relaxed font-light max-w-2xl">
                        Clean typography carousels and grid networks for establishing social proof.
                    </p>
                </div>
            </div>
            <div className="p-8 border border-white/[0.05] bg-[#050505] rounded-2xl flex items-center justify-center min-h-[400px]">
                <p className="text-white/20 font-mono text-xs uppercase tracking-widest text-center">Testimonial blocks coming soon...</p>
            </div>
        </div>
    );
}
