"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

interface LocaleImageClientProps {
  src: string;
  alt: string;
  priority?: boolean;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  themeSources?: Partial<Record<"light" | "dark", string>>;
}

export function LocaleImageClient({
  src,
  alt,
  priority = false,
  fill = false,
  width,
  height,
  className,
  themeSources,
}: LocaleImageClientProps) {
  const { resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const themedSrc =
    mounted && (resolvedTheme === "light" || resolvedTheme === "dark")
      ? themeSources?.[resolvedTheme] ?? src
      : src;

  return (
    <Image
      src={themedSrc}
      alt={alt}
      fill={fill}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      priority={priority}
      className={className}
    />
  );
}
