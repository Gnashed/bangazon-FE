import Image from 'next/image';
import React from 'react';

interface OrderItemProp {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  itemQuantity: number;
};

function OrderItem({ id, name, imageUrl, price, itemQuantity }: OrderItemProp) {
  return (
    <div key={id} className="d-flex">
      <Image 
        src={`${imageUrl}`}
        alt={`Image of ${name}`}
        width={50}
        height={50}
      />
      <p>{name}</p>
      <p>${price}</p>
      <p>Qty: {itemQuantity}</p>
    </div>
  );
};

export default OrderItem;
