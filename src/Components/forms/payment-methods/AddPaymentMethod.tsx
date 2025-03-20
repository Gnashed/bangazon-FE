import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

interface AddPaymentMethodProps {
  cardNumber: string;
  securityCode: string;
  expirationDate: string;
}

export default function AddPaymentMethod() {
  const [formData, setFormData] = useState<AddPaymentMethodProps>({
    cardNumber: '',
    securityCode: '',
    expirationDate: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className='d-flex flex-column align-items-center'>
      <Form>
        <Form.Group>
          <Form.Label>Card number</Form.Label>
          <Form.Control name='cardNumber' value={formData.cardNumber} onChange={handleChange} required />
          <Form.Label>Security code</Form.Label>
          <Form.Control name='securityCode' value={formData.securityCode} onChange={handleChange} required />
          <Form.Label>Expiration Date</Form.Label>
          <Form.Control name='expirationDate' value={formData.expirationDate} onChange={handleChange} required />
        </Form.Group>
      </Form>
    </div>
  );
};
