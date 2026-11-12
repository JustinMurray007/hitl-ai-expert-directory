type LogoProps = {
  className?: string;
  priority?: boolean;
};

export default function Logo({ className = 'w-10 h-10', priority = false }: LogoProps) {
  return (
    <span className={`relative flex items-center justify-center ${className}`}>
      <picture>
        <source srcSet="/logo-icon.webp" type="image/webp" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo-icon.png"
          alt=""
          width={176}
          height={124}
          decoding="async"
          loading={priority ? 'eager' : 'lazy'}
          className="h-auto w-full"
        />
      </picture>
    </span>
  );
}
