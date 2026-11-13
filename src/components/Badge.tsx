import React from 'react';
import Link from 'next/link';
import type { ListingPlan } from '@/lib/types';

export function PlacementBadge({
  plan,
  sponsorRank = 0,
}: {
  plan?: ListingPlan | null;
  sponsorRank?: number;
}) {
  if (plan === 'premium') {
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold bg-brand-soft text-brand-ink border border-brand-line">
        Premium Featured
      </span>
    );
  }
  if (plan === 'featured' || sponsorRank > 0) {
    return <SponsorBadge />;
  }
  return null;
}

export function SponsorBadge() {
  return (
    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold bg-accent-badge text-accent-badge-ink border border-accent-badge-line">
      ★ Featured
    </span>
  );
}

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

export function BudgetBadge({ tier }: { tier: string }) {
  const map: Record<string, { label: string; color: string }> = {
    under_2500: { label: '< $2.5k start', color: 'text-muted-strong bg-canvas border-line' },
    '2500_to_5000': { label: '$2.5k – $5k', color: 'text-ink bg-canvas-muted border-line-strong' },
    '5000_to_15000': { label: '$5k – $15k', color: 'text-success bg-success-soft border-success-line' },
    '15000_plus': { label: '$15k+ enterprise', color: 'text-brand-ink bg-brand-soft border-brand-line' },
  };

  const item = map[tier] || { label: tier, color: 'text-ink-soft bg-canvas border-line' };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-lg text-sm font-bold border ${item.color}`}>
      {item.label}
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
