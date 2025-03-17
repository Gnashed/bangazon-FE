'use client';

import {useState, useEffect} from 'react';
import { OrderData } from '@/types/api';
import { getCustomerOrdersByCustomerId } from '@/api/orderData';
import { useAuth } from '@/utils/context/authContext';
import { getCustomerByUid } from '@/api/customerData';

export default function OrderHistoryPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<OrderData[] | null>(null);
  useEffect(() => {
    getCustomerByUid(user!.uid).then((customerObj) => {
      getCustomerOrdersByCustomerId(customerObj.id).then(setOrders);
    });
  }, [user]);

  return (
    <div className="d-flex flex-column text-center my-5">
      <h1>Order History</h1>
    </div>
  )
}
