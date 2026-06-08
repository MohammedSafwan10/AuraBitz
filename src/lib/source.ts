import { blockSources, componentSources } from "@/generated/source-registry";

export type ComponentSourceKey = keyof typeof componentSources;
export type BlockSourceKey = keyof typeof blockSources;

export function getComponentSource(componentName: ComponentSourceKey): string {
    return componentSources[componentName];
}

export function getBlockSource(blockFileName: BlockSourceKey): string {
    return blockSources[blockFileName];
}

export function tryGetComponentSource(componentName: string): string {
    return componentSources[componentName as ComponentSourceKey] ?? "";
}

export function tryGetBlockSource(blockFileName: string): string {
    return blockSources[blockFileName as BlockSourceKey] ?? "";
}
