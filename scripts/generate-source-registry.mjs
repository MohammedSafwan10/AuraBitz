import { promises as fs } from "node:fs";
import path from "node:path";

const root = process.cwd();
const outFile = path.join(root, "src", "generated", "source-registry.ts");
const catalogFile = path.join(root, "src", "config", "catalog.json");

function sourceEntriesFromCatalog(categories) {
  return Object.fromEntries(
    categories
      .flatMap((category) => category.items)
      .filter((item) => item.sourceKey && item.sourcePath)
      .map((item) => [item.sourceKey, item.sourcePath])
  );
}

const catalog = JSON.parse(await fs.readFile(catalogFile, "utf8"));
const componentFiles = sourceEntriesFromCatalog(catalog.docs);
const blockFiles = sourceEntriesFromCatalog(catalog.blocks);

async function readEntries(entries) {
  const pairs = await Promise.all(
    Object.entries(entries).map(async ([key, relativePath]) => {
      const absolutePath = path.join(root, relativePath);
      const content = await fs.readFile(absolutePath, "utf8");
      return [key, content];
    })
  );

  return Object.fromEntries(pairs);
}

const components = await readEntries(componentFiles);
const blocks = await readEntries(blockFiles);

const fileContent = `export const componentSources = ${JSON.stringify(components, null, 2)} as const;

export const blockSources = ${JSON.stringify(blocks, null, 2)} as const;
`;

await fs.mkdir(path.dirname(outFile), { recursive: true });
await fs.writeFile(outFile, fileContent, "utf8");
