'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/utils/context/authContext';
import ProductCard from '@/Components/ProductCard';
import { getUserDataByUid } from '@/api/userData';
import { AllProductsData } from '@/types/api';
import { getLatestProducts } from '@/api/productData';

interface UserDataProps {
  id: number;
  uid: string;
  isSeller: boolean;
};

export default function Home() {
  const { user } = useAuth();
  const [userData, setUserData] = useState<UserDataProps | null>(null);
  // Note to self - This is how to set the state type for AllProductsData.
  const [products, setProducts] = useState<AllProductsData[]>([]);

  useEffect(() => {
    // console.log(user!.uid);
    getUserDataByUid(user!.uid).then(setUserData);
    getLatestProducts().then(setProducts);
  }, [user]);

  return (
    <div className="mb-5 text-center d-flex flex-column justify-content-center align-content-center">
      {/* TODO: Add some logic to check if the user confirmed if they wanted to add selling privalidges to their account. This is for newly registered users that signed in using their Google account. */}
      {/* {userData?.isSeller === false ? 'Want to sell products?' : 'Welcome back. Get to selling!'} */}
      <h1>Latest Products</h1>
      <h2 className="my-5">
        Welcome, { user?.displayName || 'Guest' }!
      </h2>

      {products.map((product) => (
        <div key={product.id} className="d-flex flex-row flex-wrap justify-content-center m-3">
          <ProductCard name={product.name} price={product.price} sellerUsername={product?.store?.seller?.username} imageUrl={product.imageUrl} />
        </div>
      ))}
    </div>
  );
};
