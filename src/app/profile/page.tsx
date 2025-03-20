'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/utils/context/authContext';
import { CustomerData } from '@/types/api';
import { getCustomerByUid } from '@/api/customerData';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ProfileInformation from '@/Components/forms/profile/ProfileInformation';

export default function ProfilePage() {
  const { user } = useAuth();

  // React Bootstrap Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [customerInfo, setCustomerInfo] = useState<CustomerData | null>(null);
  useEffect(() => {
    getCustomerByUid(user!.uid).then(setCustomerInfo);
  }, [user]);

  return (
    <div className="d-flex flex-column align-items-center my-3">
      <h1>User Profile</h1>

      <div className="d-flex align-items-baseline my-5">
        <h4>Profile Information</h4>
        <Button variant="link">Edit</Button>
      </div>

      {/* TODO: Render form component */}
      <ProfileInformation 
        firstName={customerInfo?.firstName || ''}
        lastName={customerInfo?.lastName || ''}
        address={customerInfo?.address || ''}
        city={customerInfo?.city || ''}
        state={customerInfo?.state || ''}
        zipCode={customerInfo?.zipCode || 0 }
      />

      <div className="my-5">
        <h4>Payment Methods</h4>
        {customerInfo?.paymentMethods.map((pm) => (
          <div key={pm.id} className="d-flex align-items-baseline">
            <p>Card {pm.cardNumber}</p>
            <Button variant="link">Remove</Button>
          </div>
        ))}

        <Button variant='primary' onClick={handleShow}>Add</Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add a payment method</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* TODO: Render Payment Method Form Component */}
            
          </Modal.Body>
          <Modal.Footer>
            {/* TODO: Add onClick handler that sends a POST request to create a payment method. */}
            <Button variant='secondary' onClick={handleClose}>Add payment method</Button>
          </Modal.Footer>
        </Modal>
      </div>

      <div className="my-5">
          <h4>Username - {user?.displayName}</h4>
          <small>Note - Usernames are permanent.</small>
      </div>
    </div>
  );
};
