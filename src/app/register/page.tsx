'use client';

import { useState} from 'react';
import { useRouter } from 'next/navigation';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { registerUserEmailandPassword } from '@/utils/auth';
import createUserData from '../../../api/userData';

interface formDataProps {
  email: string,
  password: string,
  isSellerSwitch: boolean,
};

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState<formDataProps>({
    email: '',
    password: '',
    isSellerSwitch: false,
  });

  // Since TS doesn't know `e` is an HTMLInputElement, we need to be explicit here when setting a type for the event object.
  // Link to read more on HTMLInputElement - https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 'type' refers to the type attribute of this particular input. 'checked' keeps track of the state of the switch. Both are needed to track the switch. In React Bootstrap, switches are checkboxes under-the-hood.
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Need to make sure we are using the correct type, FormEvent<HTMLFormElement>.
  // https://stackoverflow.com/questions/68326000/cant-assign-submit-event-type
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      registerUserEmailandPassword(formData.email, formData.password);
      createUserData({
        isSeller: formData.isSellerSwitch,
      });
      router.push('/');
    } catch (error) {
      console.log(error, "handleSubmit -- Something went wrong registering the user.");
    }
  };

  return (
    <div className="text-center d-flex flex-column justify-content-center align-content-center">
      <h1>To register, enter an email and password</h1>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mt-2" controlId="email">
          <Form.Control
            name="email"
            type="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mt-2" controlId="password">
          <Form.Control 
            name="password"
            type="password"
            placeholder="Enter a password"
            value={formData.password}
            onChange={handleChange}
            required
            >
            
          </Form.Control>
        </Form.Group>

        <Form.Group className="mt-2" controlId="isSeller">
          <Form.Check
            type="switch"
            id="isSellerSwitch"
            label="Enable seller account"
            name="isSellerSwitch"
            checked={formData.isSellerSwitch}
            onChange={(e) => setFormData({ ...formData, isSellerSwitch: e.target.checked })}
          />
          {/* <Form.Text className="text-muted">
            FIXME: Leaving this here temporarily
          </Form.Text> */}
        </Form.Group>

      <Button className="mt-2" type="submit">Register</Button>
      </Form>
    </div>
  );
}
