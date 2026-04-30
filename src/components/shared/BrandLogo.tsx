import Image from "next/image";
import Link from "next/link";

interface BrandLogoProps {
  compact?: boolean;
  href?: string;
  inverted?: boolean;
}

export default function BrandLogo({ compact = false, href = "/", inverted = false }: BrandLogoProps) {
  return (
    <Link href={href} className="flex items-center gap-3" aria-label="Asdev Solution Technology">
      <div className="relative h-11 w-11 overflow-hidden rounded-full ring-1 ring-neutral-200 dark:ring-white/20">
        <Image
          src="/brand/asdev-logo-light.png"
          alt="ASDEV logo"
          fill
          sizes="44px"
          className="object-cover dark:hidden"
          priority
        />
        <Image
          src="/brand/asdev-logo-dark.png"
          alt="ASDEV logo"
          fill
          sizes="44px"
          className="hidden object-cover dark:block"
          priority
        />
      </div>
      {!compact && (
        <div className="leading-tight">
          <p
            className={`text-sm font-black tracking-[0.12em] ${inverted ? 'text-slate-100' : 'text-slate-900 dark:text-slate-100'}`}
          >
            ASDEV
          </p>
          <p
            className={`text-[11px] uppercase tracking-[0.08em] ${inverted ? 'text-slate-300' : 'text-slate-500 dark:text-slate-300'}`}
          >
            Solution Technology
          </p>
        </div>
      )}
    </Link>
  );
}
