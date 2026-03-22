import { getLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import manifest from "@/lib/generated/locale-image-manifest.json";
import { LocaleImageClient } from "./LocaleImageClient";

interface LocaleImageProps {
  /** 图片基础名称（不含扩展名和语言后缀） */
  name: string;
  /** 图片扩展名，默认 webp */
  ext?: string;
  /** 图片目录，默认 /screen-short */
  dir?: string;
  /** 图片 alt 文本 */
  alt: string;
  /** 是否优先加载 */
  priority?: boolean;
  /** 填充模式 */
  fill?: boolean;
  /** 固定宽度（非 fill 模式） */
  width?: number;
  /** 固定高度（非 fill 模式） */
  height?: number;
  /** 自定义 className */
  className?: string;
  /** 是否支持主题切换，默认 true */
  themeAware?: boolean;
}

type Theme = "light" | "dark";

type ManifestEntry = {
  default: string | null;
  locales: Partial<Record<Locale, string>>;
  themes: Partial<Record<Theme, string>>;
  localeThemes: Partial<Record<Locale, Partial<Record<Theme, string>>>>;
};

type LocaleImageManifest = Record<
  string,
  Record<string, Record<string, ManifestEntry>>
>;

const localeImageManifest = manifest as LocaleImageManifest;
const defaultTheme: Theme = "dark";

function normalizeDir(dir: string) {
  return dir.replace(/^\/+|\/+$/g, "");
}

function fallbackSrc(dir: string, name: string, ext: string) {
  return dir ? `/${dir}/${name}.${ext}` : `/${name}.${ext}`;
}

function getManifestEntry(dir: string, name: string, ext: string) {
  return localeImageManifest[dir]?.[name]?.[ext];
}

function resolveSrc(
  entry: ManifestEntry | undefined,
  locale: Locale,
  ext: string,
  dir: string,
  name: string,
  theme?: Theme
) {
  const localeThemeSrc = theme
    ? entry?.localeThemes?.[locale]?.[theme]
    : undefined;
  const localeSrc = entry?.locales?.[locale];
  const themeSrc = theme ? entry?.themes?.[theme] : undefined;
  const defaultSrc = entry?.default;

  return localeThemeSrc ?? localeSrc ?? themeSrc ?? defaultSrc ?? fallbackSrc(dir, name, ext);
}

function resolveDefaultSrc(
  entry: ManifestEntry | undefined,
  locale: Locale,
  ext: string,
  dir: string,
  name: string
) {
  return (
    entry?.localeThemes?.[locale]?.[defaultTheme] ??
    entry?.locales?.[locale] ??
    entry?.themes?.[defaultTheme] ??
    entry?.themes?.light ??
    entry?.default ??
    fallbackSrc(dir, name, ext)
  );
}

/**
 * 本地化图片组件（支持明暗主题）
 *
 * 图片变体由构建期 manifest 管理，运行时只负责查表，不再探测文件是否存在。
 */
export async function LocaleImage({
  name,
  ext = "webp",
  dir = "/screen-short",
  alt,
  priority = false,
  fill = false,
  width,
  height,
  className,
  themeAware = true,
}: LocaleImageProps) {
  const rawLocale = await getLocale();
  const locale = routing.locales.includes(rawLocale as Locale)
    ? (rawLocale as Locale)
    : routing.defaultLocale;
  const normalizedDir = normalizeDir(dir);
  const entry = getManifestEntry(normalizedDir, name, ext);
  const defaultSrc = resolveDefaultSrc(entry, locale, ext, normalizedDir, name);

  if (!themeAware) {
    return (
      <LocaleImageClient
        alt={alt}
        src={defaultSrc}
        priority={priority}
        fill={fill}
        width={width}
        height={height}
        className={className}
      />
    );
  }

  const lightSrc = resolveSrc(
    entry,
    locale,
    ext,
    normalizedDir,
    name,
    "light"
  );
  const darkSrc = resolveSrc(
    entry,
    locale,
    ext,
    normalizedDir,
    name,
    "dark"
  );

  return (
    <LocaleImageClient
      alt={alt}
      src={defaultSrc}
      priority={priority}
      fill={fill}
      width={width}
      height={height}
      className={className}
      themeSources={{ light: lightSrc, dark: darkSrc }}
    />
  );
}
