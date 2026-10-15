import { cookies } from 'next/headers';
import { getAdminQueue, verifyAdminToken } from '@/lib/store';
import AdminClient from './AdminClient';
import AdminLoginForm from './AdminLoginForm';
import { Lock } from 'lucide-react';

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
        <div className="rounded-3xl p-8 border border-[#e4ebe4] bg-white text-center shadow-xs space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-[#e4f7e6] border border-[#b2e8b8] flex items-center justify-center mx-auto text-[#108a00]">
            <Lock className="w-8 h-8" />
          </div>

          <div>
            <h1 className="text-2xl font-black text-[#001e00]">Admin Review Login</h1>
            <p className="text-xs text-[#5e6d55] mt-1 font-medium">
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
