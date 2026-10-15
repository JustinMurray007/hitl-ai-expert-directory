import React from 'react';

export function VerifiedBadge({ count }: { count?: number }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold bg-[#e4f7e6] text-[#108a00] border border-[#b2e8b8]"
      title="Verified: Identity confirmed and at least 2 reviewed production case studies"
    >
      <span className="w-2 h-2 rounded-full bg-[#108a00] animate-pulse" />
      Verified Specialist
      {typeof count === 'number' && count > 0 && (
        <span className="text-sm text-[#108a00] font-mono font-bold bg-white px-2.5 py-0.5 rounded-full border border-[#b2e8b8]">
          {count} studies
        </span>
      )}
    </span>
  );
}

export function SponsorBadge() {
  return (
    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold bg-[#fef9c3] text-[#854d0e] border border-[#fde047]">
      ★ Featured
    </span>
  );
}

export function ToolBadge({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-lg text-sm bg-[#eff6ff] text-[#1d4ed8] border border-[#bfdbfe] font-semibold hover:bg-[#dbeafe] transition-colors">
      {name}
    </span>
  );
}

export function CategoryBadge({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-bold bg-[#f0f7ff] text-[#1e40af] border border-[#dbeafe]">
      {name}
    </span>
  );
}

export function BudgetBadge({ tier }: { tier: string }) {
  const map: Record<string, { label: string; color: string }> = {
    under_2500: { label: '< $2.5k start', color: 'text-[#475569] bg-[#f8fafc] border-[#e2e8f0]' },
    '2500_to_5000': { label: '$2.5k – $5k', color: 'text-[#1e293b] bg-[#f1f5f9] border-[#cbd5e1]' },
    '5000_to_15000': { label: '$5k – $15k', color: 'text-[#166534] bg-[#f0fdf4] border-[#bbf7d0]' },
    '15000_plus': { label: '$15k+ enterprise', color: 'text-[#1e3a8a] bg-[#eff6ff] border-[#bfdbfe]' },
  };

  const item = map[tier] || { label: tier, color: 'text-[#334155] bg-[#f8fafc] border-[#e2e8f0]' };

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
    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-sm bg-[#f1f5f1] text-[#334133] border border-[#dbe3db] font-medium">
      {map[model] || model}
    </span>
  );
}
