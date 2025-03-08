'use client';

import { useState} from 'react';
import { useRouter } from 'next/navigation';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { loginUserEmailAndPasswordCombo } from '@/utils/auth';

interface formDataProps {
  email: string,
  password: string,
};

export default function LoginPage() {
  const router = useRouter();
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

  // Need to make sure we are using the correct type, FormEvent<HTMLFormElement>.
  // https://stackoverflow.com/questions/68326000/cant-assign-submit-event-type
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      loginUserEmailAndPasswordCombo(formData.email, formData.password);
      router.push('/');
    } catch (error) {
      console.log(error, "handleSubmit -- Something went wrong logging in the user.");
    }
  };

  return (
    <div className="text-center d-flex flex-column justify-content-center align-content-center">
      <h1>Login with your email and password</h1>

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
            onChange={handleChange}
            required
          >
          </Form.Control>
        </Form.Group>

      <Button className="mt-2" type="submit">Sign in</Button>
      </Form>
    </div>
  );
}
