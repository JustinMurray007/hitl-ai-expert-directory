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
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div>
        <label className="block text-sm font-bold text-[#001e00] mb-1.5">
          Admin Review Token
        </label>
        <div className="relative">
          <KeyRound className="w-4 h-4 text-[#889888] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="password"
            name="token"
            required
            defaultValue="hitl-admin-secret-2026"
            placeholder="Enter secret token..."
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#f9faf9] border border-[#d5ded5] text-base text-[#001e00] focus:outline-none focus:border-[#108a00] focus:bg-white font-medium"
          />
        </div>
        <p className="text-xs sm:text-sm text-[#5e6d55] mt-2 font-medium">
          Local default: <code className="text-[#108a00] font-mono font-bold">hitl-admin-secret-2026</code>
        </p>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 rounded-full bg-[#108a00] hover:bg-[#14a800] text-white font-bold text-base shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
      >
        <span>{isSubmitting ? 'Authenticating...' : 'Authenticate Session'}</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </form>
  );
}
