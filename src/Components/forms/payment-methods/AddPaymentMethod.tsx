import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { createPaymentMethod } from '@/api/paymentMethodData';

interface AddPaymentMethodProps {
  cardNumber: string;
  securityCode: string;
  expirationDate: string;
}

// interface CustomerIdProp {
//   customerId: number;
// }

export default function AddPaymentMethod({ customerId }) {
  // React Bootstrap Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formData, setFormData] = useState<AddPaymentMethodProps>({
    cardNumber: '',
    securityCode: '',
    expirationDate: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: name === 'securityCode' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createPaymentMethod({
      cardNumber: formData.cardNumber,
      securityCode: formData.securityCode,
      expirationDate: formData.securityCode,
      customerId: customerId,
    });
  };

  return (
    <div className='d-flex flex-column align-items-center'>
      <Button variant='primary' onClick={handleShow}>Add</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a payment method</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* TODO: Render Payment Method Form Component */}
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Card number</Form.Label>
              <Form.Control name='cardNumber' value={formData.cardNumber} onChange={handleChange} required />
              <Form.Label>Security code</Form.Label>
              <Form.Control name='securityCode' value={Number(formData.securityCode)} onChange={handleChange} required />
              <Form.Label>Expiration Date</Form.Label>
              <Form.Control name='expirationDate' value={formData.expirationDate} onChange={handleChange} required />
            </Form.Group>

            <Button variant='secondary' type='submit'>Add payment method</Button>
         </Form>
        </Modal.Body>
        <Modal.Footer>
          {/* TODO: Add onClick handler that sends a POST request to create a payment method. */}
          <Button variant='secondary' onClick={handleClose}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
