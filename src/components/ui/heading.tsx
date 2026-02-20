import { cn } from "@/lib/utils";

type HeadingLevel = "h1" | "h2" | "h3" | "h4";

interface HeadingProps {
    as?: HeadingLevel;
    size?: "xl" | "lg" | "md" | "sm";
    className?: string;
    children: React.ReactNode;
}

const sizeMap: Record<NonNullable<HeadingProps["size"]>, string> = {
    xl: "text-4xl md:text-5xl font-extrabold tracking-tighter",
    lg: "text-3xl font-extrabold tracking-tighter",
    md: "text-2xl font-extrabold tracking-tighter",
    sm: "text-xl font-bold tracking-tight",
};

export function Heading({ as: Tag = "h2", size = "md", className, children }: HeadingProps) {
    return (
        <Tag className={cn("grad-text", sizeMap[size], className)}>
            {children}
        </Tag>
    );
}
