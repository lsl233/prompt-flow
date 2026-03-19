"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";

interface LocaleImageProps {
  /** 图片基础名称（不含扩展名和语言后缀） */
  name: string;
  /** 图片扩展名，默认 png */
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

/**
 * 本地化图片组件（支持明暗主题）
 *
 * 根据当前语言和主题自动选择对应图片，优先级：
 * 1. /screen-short/{name}.{locale}.{theme}.{ext} (语言+主题版本，如 hero.zh.dark.png)
 * 2. /screen-short/{name}.{locale}.{ext} (语言特定版本，如 hero.zh.png)
 * 3. /screen-short/{name}.{theme}.{ext} (主题特定版本，如 hero.dark.png)
 * 4. /screen-short/{name}.{ext} (通用版本，如 hero.png)
 *
 * 使用示例：
 * ```tsx
 * <LocaleImage name="hero" alt="产品截图" fill className="object-cover" />
 * ```
 */
export function LocaleImage({
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
  const locale = useLocale();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [currentSrcIndex, setCurrentSrcIndex] = useState(0);

  // 避免 hydration 不匹配
  useEffect(() => {
    setMounted(true);
  }, []);

  // 构建候选路径列表
  const getCandidatePaths = () => {
    const paths: string[] = [];
    const theme = themeAware ? resolvedTheme : undefined;

    if (theme) {
      // 优先级 1: 语言+主题组合
      paths.push(`${dir}/${name}.${locale}.${theme}.${ext}`);
    }
    // 优先级 2: 仅语言
    paths.push(`${dir}/${name}.${locale}.${ext}`);

    if (theme) {
      // 优先级 3: 仅主题
      paths.push(`${dir}/${name}.${theme}.${ext}`);
    }
    // 优先级 4: 通用版本
    paths.push(`${dir}/${name}.${ext}`);

    return paths;
  };

  const candidatePaths = getCandidatePaths();

  // 未挂载时使用通用路径
  const src = mounted
    ? candidatePaths[currentSrcIndex]
    : `${dir}/${name}.${ext}`;

  // 图片加载失败时尝试下一个候选
  const handleError = () => {
    if (currentSrcIndex < candidatePaths.length - 1) {
      setCurrentSrcIndex((prev) => prev + 1);
    }
  };

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      priority={priority}
      className={className}
      onError={handleError}
    />
  );
}
