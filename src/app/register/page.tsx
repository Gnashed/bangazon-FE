'use client';

import { useState} from 'react';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

interface formDataProps {
  email: string,
  password: string,
};

export default function Register() {
  const [formData, setFormData] = useState<formDataProps>({
    email: '',
    password: '',
  });

  // Since TS doesn't know `e` is an HTMLInputElement, we need to be explicit here when setting a type for the event object.
  // Link to read more on HTMLInputElement - https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  // console.log("Form: ", Form);
  // console.log("Form.Group: ", Form?.Group);

  return (
    <div className="text-center d-flex flex-column justify-content-center align-content-center">
      <h1>To register, enter an email and password</h1>

      <Form>
        <Form.Group className="mt-2" controlId="email">
          <Form.Control
            name="email"
            type="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
          />
          {/* <Form.Text className="text-muted">
            We&apos;ll never share your email with anyone else.
          </Form.Text> */}
        </Form.Group>

        <Form.Group className="mt-2" controlId="password">
          <Form.Control 
            name="password"
            type="password"
            placeholder="Enter a password"
            value={formData.password}
            onChange={handleChange}>
          </Form.Control>
        </Form.Group>

      <Button className="mt-2">Register</Button>
      </Form>
    </div>
  );
}
