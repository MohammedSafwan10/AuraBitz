import { Sidebar } from "@/components/site/sidebar";
import { Header } from "@/components/site/header";

export default function ComponentsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex flex-col bg-black">
            <Header />
            <div className="flex-1 flex w-full items-start">
                <Sidebar />
                <main className="flex-1 p-8 md:p-12 lg:px-16 min-w-0">
                    {children}
                </main>
            </div>
        </div>
    );
}
