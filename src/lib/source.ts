import { blockSources, componentSources } from "@/generated/source-registry";

export function getComponentSource(componentName: string): string {
    return componentSources[componentName as keyof typeof componentSources] ?? "";
}

export function getBlockSource(blockFileName: string): string {
    return blockSources[blockFileName as keyof typeof blockSources] ?? "";
}
