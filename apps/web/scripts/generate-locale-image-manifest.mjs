import { mkdir, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const rootDir = process.cwd();
const publicDir = path.join(rootDir, "public");
const outputFile = path.join(
  rootDir,
  "lib/generated/locale-image-manifest.json"
);

const locales = new Set(["en", "zh"]);
const themes = new Set(["light", "dark"]);

function createEntry() {
  return {
    default: null,
    locales: {},
    themes: {},
    localeThemes: {},
  };
}

async function walk(dir, baseDir = dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return walk(fullPath, baseDir);
      }

      if (!entry.isFile() || entry.name.startsWith(".")) {
        return [];
      }

      return [path.relative(baseDir, fullPath)];
    })
  );

  return files.flat();
}

function compareValues(a, b) {
  return a.localeCompare(b);
}

function sortObject(value) {
  if (Array.isArray(value) || value === null || typeof value !== "object") {
    return value;
  }

  return Object.fromEntries(
    Object.entries(value)
      .sort(([left], [right]) => compareValues(left, right))
      .map(([key, nested]) => [key, sortObject(nested)])
  );
}

function parseVariant(filePath) {
  const parsed = path.parse(filePath);
  const dir = parsed.dir;
  const ext = parsed.ext.slice(1);
  const segments = parsed.name.split(".");

  if (segments.length === 0 || !ext) {
    return null;
  }

  const [name, ...variants] = segments;

  if (!name) {
    return null;
  }

  if (variants.length === 0) {
    return { dir, name, ext, kind: "default" };
  }

  if (variants.length === 1) {
    const [token] = variants;

    if (locales.has(token)) {
      return { dir, name, ext, kind: "locale", locale: token };
    }

    if (themes.has(token)) {
      return { dir, name, ext, kind: "theme", theme: token };
    }

    return null;
  }

  if (variants.length === 2) {
    const [locale, theme] = variants;

    if (locales.has(locale) && themes.has(theme)) {
      return {
        dir,
        name,
        ext,
        kind: "localeTheme",
        locale,
        theme,
      };
    }
  }

  return null;
}

function relativeSrc(filePath) {
  return `/${filePath.split(path.sep).join("/")}`;
}

async function main() {
  const files = await walk(publicDir);
  const manifest = {};

  for (const filePath of files) {
    const parsed = parseVariant(filePath);

    if (!parsed) {
      continue;
    }

    const dirKey = parsed.dir;
    manifest[dirKey] ??= {};
    manifest[dirKey][parsed.name] ??= {};
    manifest[dirKey][parsed.name][parsed.ext] ??= createEntry();

    const entry = manifest[dirKey][parsed.name][parsed.ext];
    const src = relativeSrc(filePath);

    switch (parsed.kind) {
      case "default":
        entry.default = src;
        break;
      case "locale":
        entry.locales[parsed.locale] = src;
        break;
      case "theme":
        entry.themes[parsed.theme] = src;
        break;
      case "localeTheme":
        entry.localeThemes[parsed.locale] ??= {};
        entry.localeThemes[parsed.locale][parsed.theme] = src;
        break;
      default:
        break;
    }
  }

  await mkdir(path.dirname(outputFile), { recursive: true });
  await writeFile(outputFile, `${JSON.stringify(sortObject(manifest), null, 2)}\n`);
}

main().catch((error) => {
  console.error("Failed to generate locale image manifest.");
  console.error(error);
  process.exitCode = 1;
});
