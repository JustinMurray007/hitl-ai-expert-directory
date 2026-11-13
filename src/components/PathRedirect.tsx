export default function PathRedirect({ href, title }: { href: string; title: string }) {
  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <meta httpEquiv="refresh" content={`0; url=${href}`} />
      <h1 className="text-2xl font-semibold text-ink sm:text-3xl">{title}</h1>
      <p className="mt-3 text-base text-muted-strong">
        This page moved to{' '}
        <a className="font-medium text-brand" href={href}>
          {href}
        </a>
        .
      </p>
    </div>
  );
}
