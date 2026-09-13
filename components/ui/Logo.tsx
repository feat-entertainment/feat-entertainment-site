import Image from "next/image";
import { siteConfig } from "@/lib/site";

type LogoVariant = "mark" | "full";
type LogoTheme = "navy" | "white";

const SOURCES: Record<LogoVariant, Record<LogoTheme, { src: string; width: number; height: number }>> = {
  mark: {
    navy: { src: "/images/logo-mark-navy.png", width: 900, height: 265 },
    white: { src: "/images/logo-mark-white.png", width: 900, height: 265 },
  },
  full: {
    navy: { src: "/images/logo-full-navy.png", width: 900, height: 382 },
    white: { src: "/images/logo-full-white.png", width: 900, height: 382 },
  },
};

type LogoProps = {
  variant?: LogoVariant;
  theme?: LogoTheme;
  className?: string;
  priority?: boolean;
};

export function Logo({ variant = "mark", theme = "navy", className, priority }: LogoProps) {
  const source = SOURCES[variant][theme];
  return (
    <Image
      src={source.src}
      alt={siteConfig.name}
      width={source.width}
      height={source.height}
      priority={priority}
      className={className}
    />
  );
}
