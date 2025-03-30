'use client'

import { useState, useEffect, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { getCustomerPaymentMethods } from '@/api/paymentMethodData';
import { PaymentMethodData, OrderPayload, OrderItemsData } from '@/types/api';
import { createOrder } from '@/api/orderData';
import { CartContext } from '@/utils/context/CartContext';
import { useRouter } from 'next/navigation';
import { useClearCart } from '@/utils/context/CartContext';

interface FormDataProps {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: number;
  paymentMethod: number;
}

export default function CheckoutForm() {
  const router = useRouter();
  const cartItems = useContext(CartContext);
  const clearCart = useClearCart();

  console.log(cartItems);
  const [paymentMethodData, setPaymentMethodData] = useState<PaymentMethodData[] | null>(null);

  const [formData, setFormData] = useState<FormDataProps>({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: Number(''),
    paymentMethod: Number('')
  });

  let cartTotal = 0;
  const orderItems: OrderItemsData[] = [];

  cartItems.forEach((item) => {
    if (item.itemQuantity > 1) {
      const itemPrice = item.product.price * item.itemQuantity;
      cartTotal += itemPrice;
    } else if (item.itemQuantity === 1) {
      cartTotal += item.product.price;
    }
    return cartTotal;
  });

  cartItems.forEach((item) => {
    const obj = {
      orderId: 0,
      productId: item.product.id,
      itemQuantity: item.itemQuantity
    };
    orderItems.push(obj);
  });

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const formatDate = `${year}-${month}-${day}T00:00:00Z`;

  const orderObjectPayload: OrderPayload = {
    isCompleted: true,
    orderTotal: cartTotal,
    orderDate: formatDate,
    customerId: Number(formData.paymentMethod),
    paymentMethodId: Number(formData.paymentMethod),
    orderStatus: 'Order Received',
    estimatedDeliveryDate: '2025-03-30T00:00:00Z',
    orderItems: orderItems
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let confirmationUrl = '';

    // TODO: Pass in the cart items
    createOrder(orderObjectPayload, orderItems)
      .then((orderResponse) => {
        clearCart();
        
        confirmationUrl = `/order/confirmed?id=${encodeURIComponent(orderResponse.id)}&estimatedDeliveryDate=${encodeURIComponent(orderResponse.estimatedDeliveryDate)}`;

        router.push(confirmationUrl)
      });
    // console.log(orderObjectPayload, orderItems);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: name === 'paymentMethod' ? Number(value) : value,
    }))
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();

    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  };

  useEffect(() => {
    getCustomerPaymentMethods(1).then(setPaymentMethodData);
  }, []);

  return (
    <div className='d-flex flex-column text text-center mt-5'>
      <Form onSubmit={handleSubmit}>
        <h2 className='mb-3'>Shipping Information</h2>

        <Form.Group>
          <Form.FloatingLabel label="First name">
            <Form.Control type='text' name='firstName' onChange={handleChange} value={formData.firstName} required />
          </Form.FloatingLabel>

          <Form.FloatingLabel label="Last name">
            <Form.Control type='text' name='lastName' onChange={handleChange} value={formData.lastName} required />
          </Form.FloatingLabel>

          <Form.FloatingLabel label="Address">
            <Form.Control type='text' name='address' onChange={handleChange} value={formData.address} required />
          </Form.FloatingLabel>

          <Form.FloatingLabel label="City">
            <Form.Control type='text' name='city' onChange={handleChange} value={formData.city} required />
          </Form.FloatingLabel>

          <Form.FloatingLabel label="State">
            <Form.Control type='text' name='state' onChange={handleChange} value={formData.state} required />
          </Form.FloatingLabel>

          <Form.FloatingLabel label="Zip code">
            <Form.Control type='number' name='zipCode' onChange={handleChange} value={formData.zipCode} required />
          </Form.FloatingLabel>
        </Form.Group>

        <h2 className='text-center mt-5'>Payment Method</h2>

        <Form.Group className='my-3'>
          <Form.Select aria-label='Select input field' name='paymentMethod' onChange={handleSelectChange} value={Number(formData.paymentMethod)}>
          <option>Select payment method</option>
            {paymentMethodData?.map((pm) => (
              <option key={pm.id} value={pm.id}>{pm.cardNumber}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Button variant='outline-primary' type='submit'>Place Order</Button>

      </Form>
    </div>
  );
}
