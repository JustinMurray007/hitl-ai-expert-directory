import React from 'react';

export function VerifiedBadge({ count }: { count?: number }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm shadow-emerald-500/10"
      title="Verified: Identity confirmed and at least 2 reviewed production case studies"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
      Verified Specialist
      {typeof count === 'number' && count > 0 && (
        <span className="text-[10px] text-emerald-300 font-mono bg-emerald-950/60 px-1.5 py-0.2 rounded-full border border-emerald-500/20">
          {count} studies
        </span>
      )}
    </span>
  );
}

export function SponsorBadge() {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
      ★ Featured
    </span>
  );
}

export function ToolBadge({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-zinc-800/80 text-zinc-300 border border-zinc-700/60 hover:border-zinc-500 transition-colors">
      {name}
    </span>
  );
}

export function CategoryBadge({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-zinc-800/60 text-zinc-300 border border-zinc-700/50">
      {name}
    </span>
  );
}

export function BudgetBadge({ tier }: { tier: string }) {
  const map: Record<string, { label: string; color: string }> = {
    under_2500: { label: '< $2.5k start', color: 'text-zinc-300 bg-zinc-800/70 border-zinc-700' },
    '2500_to_5000': { label: '$2.5k – $5k', color: 'text-zinc-200 bg-zinc-800 border-zinc-600' },
    '5000_to_15000': { label: '$5k – $15k', color: 'text-emerald-300 bg-emerald-950/40 border-emerald-800/60' },
    '15000_plus': { label: '$15k+ enterprise', color: 'text-cyan-300 bg-cyan-950/40 border-cyan-800/60' },
  };

  const item = map[tier] || { label: tier, color: 'text-zinc-300 bg-zinc-800 border-zinc-700' };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs border ${item.color}`}>
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
    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-zinc-900 text-zinc-400 border border-zinc-800">
      {map[model] || model}
    </span>
  );
}
