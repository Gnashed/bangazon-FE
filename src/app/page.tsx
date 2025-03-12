'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/utils/context/authContext';
import { getUserDataByUid } from '@/api/userData';

interface UserDataProps {
  id: number;
  uid: string;
  isSeller: boolean;
};

export default function Home() {
  const { user } = useAuth();
  const [userData, setUserData] = useState<UserDataProps | null>(null);

  useEffect(() => {
    // console.log(user!.uid);
    getUserDataByUid(user!.uid).then(setUserData);
  }, [user]);

  return (
    <>
      {userData?.isSeller === false ? 'Want to sell products?' : 'Welcome back. Get to selling!'}
      <h1 className="mb-5">
        {/* Type Guard - TS concept */}
        {/* In the context of Google Firebase, the `User` can be an object or false. TypeScript doesn't know if the `displayName` property can be used in either cases, so we need to do some type narrowing. */}
        {/* Below is a type guard. This ensures user isn't false before we access the displayName property. */}
        Welcome, { user?.displayName || 'Guest' }!
      </h1>
    </>
  );
};
