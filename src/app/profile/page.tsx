'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/utils/context/authContext';
import { CustomerData } from '@/types/api';
import { getCustomerByUid } from '@/api/customerData';
import Button from 'react-bootstrap/Button';

export default function ProfilePage() {
  const { user } = useAuth();
  const [customerInfo, setCustomerInfo] = useState<CustomerData | null>(null);
  useEffect(() => {
    getCustomerByUid(user!.uid).then(setCustomerInfo);
  }, [user]);

  return (
    <div className="d-flex flex-column align-items-center my-3">
      <h1>User Profile</h1>

      <section className="d-flex align-items-baseline my-5">
        <h4>Profile Information</h4>
        <Button variant="link">Edit</Button>
        {/* TODO: Render form component */}
      </section>

      <section className="my-5">
        <h4>Payment Methods</h4>
        {customerInfo?.paymentMethods.map((pm) => (
          <div key={pm.id} className="d-flex align-items-baseline">
            <p>Card {pm.cardNumber}</p>
            <Button variant="link">Remove</Button>
          </div>
        ))}
      </section>

      <section className="my-5">
          <h4>Username - {user?.email}</h4>
          <small>Note - Usernames are permanent.</small>
      </section>
    </div>
  );
};
