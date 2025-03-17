'use client';

import {useState, useEffect} from 'react';
import { CustomerData } from '@/types/api';
import { useAuth } from '@/utils/context/authContext';
import { getCustomerByUid } from '@/api/customerData';

export default function OrderHistoryPage() {
  const { user } = useAuth();
  const [customer, setCustomerData] = useState<CustomerData | null>(null);
  useEffect(() => {
    getCustomerByUid(user!.uid).then(setCustomerData)
  }, [user]);

  return (
    <div className="d-flex flex-column text-center my-5">
      <h1>Order History</h1>
    </div>
  )
}
