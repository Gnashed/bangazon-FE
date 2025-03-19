'use client';

import { useState, useEffect } from 'react';
import { getOrderById } from '@/api/orderData';
import { OrderData } from '@/types/api';
import Image from 'next/image';
import OrderItem from '@/Components/OrderItem';

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
    <div className="d-flex flex-column align-items-center">
      <h1 className="text-center my-3">Order Details</h1>

      <div className="d-flex my-5">

        <div className="left-side w-65">
          <div>
            <h4>Order Confirmed</h4>
            <p>
              Thank you for supporting . Once your order ships, the tracking number will be emailed to you.
            </p>
            <Image src={`https://${orderData?.orderItems[0].product.store.storeImageUrl}`} alt='' width={400} height={250} />
          </div>
          <div>
            <small>
              Need help with the order? Click here to message the seller.
            </small>
          </div>
        </div>

        <div className="right-side w-35">
          <h2>Items</h2>
          {orderData?.orderItems.map((item) => (
            <OrderItem 
              key={item.product.id}
              id={item.product.id}
              name={item.product.name}
              imageUrl={item.product.imageUrl}
              price={item.product.price}
              itemQuantity={item.itemQuantity}
            />
          ))}
          <div>
            <p>Total Items: </p>
            <p>Shipping: $</p>
            <p>Total: $</p>
          </div>
        </div>
      </div>
    </div>
  )
}
