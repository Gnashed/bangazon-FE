'use client';

import {useState, useEffect} from 'react';
import { useAuth } from '@/utils/context/authContext';
import { OrderData } from '@/types/api';
import { getOrdersByCustomerUid } from '@/api/orderData';
import OrderComponent from '@/Components/OrderComponent';

export default function OrderHistoryPage() {
  const { user } = useAuth();
  const [ordersData, setOrdersData] = useState<OrderData[] | null>(null);
  useEffect(() => {
    // Note that the endpoint returns the customer data and the nested orders array data. I did this intentionally in the backend.
    getOrdersByCustomerUid(user!.uid).then(setOrdersData);
  }, [user]);

  return (
    <div className="d-flex flex-column text-center align-items-center my-5">
      <h1 className="mb-5">Order History</h1>
      {ordersData?.map((order) => (
        <OrderComponent
          key={order.id}
          id={order.id}
          // TODO: Fix image not rendering issue.
          imageUrl={`https://google.com}`}
          orderStatus={order.orderStatus}
          estimatedDeliveryDate={order.estimatedDeliveryDate}
        />
      ))}
    </div>
  );
}
