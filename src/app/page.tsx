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
        Welcome, { user?.displayName || 'Guest' }!
      </h1>
    </>
  );
};
