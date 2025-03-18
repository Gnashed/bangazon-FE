import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface OrderComponentProps {
  id: number;
  imageUrl: string;
  orderStatus: string;
  estimatedDeliveryDate: string;
};

export default function OrderComponent({ id, imageUrl, orderStatus, estimatedDeliveryDate }: OrderComponentProps) {
  return (
    <div className="d-flex align-items-center justify-content-center border border-dark rounded-end w-75 my-3">
      <Image
        src={`/${imageUrl}`}
        alt="Image of order item"
        width={100}
        height={100}
        className="mx-3"
      />
      <p className="mx-3"><strong>Status:</strong> {orderStatus}</p>
      <p className="mx-3">{estimatedDeliveryDate}</p>

      <Link href={`/order/${id}`} passHref>View Details</Link>
    </div>
  )
};
