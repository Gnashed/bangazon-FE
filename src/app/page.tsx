'use client';

import { useAuth } from '@/utils/context/authContext';

export default function Home() {
  const { user } = useAuth();

  return (
    <>
      <h1 className="mb-5">
        {/* Type Guard - TS concept */}
        {/* In the context of Google Firebase, the `User` can be an object or false. TypeScript doesn't know if the `displayName` property can be used in either cases, so we need to do some type narrowing. */}
        {/* Below is a type guard. This ensures user isn't false before we access the displayName property. */}
        Welcome, {user && typeof user !== 'boolean' ? user.displayName || 'Guest': 'Guest'}!
      </h1>
    </>
  );
};
