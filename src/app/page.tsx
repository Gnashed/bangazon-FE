'use client';

import { useAuth } from '@/utils/context/authContext';

export default function Home() {
  const { user } = useAuth();

  return (
    <>
      <h1 className="mb-5">
        {/* Type Guard - TS concept */}
        Welcome, {user && typeof user !== 'boolean' ? user.displayName || 'Guest': 'Guest'}!
      </h1>
    </>
  );
};
