'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/utils/context/authContext';
import { CustomerData, PaymentMethodData } from '@/types/api';
import { getCustomerByUid } from '@/api/customerData';
import { deletePaymentMethod, getCustomerPaymentMethods } from '@/api/paymentMethodData';
import Button from 'react-bootstrap/Button';
import ProfileInformation from '@/Components/forms/profile/ProfileInformation';
import AddPaymentMethod from '@/Components/forms/payment-methods/AddPaymentMethod';

export default function ProfilePage() {
  const { user } = useAuth();

  const [customerInfo, setCustomerInfo] = useState<CustomerData | null>(null);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethodData[] | null>(null);
  const customerId = customerInfo ? customerInfo.id : null;

  const refreshPaymentMethods = () => {
    if (customerId) {
      getCustomerPaymentMethods(customerId).then(setPaymentMethods);
    }
  };

  const deletePaymentMethodFromView = (id: number) => {
    if(window.confirm(`Removing a payment method deletes it from your account. Click ok to confirm.`)) {
      deletePaymentMethod(id).then(() => refreshPaymentMethods());
    }
  };

  useEffect(() => {
    getCustomerByUid(user!.uid).then(setCustomerInfo);
  }, [user]);

  useEffect(() => {
    if (customerId) {
      getCustomerPaymentMethods(customerId).then(setPaymentMethods);
    }
  }, [customerId]);

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
        {paymentMethods?.map((pm) => (
          <div key={pm.id} className="d-flex align-items-baseline">
            <p>Card {pm.cardNumber}</p>
            <Button variant="link" onClick={() => deletePaymentMethodFromView(pm.id)}>Remove</Button>
          </div>
        ))}
        
        <AddPaymentMethod 
          customerId={customerInfo?.id}
          onUpdate={refreshPaymentMethods}
        />
      </div>

      <div className="my-5">
          <h4>Username - {user?.displayName}</h4>
          <small>Note - Usernames are permanent.</small>
      </div>
    </div>
  );
}
