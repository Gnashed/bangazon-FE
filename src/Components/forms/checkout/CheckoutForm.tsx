'use client'

import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { getCustomerPaymentMethods } from '@/api/paymentMethodData';
import { PaymentMethodData } from '@/types/api';
// import { createOrder } from '@/api/orderData';

interface FormDataProps {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: number;
  paymentMethod: number;
}

// interface pa

export default function CheckoutForm() {
  const [formData, setFormData] = useState<FormDataProps>({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: Number(''),
    paymentMethod: Number('')
  });
  const [paymentMethodData, setPaymentMethodData] = useState<PaymentMethodData[] | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // createOrder({
      
    // })
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
          <Form.Select aria-label='Select input field' name='paymentMethod' value={formData.paymentMethod}>
          <option>Select payment method</option>
            {paymentMethodData?.map((pm) => (
              <option key={pm.id} value={pm.id}>{pm.cardNumber}</option>
            ))}
          </Form.Select>
        </Form.Group>

        <Button variant='outline-primary'>Place Order</Button>

      </Form>
    </div>
  );
}
