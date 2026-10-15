'use client';

import { useState } from 'react';
import { adminLoginAction } from '@/app/actions';
import { KeyRound, ArrowRight, AlertCircle } from 'lucide-react';

export default function AdminLoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const result = await adminLoginAction(formData);
    setIsSubmitting(false);

    if (!result.success) {
      setError(result.error || 'Authentication failed');
    } else {
      window.location.reload();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      {error && (
        <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div>
        <label className="block text-xs font-semibold text-zinc-300 mb-1">
          Admin Review Token
        </label>
        <div className="relative">
          <KeyRound className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="password"
            name="token"
            required
            defaultValue="hitl-admin-secret-2026"
            placeholder="Enter secret token..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none focus:border-emerald-500"
          />
        </div>
        <p className="text-[11px] text-zinc-500 mt-1.5">
          Local default: <code className="text-emerald-400 font-mono">hitl-admin-secret-2026</code>
        </p>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs shadow-md shadow-emerald-500/20 transition-all flex items-center justify-center gap-1.5 disabled:opacity-50 cursor-pointer"
      >
        <span>{isSubmitting ? 'Authenticating...' : 'Authenticate Session'}</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </form>
  );
}
