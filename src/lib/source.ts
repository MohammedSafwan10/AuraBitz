import fs from "fs";
import path from "path";

export function getComponentSource(componentName: string): string {
    const filePath = path.join(process.cwd(), "src", "components", "ui", componentName, "index.tsx");
    return fs.readFileSync(filePath, "utf-8");
}

export function getBlockSource(blockFileName: string): string {
    const filePath = path.join(process.cwd(), "src", "components", "blocks", blockFileName);
    return fs.readFileSync(filePath, "utf-8");
}
