'use client';

import { useState, useEffect } from 'react';
import { getOrderById } from '@/api/orderData';
import { OrderData } from '@/types/api';

interface ParamsProp {
  params: {
    id: number;
  }
};

export default function OrderDetailsPage({ params }: ParamsProp) {
  const { id } = params;
  const [orderData, setOrderData] = useState<OrderData | null>(null);

  useEffect(() => {
    getOrderById(id).then(setOrderData);
  }, [id]);

  return (
    <div className="d-flex flex-column align-items-center my-5">
      <h1>Order Details</h1>
      
    </div>
  )
}
