import { cookies } from 'next/headers';
import { getAdminQueue, verifyAdminToken } from '@/lib/store';
import AdminClient from './AdminClient';
import AdminLoginForm from './AdminLoginForm';
import { ShieldCheck, Lock } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Admin Review Queue & Verification Gate | HITL Directory',
  description: 'Private administrative review queue for specialist applications and founder matchmaking inquiries.',
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('hitl_admin_token')?.value || '';
  const isAuthorized = verifyAdminToken(sessionToken);

  if (!isAuthorized) {
    return (
      <div className="max-w-md mx-auto px-4 py-24">
        <div className="glass-panel rounded-3xl p-8 border border-white/[0.08] bg-[#11131c]/90 text-center shadow-2xl space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto text-emerald-400">
            <Lock className="w-7 h-7" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-white">Admin Review Login</h1>
            <p className="text-xs text-zinc-400 mt-1">
              Authenticate with your administrative review secret to access the verification queue.
            </p>
          </div>

          <AdminLoginForm />
        </div>
      </div>
    );
  }

  const data = await getAdminQueue(sessionToken);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <AdminClient
        applications={data.applications || []}
        experts={data.experts || []}
        matchRequests={data.matchRequests || []}
        token={sessionToken}
      />
    </div>
  );
}
