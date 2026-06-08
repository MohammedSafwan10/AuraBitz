import { promises as fs } from "node:fs";
import path from "node:path";

const root = process.cwd();
const catalogFile = path.join(root, "src", "config", "catalog.json");
const sourceRegistryInputFile = path.join(root, "scripts", "generate-source-registry.mjs");
const appDir = path.join(root, "src", "app");

const errors = [];

function report(message) {
  errors.push(message);
}

function routePathFromHref(href) {
  const segments = href.split("/").filter(Boolean);
  if (segments.length === 0) {
    return path.join(root, "src", "app", "page.tsx");
  }

  return path.join(root, "src", "app", ...segments, "page.tsx");
}

async function fileExists(filePath) {
  try {
    const stat = await fs.stat(filePath);
    return stat.isFile();
  } catch {
    return false;
  }
}

async function collectFiles(directory, predicate) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...await collectFiles(entryPath, predicate));
    } else if (predicate(entryPath)) {
      files.push(entryPath);
    }
  }

  return files;
}

function flattenItems(categories) {
  return categories.flatMap((category) =>
    category.items.map((item) => ({ ...item, category: category.title }))
  );
}

const catalog = JSON.parse(await fs.readFile(catalogFile, "utf8"));
const docItems = flattenItems(catalog.docs);
const blockItems = flattenItems(catalog.blocks);
const docSourceItems = docItems.filter((item) => item.sourceKey || item.sourcePath);
const blockSourceItems = blockItems.filter((item) => item.sourceKey || item.sourcePath);
const componentSourceMap = new Map(docSourceItems.map((item) => [item.sourceKey, item]));
const blockSourceMap = new Map(blockSourceItems.map((item) => [item.sourceKey, item]));

for (const [area, items] of [["docs", docItems], ["blocks", blockItems]]) {
  for (const item of items) {
    const routeFile = routePathFromHref(item.href);
    if (!await fileExists(routeFile)) {
      report(`${area} catalog route is missing page file: ${item.href} -> ${path.relative(root, routeFile)}`);
    }
  }
}

for (const [area, items] of [["docs", docSourceItems], ["blocks", blockSourceItems]]) {
  for (const item of items) {
    if (!item.sourceKey || !item.sourcePath) {
      report(`${area} catalog item must define both sourceKey and sourcePath: ${item.href}`);
      continue;
    }

    const sourceFile = path.join(root, item.sourcePath);
    if (!await fileExists(sourceFile)) {
      report(`${area} source file is missing for ${item.sourceKey}: ${item.sourcePath}`);
    }
  }
}

const pageFiles = await collectFiles(appDir, (entryPath) => entryPath.endsWith(`${path.sep}page.tsx`));

for (const pageFile of pageFiles) {
  const relativePageFile = path.relative(root, pageFile).replaceAll(path.sep, "/");
  const content = await fs.readFile(pageFile, "utf8");
  const usesCodePreview = /<CodePreview\b/.test(content);
  const componentMatches = [...content.matchAll(/getComponentSource\(\s*["']([^"']+)["']\s*\)/g)];
  const blockMatches = [...content.matchAll(/getBlockSource\(\s*["']([^"']+)["']\s*\)/g)];

  if (usesCodePreview && componentMatches.length === 0 && blockMatches.length === 0) {
    report(`${relativePageFile} renders CodePreview but does not call getComponentSource()/getBlockSource()`);
  }

  for (const match of componentMatches) {
    const key = match[1];
    if (!componentSourceMap.has(key)) {
      report(`${relativePageFile} uses unknown component source key: ${key}`);
    }
  }

  for (const match of blockMatches) {
    const key = match[1];
    if (!blockSourceMap.has(key)) {
      report(`${relativePageFile} uses unknown block source key: ${key}`);
    }
  }
}

const sourceRegistryInput = await fs.readFile(sourceRegistryInputFile, "utf8");
if (!sourceRegistryInput.includes("catalog.json")) {
  report("scripts/generate-source-registry.mjs must derive mappings from src/config/catalog.json");
}

if (errors.length > 0) {
  console.error("Source registry/catalog check failed:\n");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(`Source registry/catalog check passed (${docSourceItems.length} docs sources, ${blockSourceItems.length} block sources).`);
