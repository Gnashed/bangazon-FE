'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import Button from 'react-bootstrap/Button';

export default function OrderConfirmation() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const estimatedDeliveryDate = searchParams.get('estimatedDeliveryDate');

  return (
    <div className='d-flex flex-column align-items-center my-5'>
      <h1 className='mb-5'>Order Confirmation</h1>

      <p className='my-5'>
        Your order was received. You will receive a tracking number once the order ships from our fulfillment center. Thank you for choosing us! ❤️
      </p>

      <strong>
        <p>Order number: {id}</p>
        <p>Estimated delivery date: {estimatedDeliveryDate}</p>
      </strong>

      <Button variant='outline-primary' className='my-5' onClick={() => router.push('/')}>Return to store</Button>
    </div>
  )
}
