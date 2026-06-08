import catalog from "./catalog.json";

export type CatalogItem = {
    name: string;
    href: string;
    sourceKey?: string;
    sourcePath?: string;
};

export type CatalogCategory = {
    title: string;
    description: string;
    items: CatalogItem[];
};

export type Catalog = {
    docs: CatalogCategory[];
    blocks: CatalogCategory[];
};

export const docsCatalog = catalog.docs satisfies CatalogCategory[];
export const blocksCatalog = catalog.blocks satisfies CatalogCategory[];

export const docsNavigation = docsCatalog.map((category) => ({
    title: category.title,
    links: category.items.map(({ name, href }) => ({ name, href })),
}));

export const blocksNavigation = blocksCatalog.map((category) => ({
    title: category.title,
    links: category.items.map(({ name, href }) => ({ name, href })),
}));

export const docsIndexCatalog = docsCatalog.filter((category) => category.title !== "Get Started");
export const blocksIndexCatalog = blocksCatalog.filter((category) => category.title !== "Overview");
