'use client';

import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

interface ProfileInformationProps {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: number;
};

export default function ProfileInformation({ firstName, lastName, address, city, state, zipCode }: ProfileInformationProps) {
  const [formData, setFormData] = useState<ProfileInformationProps>({
    firstName,
    lastName,
    address,
    city,
    state,
    zipCode,
  });

  useEffect(() => {
    setFormData({
      firstName,
      lastName,
      address,
      city,
      state,
      zipCode
    })
  }, [firstName, lastName, address, city, state, zipCode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: name === 'zipCode' ? Number(value) : value,
    }))
  };

  return (
    <div>
      <Form>
        <Form.Group>
          <Form.Label>First name</Form.Label>
          <Form.Control name='firstName' onChange={handleChange} value={formData.firstName} />
          <Form.Label>Last name</Form.Label>
          <Form.Control name='lastName' onChange={handleChange} value={formData.lastName} />
          <Form.Label>Address</Form.Label>
          <Form.Control name='address' onChange={handleChange} value={formData.address} />
          <Form.Label>City</Form.Label>
          <Form.Control name='city' onChange={handleChange} value={formData.city} />
          <Form.Label>State</Form.Label>
          <Form.Control name='state' onChange={handleChange} value={formData.state} />
          <Form.Label>Zip code</Form.Label>
          <Form.Control name='zipCode' onChange={handleChange} value={formData.zipCode.toString()} />
        </Form.Group>

        <Button variant='warning' className='my-3'>Save</Button>
      </Form>
    </div>
  );
}
