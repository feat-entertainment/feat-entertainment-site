import Image from "next/image";
import { siteConfig } from "@/lib/site";

type LogoVariant = "mark" | "full";
type LogoTheme = "navy" | "white";

const SOURCES: Record<LogoVariant, Record<LogoTheme, { src: string; width: number; height: number }>> = {
  mark: {
    navy: { src: "/images/logo-mark-navy.png", width: 406, height: 148 },
    white: { src: "/images/logo-mark-white.png", width: 405, height: 144 },
  },
  full: {
    navy: { src: "/images/logo-full-navy.png", width: 477, height: 220 },
    white: { src: "/images/logo-full-white.png", width: 477, height: 220 },
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
