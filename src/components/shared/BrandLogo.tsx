import Link from 'next/link';

interface BrandLogoProps {
  compact?: boolean;
  href?: string;
  inverted?: boolean;
  primaryText?: string;
  secondaryText?: string;
  logoLightUrl?: string;
  logoDarkUrl?: string;
}

export default function BrandLogo({
  compact = false,
  href = '/',
  inverted = false,
  primaryText = 'ASDEV',
  secondaryText = 'Solution Technology',
  logoLightUrl = '/brand/asdev-logo-light.png',
  logoDarkUrl = '/brand/asdev-logo-dark.png',
}: BrandLogoProps) {
  return (
    <Link href={href} className="flex items-center gap-3" aria-label={primaryText}>
      <div className="relative h-11 w-11 overflow-hidden rounded-full ring-1 ring-neutral-200 dark:ring-white/20">
        <img src={logoLightUrl} alt={`${primaryText} logo`} className="h-full w-full object-cover dark:hidden" />
        <img src={logoDarkUrl} alt={`${primaryText} logo`} className="hidden h-full w-full object-cover dark:block" />
      </div>
      {!compact && (
        <div className="leading-tight">
          <p
            className={`text-sm font-black tracking-[0.12em] ${
              inverted ? 'text-slate-100' : 'text-slate-900 dark:text-slate-100'
            }`}
          >
            {primaryText}
          </p>
          <p
            className={`text-[11px] uppercase tracking-[0.08em] ${
              inverted ? 'text-slate-300' : 'text-slate-500 dark:text-slate-300'
            }`}
          >
            {secondaryText}
          </p>
        </div>
      )}
    </Link>
  );
}
