'use client';

import {useState, useEffect} from 'react';
import { CustomerData } from '@/types/api';
import { useAuth } from '@/utils/context/authContext';
import { getCustomerByUid } from '@/api/customerData';
import OrderComponent from '@/Components/OrderComponent';

export default function OrderHistoryPage() {
  const { user } = useAuth();
  const [customer, setCustomerData] = useState<CustomerData | null>(null);
  useEffect(() => {
    // Note that the endpoint returns the customer data and the nested orders array data. I did this intentionally in the backend.
    getCustomerByUid(user!.uid).then(setCustomerData)
  }, [user]);

  return (
    <div className="d-flex flex-column text-center my-5">
      <h1>Order History</h1>
      {customer?.orders.map((order) => (
        <OrderComponent
          key={order.id}
          id={order.id}
          imageUrl={order?.orderItems?.product?.imageUrl}
          orderStatus={order.orderStatus}
          estimatedDeliveryDate={order.estimatedDeliveryDate}
        />
      ))}
    </div>
  );
}
