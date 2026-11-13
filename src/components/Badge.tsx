import React from 'react';
import Link from 'next/link';

export function ToolBadge({ name, href }: { name: string; href?: string }) {
  const className =
    'inline-flex items-center px-3 py-1 rounded-lg text-sm bg-brand-soft text-brand border border-brand-line font-semibold hover:bg-brand-tint transition-colors';
  if (href) {
    return (
      <Link href={href} className={className}>
        {name}
      </Link>
    );
  }
  return <span className={className}>{name}</span>;
}

export function CategoryBadge({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-bold bg-brand-soft text-brand-hover border border-brand-tint">
      {name}
    </span>
  );
}

export function EngagementBadge({ model }: { model: string }) {
  const map: Record<string, string> = {
    fixed_sprint: 'Fixed Sprint',
    monthly_retainer: 'Monthly Retainer',
    consulting_audit: 'Consulting Audit',
    hybrid: 'Hybrid Sprint + Retainer',
  };

  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-sm bg-canvas-muted text-ink-soft border border-line font-medium">
      {map[model] || model}
    </span>
  );
}
