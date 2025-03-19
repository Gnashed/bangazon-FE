'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/utils/context/authContext';
import { CustomerData } from '@/types/api';
import { getCustomerByUid } from '@/api/customerData';

export default function ProfilePage() {
  const { user } = useAuth();
  const [customerInfo, setCustomerInfo] = useState<CustomerData | null>(null);
  useEffect(() => {
    getCustomerByUid(user!.uid).then(setCustomerInfo);
  }, [user]);

  return (
    <div className="d-flex flex-column align-items-center my-5">
      <h1>User Profile</h1>
    </div>
  );
};
