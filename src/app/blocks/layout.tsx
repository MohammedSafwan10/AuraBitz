import { BlocksWorkspace } from "@/components/site/blocks-workspace";
import { Header } from "@/components/site/header";

export default function BlocksLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex flex-col bg-black">
            <Header />
            <BlocksWorkspace>{children}</BlocksWorkspace>
        </div>
    );
}
