import fs from "fs";
import path from "path";

export function getComponentSource(componentName: string): string {
    const safeComponentName = path.basename(componentName);
    const filePath = path.join(process.cwd(), "src", "components", "ui", safeComponentName, "index.tsx");
    return fs.readFileSync(filePath, "utf-8");
}

export function getBlockSource(blockFileName: string): string {
    const safeBlockFileName = path.basename(blockFileName);
    const filePath = path.join(process.cwd(), "src", "components", "blocks", safeBlockFileName);
    return fs.readFileSync(filePath, "utf-8");
}
