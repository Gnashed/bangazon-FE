import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function CheckoutForm() {
  const handleSubmit = () => {};

  return (
    <div className='d-flex flex-column text text-center mt-5'>
      <Form onSubmit={handleSubmit}>
        <h2 className='mb-3'>Shipping Information</h2>

        <Form.Group>
          <Form.FloatingLabel label="First name">
            <Form.Control type='text' name='firstName' required />
          </Form.FloatingLabel>

          <Form.FloatingLabel label="Last name">
            <Form.Control type='text' name='lastName' required />
          </Form.FloatingLabel>

          <Form.FloatingLabel label="Address">
            <Form.Control type='text' name='address' required />
          </Form.FloatingLabel>

          <Form.FloatingLabel label="City">
            <Form.Control type='text' name='city' required />
          </Form.FloatingLabel>

          <Form.FloatingLabel label="State">
            <Form.Control type='text' name='state' required />
          </Form.FloatingLabel>

          <Form.FloatingLabel label="Zip code">
            <Form.Control type='number' name='zipCode' required />
          </Form.FloatingLabel>
        </Form.Group>

        <h2 className='text-center mt-5'>Payment</h2>

        <Form.Group className='my-3'>
          <Form.Select aria-label='Select input field'>
            <option>Select payment method</option>
            <option>1</option>
            <option>2</option>
          </Form.Select>
        </Form.Group>

        <Button variant='outline-primary'>Place Order</Button>

      </Form>
    </div>
  );
}
