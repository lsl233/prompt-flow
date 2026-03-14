import Image from "next/image";
import { getLocale } from "next-intl/server";
import { existsSync } from "fs";
import { join } from "path";

interface LocaleImageProps {
  /** 图片基础名称（不含扩展名和语言后缀） */
  name: string;
  /** 图片扩展名，默认 png */
  ext?: string;
  /** 图片目录，默认 /screen-short */
  dir?: string;
  /** 兜底语言，默认 en */
  fallback?: string;
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
}

/**
 * 本地化图片组件
 *
 * 根据当前语言自动选择对应图片：
 * - /screen-short/{name}.{locale}.{ext}
 * - 不存在则使用 fallback 语言版本
 *
 * 使用示例：
 * ```tsx
 * <LocaleImage name="hero" alt="产品截图" fill className="object-cover" />
 * // 渲染为：/screen-short/hero.zh.png 或 /screen-short/hero.en.png
 * ```
 */
export async function LocaleImage({
  name,
  ext = "png",
  dir = "/screen-short",
  fallback = "en",
  alt,
  priority = false,
  fill = false,
  width,
  height,
  className,
}: LocaleImageProps) {
  const locale = await getLocale();

  // 构建图片路径
  const localizedPath = `${dir}/${name}.${locale}.${ext}`;
  const fallbackPath = `${dir}/${name}.${fallback}.${ext}`;

  // 检查本地文件是否存在（仅在服务端构建时检查）
  const publicDir = join(process.cwd(), "public");
  const localFilePath = join(publicDir, localizedPath);
  const hasLocalFile = existsSync(localFilePath);

  const src = hasLocalFile ? localizedPath : fallbackPath;

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      priority={priority}
      className={className}
    />
  );
}
